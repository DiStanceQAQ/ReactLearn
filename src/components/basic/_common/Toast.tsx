import React, {
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback
} from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

// Types
export type ToastType = "text" | "loading" | "success" | "fail" | "html";
export type ToastPosition = "top" | "middle" | "bottom";
export type ToastWordBreak = "normal" | "break-all" | "break-word";
export type ToastOptions = {
  type?: ToastType;
  position?: ToastPosition;
  message?: string | ReactNode;
  wordBreak?: ToastWordBreak;
  icon?: ReactNode | string;
  iconSize?: number;
  overlay?: boolean;
  forbidClick?: boolean;
  closeOnClick?: boolean;
  closeOnClickOverlay?: boolean;
  loadingType?: "spinner" | "circular";
  duration?: number;
  zIndex?: number;
  onClose?: () => void;
  onOpened?: () => void;
};

export type ToastInstance = {
  close: () => void;
  setMessage: (msg: string | ReactNode) => void;
  update: (opts: Partial<ToastOptions>) => void;
};

type ToastState = {
  id: string;
  options: ToastResolvedOptions;
  closing?: boolean;
};

type ToastAction =
  | { type: "add"; toast: ToastState }
  | { type: "remove"; id: string }
  | { type: "removeAll" }
  | { type: "update"; id: string; options: Partial<ToastOptions> };

// Normalized options after merging defaults
export type ToastResolvedOptions = {
  type: ToastType;
  position: ToastPosition;
  message: string | ReactNode;
  wordBreak: ToastWordBreak;
  icon?: ReactNode | string;
  iconSize: number;
  overlay: boolean;
  forbidClick: boolean;
  closeOnClick: boolean;
  closeOnClickOverlay: boolean;
  loadingType: "spinner" | "circular";
  duration: number;
  zIndex: number;
  onClose?: () => void;
  onOpened?: () => void;
};

// Defaults and global flags
const baseDefault: ToastResolvedOptions = {
  type: "text",
  position: "middle",
  message: "",
  wordBreak: "break-all",
  icon: undefined,
  iconSize: 36,
  overlay: false,
  forbidClick: false,
  closeOnClick: false,
  closeOnClickOverlay: false,
  loadingType: "circular",
  duration: 2000,
  zIndex: 2000,
  onClose: undefined,
  onOpened: undefined
};

const typeDefaults: Partial<Record<ToastType, Partial<ToastOptions>>> = {};
let globalDefaults: Partial<ToastOptions> = {};
let allowMultiple = false;
let listeners = new Set<(action: ToastAction) => void>();
let lastId: string | null = null;

