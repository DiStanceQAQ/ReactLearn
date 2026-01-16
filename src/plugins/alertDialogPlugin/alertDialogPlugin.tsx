import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AlertType = "warning" | "success" | string;

type AlertContextValue = {
  showAlert: (text: string, alertType?: AlertType, alertTitle?: string) => void;
};

const AlertContext = createContext<AlertContextValue>({
  showAlert: () => { }
});

export function AlertProvider({ children }: { children?: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("warning");
  const [title, setTitle] = useState("提示");

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

  const value = useMemo(
    () => ({
      showAlert
    }),
    [showAlert]
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
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
        </View>
      </Modal>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    width: "80%",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    overflow: "hidden"
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb"
  },
  title: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600"
  },
  close: {
    fontSize: 20,
    color: "#9ca3af",
    paddingHorizontal: 8
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  badge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10
  },
  success: {
    backgroundColor: "#22c55e"
  },
  warning: {
    backgroundColor: "#ef4444"
  },
  message: {
    flex: 1,
    fontSize: 14,
    color: "#374151"
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "flex-end"
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14
  }
});
