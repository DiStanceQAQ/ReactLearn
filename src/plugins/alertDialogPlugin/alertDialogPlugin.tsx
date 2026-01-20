import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Theme } from "../../constants/theme";
import { OverlayRenderProps, useOverlayHost } from "../../components/overlay/OverlayHost";

type AlertType = "warning" | "success" | string;

type AlertContextValue = {
  showAlert: (text: string, alertType?: AlertType, alertTitle?: string) => void;
};

const AlertContext = createContext<AlertContextValue>({
  showAlert: () => {}
});

export function AlertProvider({ children }: { children?: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("warning");
  const [title, setTitle] = useState("提示");
  const overlayHost = useOverlayHost();
  const overlayKeyRef = useRef<string | null>(null);

  const closeAlert = useCallback(() => {
    setVisible(false);
  }, []);

  const showAlert = useCallback(
    (text: string, alertType: AlertType = "warning", alertTitle = "提示") => {
      setMessage(text || "");
      setType(alertType || "warning");
      setTitle(alertTitle || "提示");
      setVisible(true);
    },
    []
  );

  const value = useMemo(() => ({ showAlert }), [showAlert]);

  const renderAlertContent = useCallback(
    () => (
      <View style={styles.box}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={closeAlert}>
            <Text style={styles.close}>×</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={[styles.badge, type === "success" ? styles.success : styles.warning]} />
          <Text style={styles.message}>{message}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={closeAlert} style={styles.button}>
            <Text style={styles.buttonText}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [closeAlert, message, title, type]
  );

  useEffect(() => {
    if (!overlayHost) return;
    if (visible) {
      if (overlayKeyRef.current) {
        overlayHost.close(overlayKeyRef.current);
      }
      overlayKeyRef.current = overlayHost.open({
        render: (_: OverlayRenderProps) => <View style={styles.overlay}>{renderAlertContent()}</View>,
        overlayOpacity: Theme.opacity.overlay,
        overlayColor: "#000",
        closeOnOverlayPress: true,
        onClose: closeAlert,
        zIndex: Theme.zIndex.popup
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
  }, [visible, overlayHost, renderAlertContent, closeAlert]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      {!overlayHost && (
        <Modal transparent visible={visible} animationType="fade">
          <View style={[styles.overlay, styles.overlayBg]}>
            {renderAlertContent()}
          </View>
        </Modal>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}

export default AlertProvider;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  overlayBg: {
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  box: {
    width: "80%",
    borderRadius: Theme.radius.md,
    backgroundColor: Colors.white,
    overflow: "hidden"
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border
  },
  title: {
    fontSize: Theme.fontSize.lg,
    color: Colors.text.primary,
    fontWeight: "600"
  },
  close: {
    fontSize: Theme.fontSize.xl + 2,
    color: Colors.text.light,
    paddingHorizontal: Theme.spacing.sm
  },
  content: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center"
  },
  badge: {
    width: Theme.spacing.md,
    height: Theme.spacing.md,
    borderRadius: Theme.spacing.md / 2,
    marginRight: Theme.spacing.sm + 2
  },
  success: {
    backgroundColor: Colors.primary
  },
  warning: {
    backgroundColor: Colors.required
  },
  message: {
    flex: 1,
    fontSize: Theme.fontSize.md,
    color: Colors.text.primary
  },
  footer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
    alignItems: "flex-end"
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: Theme.radius.sm,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg
  },
  buttonText: {
    color: Colors.white,
    fontSize: Theme.fontSize.md
  }
});
