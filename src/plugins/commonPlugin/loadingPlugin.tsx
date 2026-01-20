import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Theme } from "../../constants/theme";
import { OverlayRenderProps, useOverlayHost } from "../../components/overlay/OverlayHost";

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
  openLoading: () => {},
  closeLoading: () => {},
  loadingConfirm: () => {}
});

export function LoadingProvider({ children }: { children?: React.ReactNode }) {
  const [loadingCount, setLoadingCount] = useState(0);
  const overlayHost = useOverlayHost();
  const overlayKeyRef = useRef<string | null>(null);

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

  const renderLoading = useCallback(
    (_: OverlayRenderProps) => (
      <View style={styles.overlay}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color={Colors.white} />
          <Text style={styles.text}>加载中...</Text>
        </View>
      </View>
    ),
    []
  );

  useEffect(() => {
    if (!overlayHost) return;
    if (loadingCount > 0) {
      if (overlayKeyRef.current) {
        overlayHost.close(overlayKeyRef.current);
      }
      overlayKeyRef.current = overlayHost.open({
        render: renderLoading,
        overlayOpacity: 0.6,
        overlayColor: "#000",
        closeOnOverlayPress: false,
        zIndex: Theme.zIndex.toast
      });
    } else if (overlayKeyRef.current) {
      overlayHost.close(overlayKeyRef.current);
      overlayKeyRef.current = null;
    }
    return () => {
      if (overlayKeyRef.current) {
        overlayHost.close(overlayKeyRef.current);
        overlayKeyRef.current = null;
      }
    };
  }, [loadingCount, overlayHost, renderLoading]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {!overlayHost && (
        <Modal transparent visible={loadingCount > 0} animationType="fade">
          <View style={[styles.overlay, styles.overlayBg]}>
            <View style={styles.box}>
              <ActivityIndicator size="large" color={Colors.white} />
              <Text style={styles.text}>加载中...</Text>
            </View>
          </View>
        </Modal>
      )}
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
    alignItems: "center",
    justifyContent: "center"
  },
  overlayBg: {
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  box: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.radius.md,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center"
  },
  text: {
    color: Colors.white,
    marginTop: Theme.spacing.xs,
    fontSize: Theme.fontSize.md
  }
});
