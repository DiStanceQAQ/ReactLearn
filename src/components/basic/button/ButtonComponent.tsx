import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  GestureResponderEvent,
  Image,
  Linking,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

export type ButtonType = "default" | "primary" | "success" | "warning" | "danger";
export type ButtonSize = "large" | "normal" | "small" | "mini";
export type ButtonNativeType = "button" | "submit" | "reset";
export type ButtonIconPosition = "left" | "right";

export type ButtonProps = {
  type?: ButtonType;
  size?: ButtonSize;
  text?: string;
  color?: string;
  icon?: ReactNode | string;
  iconPrefix?: string;
  iconPosition?: ButtonIconPosition;
  tag?: string;
  nativeType?: ButtonNativeType;
  block?: boolean;
  plain?: boolean;
  square?: boolean;
  round?: boolean;
  disabled?: boolean;
  hairline?: boolean;
  loading?: boolean;
  loadingText?: string;
  loadingType?: "spinner" | "circular";
  loadingSize?: number;
  url?: string;
  to?: string | object;
  replace?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
};

type Palette = { background: string; border: string; text: string; ripple: string };
type SizeStyle = { height: number; paddingHorizontal: number; fontSize: number };

const TYPE_PALETTE: Record<ButtonType, { background: string; text: string; border: string }> = {
  default: { background: Colors.white, text: Colors.text.primary, border: Colors.border },
  primary: { background: Colors.primary, text: Colors.white, border: Colors.primary },
  success: { background: "#4caf50", text: Colors.white, border: "#4caf50" },
  warning: { background: Colors.orange, text: Colors.white, border: Colors.orange },
  danger: { background: "#f44336", text: Colors.white, border: "#f44336" }
};

const SIZE_MAP: Record<ButtonSize, SizeStyle> = {
  large: { height: 50, paddingHorizontal: Theme.spacing.lg, fontSize: Theme.fontSize.lg },
  normal: { height: Theme.controlHeight.md, paddingHorizontal: Theme.spacing.lg, fontSize: Theme.fontSize.md },
  small: { height: 36, paddingHorizontal: Theme.spacing.md, fontSize: Theme.fontSize.sm },
  mini: { height: 30, paddingHorizontal: Theme.spacing.sm, fontSize: Theme.fontSize.sm }
};

const parseMainColor = (color?: string, fallback?: string) => {
  if (!color) return fallback;
  if (color.startsWith("linear-gradient")) {
    const hex = color.match(/#([0-9a-fA-F]{3,8})/);
    if (hex) return hex[0];
    const rgb = color.match(/rgb[a]?\(([^)]+)\)/);
    if (rgb) return `rgb(${rgb[1]})`;
    return fallback;
  }
  return color;
};

type LoadingSpinnerProps = {
  size?: number;
  color?: string;
  type?: "spinner" | "circular";
};

function LoadingSpinner({ size = 20, color = Colors.white, type = "circular" }: LoadingSpinnerProps) {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (type !== "spinner") return;
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
      loop.stop();
    };
  }, [rotate, type]);

  if (type === "spinner") {
    const spin = rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <MaterialIcons name="autorenew" size={size} color={color} />
      </Animated.View>
    );
  }
  return <ActivityIndicator size={size} color={color} />;
}

