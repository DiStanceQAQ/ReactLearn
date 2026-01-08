import axios from "axios";
import { Alert } from "react-native";
import RNFS from "react-native-fs";
import { generateShortStr } from "../../utils/functionUtil";
import { Encrypt } from "../../utils/secretUtil";
import { SHA256 } from "../../utils/sha256Util";
import { BASE_SERVER_URL } from "../../config/ip";
import { APIs_NEED_SECTION_ID, APIs_NO_NEED_PROJECT_ID } from "../../config/apiConfig";
import businessAxios from "./module/businessAxios";
import commonAxios from "./module/commonAxios";
import dataCenterAxios from "./module/dataCenterAxios";
import mapAxios from "./module/mapAxios";
import processAxios from "./module/processAxios";
import systemAxios from "./module/systemAxios";

const inMemoryStorage = new Map();
let axiosPluginOptions = {
  getAuthToken: async () => "",
  onStartLoading: () => { },
  onStopLoading: () => { },
  onErrorMessage: message => {
    Alert.alert("Error", message);
  },
  onAuthError: message => {
    Alert.alert("Auth", message);
  },
  storage: {
    getItem: async key => {
      if (inMemoryStorage.has(key)) {
        return inMemoryStorage.get(key);
      }
      return null;
    },
    setItem: async (key, value) => {
      inMemoryStorage.set(key, value);
    },
    removeItem: async key => {
      inMemoryStorage.delete(key);
    },
    clear: async () => {
      inMemoryStorage.clear();
    }
  }
};

export function setAxiosPluginOptions(options) {
  axiosPluginOptions = { ...axiosPluginOptions, ...options };
  if (options && options.storage) {
    axiosPluginOptions.storage = { ...axiosPluginOptions.storage, ...options.storage };
  }
}

let seq = 0;

function shouldAddSectionId(url) {
  if (!url) {
    return false;
  }
  const path = url.replace(BASE_SERVER_URL, "");
  return APIs_NEED_SECTION_ID.some(api => path.includes(api));
}

function shouldAddProjectId(url, projectId) {
  if (!url) {
    return false;
  }
  const path = url.replace(BASE_SERVER_URL, "");
  if (APIs_NO_NEED_PROJECT_ID.some(api => path.includes(api))) {
    return false;
  }
  return !!projectId;
}

async function getCurrentProjectId() {
  return (await axiosPluginOptions.storage.getItem("currentProjectId")) || "";
}

async function getCurrentSectionId() {
  return (await axiosPluginOptions.storage.getItem("currentSectionId")) || "";
}

function buildQueryString(params) {
  if (!params || typeof params !== "object") {
    return "";
  }
  const parts = [];
  Object.keys(params).forEach(key => {
    let value = params[key];
    const valueType = Object.prototype.toString.apply(value);
    if (valueType === "[object Array]" || valueType === "[object Object]") {
      value = JSON.stringify(value);
    }
    if (value === undefined || value === null) {
      return;
    }
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  });
  return parts.join("&");
}

function buildDownloadUrl(rawUrl, apiBaseUrl, params) {
  if (!rawUrl) {
    return "";
  }
  let url = rawUrl;
  if (url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
    url = `${apiBaseUrl}${url}`;
  }
  const query = buildQueryString(params);
  if (!query) {
    return url;
  }
  return url.includes("?") ? `${url}&${query}` : `${url}?${query}`;
}

async function buildRequestHeaders(options, headerContentType) {
  const secretKey = "bY737TGAacSGG1XTdK";
  const authenticationParam = await axiosPluginOptions.getAuthToken();
  const timestamp = Date.now();
  const uuid = generateShortStr();
  const headers = {
    "Content-Type": headerContentType,
    Authentication: authenticationParam,
    timestamp,
    uuid: Encrypt(uuid),
    sign: SHA256(`${timestamp}${secretKey}${uuid}`)
  };
  if (options.tenantId) {
    headers.tenantId = options.tenantId;
  }
  if (options.lockToken) {
    headers.lockToken = options.lockToken;
  }
  return headers;
}

