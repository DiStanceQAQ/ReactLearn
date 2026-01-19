import { Alert } from "react-native";

function normalizeOptions(options) {
  if (typeof options === "string") {
    return { message: options };
  }
  return options || {};
}

// allow injection so UI layer (e.g., AlertProvider) can reuse this util
let customHandler = (type, { message = "", title }) => {
  const alertTitle = title || type;
  Alert.alert(alertTitle, message);
};

export function setCustomMessageHandler(handler) {
  customHandler = handler || customHandler;
}

function showAlert(type, options) {
  const normalized = normalizeOptions(options);
  return customHandler(type, normalized);
}

const customMessage = {
  success(options) {
    return showAlert("Success", options);
  },
  info(options) {
    return showAlert("Info", options);
  },
  warning(options) {
    return showAlert("Warning", options);
  },
  error(options) {
    return showAlert("Error", options);
  }
};

export default customMessage;
