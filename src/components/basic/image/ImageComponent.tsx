import React, { ReactNode, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  StyleProp,
  ViewStyle,
  ImageStyle
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

export type ImageFit = "contain" | "cover" | "fill" | "none" | "scale-down";
export type ImagePosition = "top" | "right" | "bottom" | "left" | "center";

export type ImageProps = {
  src?: string;
  fit?: ImageFit;
  position?: ImagePosition;
  alt?: string;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  round?: boolean;
  block?: boolean;
  showError?: boolean;
  showLoading?: boolean;
  errorIcon?: string;
  loadingIcon?: string;
  iconSize?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
  onLoad?: () => void;
  onError?: () => void;
};

const fitMap: Record<ImageFit, "cover" | "contain" | "stretch" | "center"> = {
  contain: "contain",
  cover: "cover",
  fill: "stretch",
  none: "center",
  "scale-down": "contain"
};

export default function ImageComponent({
  src,
  fit = "fill",
  position = "center",
  alt = "",
  width,
  height,
  radius = 0,
  round = false,
  block = false,
  showError = true,
  showLoading = true,
  errorIcon = "broken-image",
  loadingIcon = "image",
  iconSize = 24,
  children,
  style,
  imageStyle,
  onPress,
  onLoad,
  onError
}: ImageProps) {
  const [loading, setLoading] = useState(Boolean(src));
  const [error, setError] = useState(false);

  const resizeMode = fitMap[fit] || "cover";
  const parsedWidth = typeof width === "number" ? width : width ? parseFloat(String(width)) : undefined;
  const parsedHeight = typeof height === "number" ? height : height ? parseFloat(String(height)) : undefined;

  const wrapperStyle = useMemo<StyleProp<ViewStyle>>(() => {
    const base: ViewStyle = {
      overflow: "hidden",
      borderRadius: round ? 9999 : typeof radius === "number" ? radius : parseFloat(String(radius)) || 0,
      width: parsedWidth,
      height: parsedHeight,
      alignSelf: block ? "stretch" : "flex-start"
    };
    return [styles.container, base, style];
  }, [block, parsedHeight, parsedWidth, radius, round, style]);

  const positionStyle: ImageStyle = useMemo(() => {
    switch (position) {
      case "top":
        return { alignSelf: "center" };
      case "bottom":
        return { alignSelf: "center" };
      case "left":
        return { alignSelf: "flex-start" };
      case "right":
        return { alignSelf: "flex-end" };
      default:
        return { alignSelf: "center" };
    }
  }, [position]);

  const renderPlaceholder = () => {
    if (loading && showLoading) {
      return (
        <View style={styles.placeholder} pointerEvents="none">
          <ActivityIndicator size="small" color={Colors.text.light} />
          <MaterialIcons name={loadingIcon} size={iconSize} color={Colors.text.light} />
        </View>
      );
    }
    if (error && showError) {
      return (
        <View style={styles.placeholder} pointerEvents="none">
          <MaterialIcons name={errorIcon} size={iconSize} color={Colors.text.light} />
          {alt ? <Text style={styles.altText}>{alt}</Text> : null}
        </View>
      );
    }
    return null;
  };

  const body = (
    <View style={wrapperStyle}>
      {src && !error ? (
        <Image
          source={{ uri: src }}
          resizeMode={resizeMode}
          style={[styles.image, positionStyle, imageStyle]}
          onLoad={() => {
            setLoading(false);
            setError(false);
            onLoad?.();
          }}
          onError={() => {
            setLoading(false);
            setError(true);
            onError?.();
          }}
        />
      ) : null}
      {!src ? (
        <View style={[styles.placeholder, { height: parsedHeight ?? 120 }]}>
          <MaterialIcons name={loadingIcon} size={iconSize} color={Colors.text.light} />
        </View>
      ) : null}
      {renderPlaceholder()}
      {children ? <View style={styles.footer}>{children}</View> : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={wrapperStyle}>
        {body.props.children}
      </Pressable>
    );
  }

  return body;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    gap: Theme.spacing.xs
  },
  altText: {
    color: Colors.text.secondary,
    fontSize: Theme.fontSize.sm
  },
  footer: {
    marginTop: Theme.spacing.md,
    alignItems: "center",
    justifyContent: "center"
  }
});
