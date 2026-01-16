import AsyncStorage from "@react-native-async-storage/async-storage";
import { isEmpty } from "../../utils/functionUtil";
import { PROJECT_KEY } from "../../config/ip";

export const tableUtils = {
  orderTransform(order) {
    return order === "ascending" ? "ASC" : "DESC";
  },
  setTableCellStyle(settingData, column, row) {
    const type = Array.isArray(row) ? "header" : "body";
    let fontSizeKey;
    let colorKey;
    const resultStyle = {};

    if (type === "header") {
      fontSizeKey = "headerFontSize";
      colorKey = "headerColor";
    } else {
      fontSizeKey = "columnFontSize";
      colorKey = "columnColor";
    }

    if (column.type === "index" || column.type === "operateButton") {
      settingData.forEach(item => {
        if (item.type === column.type) {
          if (item[fontSizeKey]) {
            resultStyle.fontSize = item[fontSizeKey];
          }
          resultStyle.color = item[colorKey];
        }
      });
    } else {
      settingData.forEach(item => {
        if (item.prop === column.property) {
          if (item[fontSizeKey]) {
            resultStyle.fontSize = item[fontSizeKey];
          }
          resultStyle.color = item[colorKey];
        }
      });
    }
    return resultStyle;
  },
  setTableColumnCompName(valueType) {
    const componentNameObject = {
      text: "TableTextComponent",
      iconText: "TableIconTextComponent",
      imageText: "TableImageTextComponent",
      tagText: "TableTagTextComponent",
      processText: "TableProcessTextComponent",
      dynamicImage: "TableDynamicImageComponent",
      file: "TableFileComponent",
      dictionary: "TableDictionaryComponent",
      textClick: "TableTextClickComponent"
    };
    return componentNameObject[valueType] || "";
  },
  setConfigureComponentStyle(align) {
    const alignObject = {
      left: "flex-start",
      center: "center",
      right: "flex-end"
    };
    return { justifyContent: alignObject[align] };
  },
  calculateSpans(spanMap, tableColumnData, tableData) {
    tableColumnData.forEach(prop => {
      const spans = [];
      let count = 1;
      let startIndex = 0;
      for (let i = 0; i < tableData.length; i++) {
        spans[i] = 1;
      }
      for (let i = 1; i <= tableData.length; i++) {
        if (i < tableData.length && tableData[i][prop] === tableData[i - 1][prop]) {
          count += 1;
          continue;
        }
        if (count > 1) {
          spans[startIndex] = count;
          for (let j = startIndex + 1; j < startIndex + count; j++) {
            spans[j] = 0;
          }
        }
        startIndex = i;
        count = 1;
      }
      spanMap[prop] = spans;
    });
  },
  setSpanMerge(spanMap, tableColumnData, { column, rowIndex }) {
    if (column.type === "index" || column.type === "selection" || column.type === "operateButton") {
      return;
    }
    const prop = column.property;
    if (tableColumnData.findIndex(item => item === prop) > -1) {
      return {
        rowspan: spanMap[prop][rowIndex],
        colspan: 1
      };
    }
  }
};

export const objectUtil = {
  isEmpty,
  existDataModelAndField(formData, dataModel, field) {
    if (!Object.keys(formData).includes(dataModel)) {
      return false;
    }
    if (!Object.keys(formData[dataModel]).includes(field)) {
      return false;
    }
    return !isEmpty(formData[dataModel][field]);
  }
};

export async function getUserInfoItem(key) {
  const raw = await AsyncStorage.getItem(PROJECT_KEY);
  if (!raw) {
    return "";
  }
  const userInfo = JSON.parse(raw);
  return userInfo[key] || "";
}

export async function setUserInfoItem(key, value) {
  const raw = await AsyncStorage.getItem(PROJECT_KEY);
  const userInfo = raw ? JSON.parse(raw) : {};
  userInfo[key] = value;
  await AsyncStorage.setItem(PROJECT_KEY, JSON.stringify(userInfo));
}

export async function clearUserInfo() {
  await AsyncStorage.removeItem(PROJECT_KEY);
}

