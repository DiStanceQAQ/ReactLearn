import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

export type SwitchValue = boolean | string | number;

export type SwitchProps = {
  value?: SwitchValue;
  defaultValue?: SwitchValue;
  disabled?: boolean;
  loading?: boolean;
  size?: number | string;
  activeColor?: string;
  inactiveColor?: string;
  activeValue?: SwitchValue;
  inactiveValue?: SwitchValue;
  onChange?: (val: SwitchValue) => void;
  onValueChange?: (val: SwitchValue) => void;
  onPress?: (event: GestureResponderEvent, nextValue: SwitchValue) => void;
  renderNode?: () => React.ReactNode;
  renderBackground?: () => React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const DEFAULT_INACTIVE_COLOR = "rgba(120, 120, 128, 0.16)";

const normalizeSize = (size?: number | string, fallback = 26) => {
  if (typeof size === "number") return size;
  if (typeof size === "string") {
    const parsed = parseFloat(size);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

function SwitchComponent({
  value,
  defaultValue,
  disabled = false,
  loading = false,
  size,
  activeColor = Colors.primary,
  inactiveColor = DEFAULT_INACTIVE_COLOR,
  activeValue = true,
  inactiveValue = false,
  onChange,
  onValueChange,
  onPress,
  renderNode,
  renderBackground,
  style
}: SwitchProps) {
  const baseSize = normalizeSize(size);
  const trackWidth = useMemo(() => baseSize * 1.8 + 4, [baseSize]);
  const trackHeight = useMemo(() => baseSize + 4, [baseSize]);
  const translateDistance = useMemo(() => trackWidth - baseSize - 4, [baseSize, trackWidth]);

  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<SwitchValue>(defaultValue ?? inactiveValue);
  const currentValue = isControlled ? value! : innerValue;
  const checked = currentValue === activeValue;

  const progress = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: checked ? 1 : 0,
      duration: 180,
      easing: Easing.bezier(0.3, 1.05, 0.4, 1.05),
      useNativeDriver: false
    }).start();
  }, [checked, progress]);

  const handleToggle = (event: GestureResponderEvent) => {
    if (disabled || loading) return;
    const nextValue = checked ? inactiveValue : activeValue;
    if (!isControlled) {
      setInnerValue(nextValue);
    }
    onChange?.(nextValue);
    onValueChange?.(nextValue);
    onPress?.(event, nextValue);
  };

  const animatedBackground = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor]
  });

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, translateDistance]
  });

  const spinnerColor = checked ? activeColor : inactiveColor;
  const isInteractive = !(disabled || loading);

  return (
    <Pressable
      onPress={handleToggle}
      disabled={!isInteractive}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      style={({ pressed }) => [
        styles.wrapper,
        pressed && isInteractive ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style
      ]}
      android_ripple={isInteractive ? { color: `${activeColor}33`, borderless: true } : undefined}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: animatedBackground
          }
        ]}
      >
        {renderBackground ? (
          <View style={[StyleSheet.absoluteFillObject, styles.backgroundSlot]} pointerEvents="none">
            {renderBackground()}
          </View>
        ) : null}

        <Animated.View
          style={[
            styles.node,
            {
              width: baseSize,
              height: baseSize,
              borderRadius: baseSize / 2,
              transform: [{ translateX }]
            }
          ]}
        >
          {loading ? (
            <ActivityIndicator size={Math.max(baseSize * 0.55, 12)} color={spinnerColor} />
          ) : (
            renderNode?.()
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

export default SwitchComponent;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "flex-start"
  },
  track: {
    padding: 2,
    overflow: "hidden",
    justifyContent: "center"
  },
  node: {
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1
  },
  backgroundSlot: {
    borderRadius: 999
  },
  disabled: {
    opacity: Theme.opacity.disabled
  },
  pressed: {
    opacity: 0.9
  }
});
