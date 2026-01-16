import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, View } from "react-native";

type LoadingConfirmHandler = (
  confirmText: string,
  confirmTitle?: string,
  callback?: (done: () => void) => void | Promise<void>,
  cancelText?: string
) => void;

type LoadingContextValue = {
  openLoading: () => void;
  closeLoading: () => void;
  loadingConfirm: LoadingConfirmHandler;
};

const LoadingContext = createContext<LoadingContextValue>({
  openLoading: () => { },
  closeLoading: () => { },
  loadingConfirm: () => { }
});

export function LoadingProvider({ children }: { children?: React.ReactNode }) {
  const [loadingCount, setLoadingCount] = useState(0);

  const openLoading = useCallback(() => {
    setLoadingCount(count => count + 1);
  }, []);

  const closeLoading = useCallback(() => {
    setLoadingCount(count => (count > 0 ? count - 1 : 0));
  }, []);

  const loadingConfirm: LoadingConfirmHandler = useCallback(
    (confirmText, confirmTitle, callback, cancelText = "已取消") => {
      Alert.alert(confirmTitle || "提示", confirmText, [
        {
          text: "取消",
          style: "cancel",
          onPress: () => {
            if (cancelText) {
              Alert.alert("提示", cancelText);
            }
          }
        },
        {
          text: "确定",
          onPress: async () => {
            openLoading();
            let finished = false;
            const done = () => {
              if (finished) {
                return;
              }
              finished = true;
              closeLoading();
            };
            try {
              await Promise.resolve(callback?.(done));
            } finally {
              done();
            }
          }
        }
      ]);
    },
    [openLoading, closeLoading]
  );

  const value = useMemo(
    () => ({
      openLoading,
      closeLoading,
      loadingConfirm
    }),
    [openLoading, closeLoading, loadingConfirm]
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <Modal transparent visible={loadingCount > 0} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.box}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.text}>加载中...</Text>
          </View>
        </View>
      </Modal>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}

export default LoadingProvider;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center"
  },
  text: {
    color: "#ffffff",
    marginTop: 8,
    fontSize: 14
  }
});