export async function axiosFn(options, isDownload = false, apiBaseUrl = BASE_SERVER_URL) {
  const headerContentType = options.headers && options.headers["Content-Type"]
    ? options.headers["Content-Type"]
    : "application/json;charset=utf-8";
  const headers = await buildRequestHeaders(options, headerContentType);
  const config = {
    method: "get",
    headers,
    timeout: 1800000
  };

  for (const k in options) {
    if (k !== "param" && k !== "headers") {
      if (k === "url" && options[k].indexOf("http://") === -1) {
        config[k] = `${apiBaseUrl}${options[k]}`;
      } else {
        config[k] = options[k];
      }
    }
  }

  const sectionId = await getCurrentSectionId();
  const projectId = await getCurrentProjectId();
  const needSectionId = shouldAddSectionId(config.url || options.url);
  const needProjectId = shouldAddProjectId(config.url || options.url, projectId);

  if (needSectionId && sectionId) {
    if (!options.param) {
      options.param = {};
    }
    if (!options.param.sectionId && !options.param.section_id) {
      options.param.sectionId = sectionId;
    }
  }
  if (needProjectId && projectId) {
    if (!options.param) {
      options.param = {};
    }
    if (!options.param.projectId && !options.param.project_id) {
      options.param.projectId = projectId;
    }
  }

  const method = config.method;
  if (method == "post" || method == "put" || method == "delete") {
    if (config.headers["Content-Type"] === "multipart/form-data") {
      const formData = new FormData();
      Object.keys(options.param || {}).forEach(key => {
        formData.append(key, options.param[key]);
      });
      config.data = formData;
    }
    if (config.headers["Content-Type"] === "application/json;charset=utf-8") {
      config.data = options.param;
    }
    if (config.headers["Content-Type"] === "application/x-www-form-urlencoded;charset=UTF-8") {
      let postData = "";
      for (const key in options.param) {
        const optionKey = Object.prototype.toString.apply(options.param[key]);
        if (optionKey === "[object Array]" || optionKey === "[object Object]") {
          options.param[key] = JSON.stringify(options.param[key]);
        }
        postData += encodeURIComponent(key);
        postData += "=";
        postData += encodeURIComponent(options.param[key]);
        postData += "&";
      }
      config.data = postData;
    }
  } else if (config.method === "get") {
    if (options.param != undefined || options.param != null) {
      Object.keys(options.param).forEach(v => {
        const paramKey = Object.prototype.toString.apply(options.param[v]);
        const optionKey = Object.prototype.toString.apply(options.param[v]);
        if (paramKey === "[object Array]" || optionKey === "[object Object]") {
          options.param[v] = JSON.stringify(options.param[v]);
        }
      });
    }
    config.params = options.param;
  }

  const response = await axios(config);
  return isDownload ? response : response.data;
}

export async function downloadAxiosFn(options) {
  try {
    const headerContentType = options.headers && options.headers["Content-Type"]
      ? options.headers["Content-Type"]
      : "application/json;charset=utf-8";
    const headers = await buildRequestHeaders(options, headerContentType);
    const url = buildDownloadUrl(options.url, BASE_SERVER_URL, options.params || options.param);
    const method = (options.method || "get").toLowerCase();
    if (method !== "get") {
      throw new Error("downloadAxiosFn only supports GET in React Native.");
    }
    const baseDir = RNFS.DownloadDirectoryPath || RNFS.DocumentDirectoryPath;
    const fileName = options.fileName || `download-${Date.now()}`;
    const filePath = options.filePath || `${baseDir}/${fileName}`;
    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      headers
    }).promise;
    if (result.statusCode !== 200) {
      throw new Error(`Download failed with status ${result.statusCode}`);
    }
    return { filePath, statusCode: result.statusCode };
  } catch (err) {
    notifyError(err);
    throw err;
  }
}

axios.interceptors.request.use(
  function (config) {
    axiosPluginOptions.onStartLoading();
    return config;
  },
  function (error) {
    axiosPluginOptions.onStopLoading();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    axiosPluginOptions.onStopLoading();
    response.seq = seq;
    if (response.status !== 200) {
      return;
    }
    if (response.config.responseType === "blob") {
      if (response.data.type !== "application/json") {
        return response;
      }
      return Promise.reject(response.data);
    }
    if (response.data.code == 200) {
      return response;
    }
    return Promise.reject(response.data);
  },
  function (error) {
    axiosPluginOptions.onStopLoading();
    if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
      showErrorMessage("Request timeout, please retry.");
      return;
    }
    error.seq = seq;
    return Promise.reject(error);
  }
);

export function notifyError(err) {
  console.log(err);
  if (err.code) {
    notifyErrorCode(err);
  } else {
    const ErrorType = [TypeError, ReferenceError, SyntaxError, RangeError, SyntaxError, EvalError];
    if (ErrorType.includes(err.constructor)) {
      showErrorMessage("Current operation is not supported.");
      return;
    }
    if (err.type === "application/json") {
      if (typeof FileReader === "undefined") {
        showErrorMessage("Unexpected file response.");
        return;
      }
      const reader = new FileReader();
      reader.readAsText(err, "utf-8");
      reader.onload = () => {
        const { message } = JSON.parse(reader.result);
        showErrorMessage(message);
      };
      return;
    }
    showErrorMessage("Network error, please check your connection.");
  }
}

export function notifyErrorCode(err) {
  function notifyLogin(errorMsg) {
    showErrorMessage(errorMsg);
    axiosPluginOptions.onAuthError(errorMsg);
    axiosPluginOptions.storage.clear();
  }

  const code = err.code;
  const message = err.message;
  if (code == "401") {
    notifyLogin("User not logged in, please login.");
    return;
  }
  if (code == "404") {
    notifyLogin("Login expired, please login again.");
    return;
  }
  if (code == "411") {
    notifyLogin("Account logged in elsewhere, please login again.");
    return;
  }
  showErrorMessage(message || "Network error, please check your connection.");
}

function showErrorMessage(message) {
  axiosPluginOptions.onErrorMessage(message);
}

const getDataAxios = {
  notifyError,
  ...businessAxios,
  ...commonAxios,
  ...dataCenterAxios,
  ...mapAxios,
  ...processAxios,
  ...systemAxios
};

export default getDataAxios;
