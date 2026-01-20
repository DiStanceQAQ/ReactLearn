import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { Animated, Easing, Modal, Pressable, StyleSheet, View } from "react-native";
import { Theme } from "../../constants/theme";
import { useEffect } from "react";

const WARM_UP_KEY = "__overlay_warmup__";

export type OverlayRenderProps = {
  closing: boolean;
  progress: Animated.Value;
  requestClose: () => void;
  finishClose: () => void;
};

type OverlayOptions = {
  key?: string;
  render: (ctx: OverlayRenderProps) => React.ReactNode;
  overlayOpacity?: number;
  overlayColor?: string;
  closeOnOverlayPress?: boolean;
  zIndex?: number;
  onClose?: () => void;
  onOverlayPress?: () => void;
  disablePointerEvents?: boolean;
  waitForRenderClose?: boolean;
};

type OverlayEntry = Required<OverlayOptions> & {
  overlayAnim: Animated.Value;
  closing?: boolean;
  finished?: boolean;
};

type OverlayContextValue = {
  open: (options: OverlayOptions) => string;
  close: (key?: string) => void;
  closeAll: () => void;
  hasOverlay: boolean;
};

const OverlayContext = createContext<OverlayContextValue | null>(null);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function buildEntry(options: OverlayOptions): OverlayEntry {
  const key = options.key || `overlay-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return {
    key,
    render: options.render,
    overlayOpacity: options.overlayOpacity ?? Theme.opacity.overlay,
    overlayColor: options.overlayColor ?? "#000",
    closeOnOverlayPress: options.closeOnOverlayPress ?? true,
    zIndex: options.zIndex ?? Theme.zIndex.popup,
    onClose: options.onClose ?? (() => { }),
    onOverlayPress: options.onOverlayPress ?? (() => { }),
    disablePointerEvents: options.disablePointerEvents ?? false,
    waitForRenderClose: options.waitForRenderClose ?? false,
    overlayAnim: new Animated.Value(0)
  };
}

export function OverlayProvider({ children }: { children?: React.ReactNode }) {
  const [entries, setEntries] = useState<OverlayEntry[]>([]);
  const entriesRef = useRef(entries);
  entriesRef.current = entries;
  const [isWarmingUp, setIsWarmingUp] = useState(true);
  const warmedAnimDriver = useRef(false);
  const finishEntry = useCallback((entry: OverlayEntry) => {
    if (entry.finished) return;
    entry.finished = true;
    setEntries(prev => prev.filter(e => e.key !== entry.key));
    entry.onClose?.();
  }, []);

  // Mount Modal once on startup to warm native layer, then release to avoid blocking touches
  useEffect(() => {
    const timer = setTimeout(() => setIsWarmingUp(false), 80);
    return () => clearTimeout(timer);
  }, []);

  // Prime native animated driver to avoid first-run hitch
  useEffect(() => {
    if (warmedAnimDriver.current) return;
    warmedAnimDriver.current = true;
    const dummy = new Animated.Value(0);
    const anim = Animated.timing(dummy, {
      toValue: 1,
      duration: 1,
      easing: Easing.linear,
      useNativeDriver: true
    });
    anim.start(() => {
      dummy.stopAnimation();
      dummy.setValue(0);
    });
  }, []);

  const animateOpen = useCallback((entry: OverlayEntry) => {
    entry.overlayAnim.setValue(0);
    Animated.timing(entry.overlayAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();
  }, []);

  const animateClose = useCallback((entry: OverlayEntry) => {
    if (entry.closing) return;
    entry.closing = true;
    // Trigger a re-render so children see the `closing` flag and can play their exit animations
    setEntries(prev => [...prev]);
    Animated.timing(entry.overlayAnim, {
      toValue: 0,
      duration: 150,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true
    }).start(() => {
      if (!entry.waitForRenderClose) {
        finishEntry(entry);
      }
    });
  }, [finishEntry]);

  const close = useCallback((key?: string) => {
    if (key === WARM_UP_KEY) return;
    if (!key) {
      entriesRef.current.forEach(entry => {
        if (entry.key !== WARM_UP_KEY) {
          animateClose(entry);
        }
      });
      return;
    }
    const target = entriesRef.current.find(entry => entry.key === key);
    if (target) {
      animateClose(target);
    }
  }, [animateClose]);

  const open = useCallback((options: OverlayOptions) => {
    const entry = buildEntry(options);
    setEntries(prev => [...prev.filter(e => e.key !== entry.key), entry]);
    animateOpen(entry);
    return entry.key;
  }, [animateOpen]);

  const closeAll = useCallback(() => {
    entriesRef.current.forEach(entry => {
      if (entry.key !== WARM_UP_KEY) {
        animateClose(entry);
      }
    });
  }, [animateClose]);

  const value = useMemo(
    () => ({
      open,
      close,
      closeAll,
      hasOverlay: entries.length > 0
    }),
    [open, close, closeAll, entries.length]
  );

  // Warm up Modal/animation to avoid first-open stutter: keep a transparent, non-interactive entry mounted
  useEffect(() => {
    open({
      key: WARM_UP_KEY,
      render: () => null,
      overlayOpacity: 0,
      overlayColor: "transparent",
      closeOnOverlayPress: false,
      zIndex: -9999,
      disablePointerEvents: true
    });
  }, [open]);

  return (
    <OverlayContext.Provider value={value}>
      {children}
      <Modal
        transparent
        visible={isWarmingUp || entries.some(entry => entry.key !== WARM_UP_KEY)}
        animationType="none"
        statusBarTranslucent
      >
        {entries.map(entry => (
          <View
            key={entry.key}
            style={[styles.overlayWrapper, { zIndex: entry.zIndex }]}
            pointerEvents="box-none"
          >
            <AnimatedPressable
              style={[
                styles.overlay,
                {
                  backgroundColor: entry.overlayColor,
                  opacity: entry.overlayAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, entry.overlayOpacity]
                  })
                }
              ]}
              pointerEvents={entry.disablePointerEvents ? "none" : "auto"}
              onPress={() => {
                entry.onOverlayPress?.();
                if (entry.closeOnOverlayPress) {
                  close(entry.key);
                }
              }}
            />
            <View style={styles.contentArea} pointerEvents="box-none">
              {entry.render({
                closing: Boolean(entry.closing),
                progress: entry.overlayAnim,
                requestClose: () => close(entry.key),
                finishClose: () => finishEntry(entry)
              })}
            </View>
          </View>
        ))}
      </Modal>
    </OverlayContext.Provider>
  );
}

export function useOverlayHost() {
  return useContext(OverlayContext);
}

const styles = StyleSheet.create({
  overlayWrapper: {
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  contentArea: {
    ...StyleSheet.absoluteFillObject
  }
});

export default OverlayProvider;
