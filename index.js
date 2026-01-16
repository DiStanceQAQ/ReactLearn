/**
 * @format
 */

import "react-native-gesture-handler";
import React from "react";
import { AppRegistry } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import App from "./App";
import { name as appName } from "./app.json";
import { setAxiosPluginOptions } from "./src/plugins/axiosPlugin/axiosPlugin";

setAxiosPluginOptions({
  storage: AsyncStorage,
  getAuthToken: async () => {
    return (await AsyncStorage.getItem("Authentication")) || "";
  }
});

AppRegistry.registerComponent(appName, () => () =>
  React.createElement(
    GestureHandlerRootView,
    { style: { flex: 1 } },
    React.createElement(App, null)
  )
);
