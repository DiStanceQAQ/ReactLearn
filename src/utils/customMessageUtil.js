import { Alert } from "react-native";

function normalizeOptions(options) {
  if (typeof options === "string") {
    return { message: options };
  }
  return options || {};
}

function showAlert(type, options) {
  const { message = "", title } = normalizeOptions(options);
  const alertTitle = title || type;
  Alert.alert(alertTitle, message);
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