export function generateId() {
  const p = new Date().getTime().toString();
  const m = Math.random().toString().slice(2, 5);
  return p + m;
}

export function deepClone(source) {
  return JSON.parse(JSON.stringify(source));
}

export function spreadObject(...objects) {
  const mergedObj = Object.assign({}, ...objects);
  return { ...mergedObj };
}

export function spreadArray(...arrays) {
  return [].concat(...arrays);
}

export function cardStyle(cardGutter = 0, rowNumber = 4, cardHeight = 200, cardBorderRadius = 0) {
  const colWidth = `${(100 / parseInt(rowNumber, 10)).toFixed(2)}%`;
  return {
    width: colWidth,
    height: cardHeight,
    margin: parseInt(cardGutter, 10) / 2,
    borderRadius: cardBorderRadius
  };
}

export function getCurrentDate() {
  const date = new Date();
  return formatDate(date);
}

export function getCurrentDateTime() {
  const date = new Date();
  return [
    formatDate(date),
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds())
    ].join(":")
  ].join(" ");
}

export async function getOptionItem({ setting, resultItem, type, dataAxios, notifyError }) {
  const { bindType } = setting;
  if (bindType === "dictionary") {
    resultItem.length = 0;
    try {
      const res = await dataAxios.getDictionaryItemByCode({ code: setting.dictionaryCode });
      res.data.forEach(item => {
        resultItem.push({ name: item.name, value: item.value });
      });
    } catch (err) {
      notifyError?.(err);
    }
  }
  if (bindType === "dataModel" && Object.keys(dataAxios).includes(setting.requestApi)) {
    resultItem.length = 0;
    const filterParam = setting.filterParam || { pageSize: 0 };
    try {
      const res = await dataAxios[setting.requestApi](filterParam);
      if (!isEmpty(res.data)) {
        const list = Object.prototype.toString.apply(res.data) === "[object Array]" ? res.data : res.data.list;
        list.forEach(item => {
          const resultObject = {
            name: item[setting.labelProperty],
            value: item[setting.valueProperty]
          };
          if (item.children) {
            resultObject.children = convertToTree(item.children, setting.labelProperty, setting.valueProperty);
          }
          resultItem.push(resultObject);
        });
        if (type === "tree") {
          transformTreeData(resultItem);
        }
      }
    } catch (err) {
      notifyError?.(err);
    }
  }
}

export async function getChartOptionItem({ setting, resultItem, dataAxios, notifyError, openLoading, closeLoading }) {
  if (!Object.keys(dataAxios).includes(setting.requestApi)) {
    return;
  }
  try {
    openLoading?.();
    const res = await dataAxios[setting.requestApi]();
    if (!isEmpty(res.data)) {
      const list = Object.prototype.toString.apply(res.data) === "[object Array]" ? res.data : res.data.list;
      list.forEach(item => {
        resultItem.push({
          name: item[setting.nameProperty],
          value: item[setting.valueProperty],
          catalog: item[setting.catalogProperty],
          type: item[setting.typeProperty],
          max: item[setting.maxProperty]
        });
      });
    }
  } catch (err) {
    notifyError?.(err);
  } finally {
    closeLoading?.();
  }
}

function transformTreeData(data) {
  if (isEmpty(data)) {
    return;
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].children && data[i].children.length === 0) {
      delete data[i].children;
    } else {
      transformTreeData(data[i].children);
    }
  }
  return data;
}

function convertToTree(data, name, value) {
  function buildTree(obj) {
    const node = {
      name: obj[name],
      value: obj[value],
      children: []
    };
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach(child => {
        node.children.push(buildTree(child));
      });
    }
    return node;
  }
  const result = [];
  data.forEach(item => {
    result.push(buildTree(item));
  });
  return result;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate())
  ].join("-");
}

export default {
  tableUtils,
  objectUtil,
  getUserInfoItem,
  setUserInfoItem,
  clearUserInfo,
  generateId,
  deepClone,
  spreadObject,
  spreadArray,
  cardStyle,
  getCurrentDate,
  getCurrentDateTime,
  getOptionItem,
  getChartOptionItem
};