const subscribe = (fn: (action: ToastAction) => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

const emit = (action: ToastAction) => {
  listeners.forEach(fn => fn(action));
};

const normalizeOptions = (options: ToastOptions | string | ReactNode, type?: ToastType): ToastResolvedOptions => {
  const isOptionsObject =
    options !== null &&
    typeof options === "object" &&
    !Array.isArray(options) &&
    !React.isValidElement(options);

  const baseOpts: ToastOptions = isOptionsObject ? (options as ToastOptions) : {};
  const finalType: ToastType = (type ?? baseOpts.type ?? "text") as ToastType;

  let merged: ToastResolvedOptions = {
    ...baseDefault,
    ...(globalDefaults || {}),
    ...(finalType && typeDefaults[finalType] ? typeDefaults[finalType]! : {}),
    ...baseOpts,
    type: finalType
  } as ToastResolvedOptions;

  if (!isOptionsObject) {
    if (typeof options === "string" || React.isValidElement(options)) {
      merged = { ...merged, message: options as any };
    } else if (options !== undefined && options !== null) {
      merged = { ...merged, message: String(options) };
    }
  }

  return {
    ...merged,
    type: merged.type || "text",
    position: merged.position || "middle",
    message: merged.message ?? "",
    wordBreak: merged.wordBreak || "break-all",
    iconSize: merged.iconSize || 36,
    loadingType: merged.loadingType || "circular",
    duration: merged.duration ?? 2000,
    overlay: merged.overlay ?? false,
    forbidClick: merged.forbidClick ?? false,
    closeOnClick: merged.closeOnClick ?? false,
    closeOnClickOverlay: merged.closeOnClickOverlay ?? false,
    zIndex: merged.zIndex ?? 2000
  };
};

const createId = () => `toast-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const createToast = (options: ToastOptions | string | ReactNode, type?: ToastType): ToastInstance => {
  const normalized = normalizeOptions(options, type);
  const id = createId();
  lastId = id;

  if (!allowMultiple) {
    emit({ type: "removeAll" });
  }

  const toast: ToastState = { id, options: normalized };
  emit({ type: "add", toast });

  let closed = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const startTimer = () => {
    if (normalized.duration && normalized.duration > 0) {
      timer = setTimeout(() => {
        instance.close();
      }, normalized.duration);
    }
  };
  startTimer();

  const instance: ToastInstance = {
    close: () => {
      if (closed) return;
      closed = true;
      if (timer) clearTimeout(timer);
      emit({ type: "remove", id });
      toast.options.onClose?.();
    },
    setMessage: msg => {
      emit({ type: "update", id, options: { message: msg } });
    },
    update: opts => {
      emit({ type: "update", id, options: opts });
    }
  };

  return instance;
};

// Public helpers
export const showToast = (options: ToastOptions | string | ReactNode) => createToast(options, "text");
export const showLoadingToast = (options: ToastOptions | string | ReactNode) => createToast(options, "loading");
export const showSuccessToast = (options: ToastOptions | string | ReactNode) => createToast(options, "success");
export const showFailToast = (options: ToastOptions | string | ReactNode) => createToast(options, "fail");

export const closeToast = (closeAll = false) => {
  if (closeAll) {
    emit({ type: "removeAll" });
    return;
  }
  if (lastId) emit({ type: "remove", id: lastId });
};

export const allowMultipleToast = () => {
  allowMultiple = true;
};

export const setToastDefaultOptions = (typeOrOpts: ToastType | ToastOptions, opts?: ToastOptions) => {
  if (typeof typeOrOpts === "string") {
    typeDefaults[typeOrOpts] = { ...(typeDefaults[typeOrOpts] || {}), ...(opts || {}) };
  } else {
    globalDefaults = { ...globalDefaults, ...(typeOrOpts || {}) };
  }
};

export const resetToastDefaultOptions = (type?: ToastType) => {
  if (type) {
    delete typeDefaults[type];
  } else {
    globalDefaults = {};
    typeDefaults["loading"] = {};
    typeDefaults["success"] = {};
    typeDefaults["fail"] = {};
    typeDefaults["text"] = {};
  }
};

// Provider to render toasts
type ToastProviderProps = {
  children?: ReactNode;
};

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  useEffect(() => {
    const unsub = subscribe(action => {
      setToasts(prev => {
        switch (action.type) {
          case "add": {
            const filtered = prev.filter(t => t.id !== action.toast.id);
            return [...filtered, action.toast];
          }
          case "remove": {
            return prev.map(t => (t.id === action.id ? { ...t, closing: true } : t));
          }
          case "removeAll": {
            return prev.map(t => ({ ...t, closing: true }));
          }
          case "update": {
            return prev.map(t =>
              t.id === action.id
                ? { ...t, options: { ...t.options, ...(action.options || {}) } as ToastResolvedOptions }
                : t
            );
          }
          default:
            return prev;
        }
      });
    });
    return unsub;
  }, []);

  const handleFinish = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const hasOverlay = useMemo(() => toasts.some(t => t.options.overlay || t.options.forbidClick), [toasts]);
  const hasVisualOverlay = useMemo(() => toasts.some(t => t.options.overlay), [toasts]);
  const highestZ = useMemo(() => (toasts.length ? Math.max(...toasts.map(t => t.options.zIndex || 0)) : 0), [toasts]);

  return (
    <>
      {children}
      {hasOverlay ? (
        <TouchableWithoutFeedback
          onPress={() => {
            const closable = toasts.filter(t => t.options.closeOnClickOverlay);
            if (closable.length) {
              closable.forEach(t => emit({ type: "remove", id: t.id }));
            }
          }}
        >
          <View
            style={[
              styles.overlay,
              {
                zIndex: highestZ - 1,
                backgroundColor: hasVisualOverlay ? "rgba(0,0,0,0.4)" : "transparent"
              }
            ]}
            pointerEvents="auto"
          />
        </TouchableWithoutFeedback>
      ) : null}
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onFinish={handleFinish} />
      ))}
    </>
  );
}

type ToastItemProps = {
  toast: ToastState;
  onFinish: (id: string) => void;
};

function ToastItem({ toast, onFinish }: ToastItemProps) {
  const anim = useRef(new Animated.Value(0)).current;
  const mountedRef = useRef(false);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: toast.closing ? 0 : 1,
      duration: 180,
      easing: toast.closing ? Easing.in(Easing.cubic) : Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start(() => {
      if (toast.closing) {
        onFinish(toast.id);
      } else if (!mountedRef.current) {
        mountedRef.current = true;
        toast.options.onOpened?.();
      }
    });
  }, [anim, onFinish, toast.closing, toast.id, toast.options]);

  const handlePress = () => {
    if (toast.options.closeOnClick) {
      emit({ type: "remove", id: toast.id });
    }
  };

  const positionStyle = useMemo<ViewStyle>(() => {
    switch (toast.options.position) {
      case "top":
        return { justifyContent: "flex-start", paddingTop: 80 };
      case "bottom":
        return { justifyContent: "flex-end", paddingBottom: 80 };
      default:
        return { justifyContent: "center" };
    }
  }, [toast.options.position]);

  const iconNode = useMemo(() => {
    if (toast.options.type === "loading") {
      return (
        <View style={styles.iconWrap}>
          <AnimatedSpinner size={toast.options.iconSize} type={toast.options.loadingType} />
        </View>
      );
    }
    if (toast.options.icon) {
      if (React.isValidElement(toast.options.icon)) {
        return <View style={styles.iconWrap}>{toast.options.icon}</View>;
      }
      if (typeof toast.options.icon === "string") {
        const isImage = toast.options.icon.startsWith("http") || toast.options.icon.includes("/");
        if (isImage) {
          return (
            <Image
              source={{ uri: toast.options.icon }}
              style={[styles.iconImage, { width: toast.options.iconSize, height: toast.options.iconSize }]}
            />
          );
        }
        return (
          <MaterialIcons
            name={toast.options.icon}
            size={toast.options.iconSize}
            color={Colors.white}
            style={styles.iconWrap}
          />
        );
      }
    }
    if (toast.options.type === "success") {
      return <MaterialIcons name="check-circle" size={toast.options.iconSize} color={Colors.white} style={styles.iconWrap} />;
    }
    if (toast.options.type === "fail") {
      return <MaterialIcons name="highlight-off" size={toast.options.iconSize} color={Colors.white} style={styles.iconWrap} />;
    }
    return null;
  }, [toast.options.icon, toast.options.iconSize, toast.options.loadingType, toast.options.type]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[
          styles.toastContainer,
          positionStyle,
          { zIndex: toast.options.zIndex },
          { opacity: anim, transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] }
        ]}
        pointerEvents="box-none"
      >
        <View style={styles.toastCard} pointerEvents={toast.options.forbidClick ? "box-none" : "auto"}>
          {iconNode}
          {toast.options.type === "html" && React.isValidElement(toast.options.message) ? (
            <View>{toast.options.message}</View>
          ) : (
            <Text style={styles.toastText}>{toast.options.message as any}</Text>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

function AnimatedSpinner({ size = 36, type = "circular" }: { size?: number; type?: "spinner" | "circular" }) {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true
      })
    );
    loop.start();
    return () => {
      rotate.stopAnimation();
    };
  }, [rotate]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  if (type === "spinner") {
    return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <MaterialIcons name="autorenew" size={size} color={Colors.white} />
      </Animated.View>
    );
  }
  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 3,
        borderColor: "rgba(255,255,255,0.4)",
        borderTopColor: Colors.white,
        transform: [{ rotate: spin }]
      }}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  toastContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    paddingHorizontal: Theme.spacing.lg
  },
  toastCard: {
    minWidth: 96,
    maxWidth: "80%",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: Theme.radius.md,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center"
  },
  toastText: {
    color: Colors.white,
    fontSize: Theme.fontSize.md,
    textAlign: "center"
  },
  iconWrap: {
    marginBottom: Theme.spacing.sm,
    textAlign: "center"
  },
  iconImage: {
    marginBottom: Theme.spacing.sm
  }
});