function ButtonComponent({
  type = "default",
  size = "normal",
  text,
  color,
  icon,
  iconPosition = "left",
  block = false,
  plain = false,
  square = false,
  round = false,
  disabled = false,
  hairline = false,
  loading = false,
  loadingText,
  loadingType = "circular",
  loadingSize = 20,
  url,
  to,
  replace = false,
  onPress,
  onPressIn,
  onPressOut,
  style,
  textStyle,
  children
}: ButtonProps) {
  let navigation: any = null;
  try {
    navigation = useNavigation<any>();
  } catch {
    navigation = null;
  }

  const palette: Palette = useMemo(() => {
    const base = TYPE_PALETTE[type];
    const main = parseMainColor(color, base.background) || base.background;
    const textColor = plain ? main : base.text;
    const borderColor = color ? main : base.border;
    return {
      background: plain ? Colors.white : main,
      border: borderColor,
      text: textColor,
      ripple: main
    };
  }, [color, plain, type]);

  const sizeStyle = useMemo(() => SIZE_MAP[size], [size]);
  const radius = square ? 0 : round ? 999 : Theme.radius.md;
  const isDisabled = disabled || loading;
  const content = loading ? (loadingText ?? text ?? children) : (text ?? children);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (isDisabled) return;
      onPress?.(event);
      if (to && navigation) {
        if (replace) {
          if (typeof to === "string") {
            navigation.dispatch(StackActions.replace(to));
          } else if (typeof to === "object" && "name" in to) {
            navigation.dispatch(StackActions.replace((to as any).name, (to as any).params));
          } else {
            navigation.dispatch(StackActions.replace(to as any));
          }
        } else {
          navigation.navigate(to as any);
        }
      }
      if (url) {
        Linking.openURL(url).catch(() => undefined);
      }
    },
    [isDisabled, navigation, onPress, replace, to, url]
  );

  const renderIcon = useCallback(() => {
    if (!icon || loading) return null;
    const spacing = iconPosition === "right" ? styles.iconRight : styles.iconLeft;
    if (React.isValidElement(icon)) {
      return <View style={[styles.iconWrap, spacing]}>{icon}</View>;
    }
    if (typeof icon === "string") {
      const isImage = icon.startsWith("http") || icon.includes("/") || icon.includes(".");
      if (isImage) {
        return (
          <Image
            source={{ uri: icon }}
            style={[styles.iconImage, spacing]}
            resizeMode="contain"
          />
        );
      }
      return (
        <MaterialIcons
          name={icon}
          size={16}
          color={palette.text}
          style={spacing}
        />
      );
    }
    return null;
  }, [icon, iconPosition, loading, palette.text]);

  const renderLoading = () => {
    if (!loading) return null;
    const spacing = iconPosition === "right" ? styles.iconRight : styles.iconLeft;
    return (
      <View style={spacing}>
        <LoadingSpinner size={loadingSize} color={palette.text} type={loadingType} />
      </View>
    );
  };

  const renderContentText = () => {
    if (content === undefined || content === null) return null;
    if (typeof content === "string" || typeof content === "number") {
      return (
        <Text
          style={[
            styles.text,
            { color: palette.text, fontSize: sizeStyle.fontSize },
            textStyle
          ]}
          numberOfLines={1}
        >
          {content}
        </Text>
      );
    }
    return content as React.ReactElement;
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: palette.background,
          borderColor: palette.border,
          borderWidth: hairline ? StyleSheet.hairlineWidth : Theme.border.width,
          borderRadius: radius,
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingHorizontal
        },
        block ? styles.block : null,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
        style
      ]}
      android_ripple={isDisabled ? undefined : { color: `${palette.ripple}55` }}
      accessibilityRole="button"
    >
      <View style={styles.inner}>
        {iconPosition === "left" ? renderLoading() || renderIcon() : null}
        {renderContentText()}
        {iconPosition === "right" ? renderLoading() || renderIcon() : null}
      </View>
    </Pressable>
  );
}

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.radius.md,
    borderWidth: Theme.border.width,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start"
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  block: {
    alignSelf: "stretch",
    width: "100%"
  },
  text: {
    fontWeight: "500"
  },
  iconWrap: {
    justifyContent: "center",
    alignItems: "center"
  },
  iconLeft: {
    marginRight: 6
  },
  iconRight: {
    marginLeft: 6
  },
  iconImage: {
    width: 18,
    height: 18
  },
  disabled: {
    opacity: Theme.opacity.disabled
  },
  pressed: {
    opacity: 0.92
  }
});
