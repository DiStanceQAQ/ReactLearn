import React, { ReactNode, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

export type EmptyImageType = "default" | "error" | "network" | "search";

export type EmptyProps = {
  image?: EmptyImageType | string;
  imageSize?: number | string | [number | string, number | string];
  description?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ViewStyle>;
};

const iconMap: Record<EmptyImageType, string> = {
  default: "hourglass-empty",
  error: "error-outline",
  network: "wifi-off",
  search: "search"
};

function parseSize(size?: number | string | [number | string, number | string]) {
  if (Array.isArray(size)) {
    const [w, h] = size;
    return {
      width: typeof w === "number" ? w : parseFloat(w),
      height: typeof h === "number" ? h : parseFloat(h)
    };
  }
  if (typeof size === "number") {
    return { width: size, height: size };
  }
  if (typeof size === "string") {
    const num = parseFloat(size);
    return { width: num, height: num };
  }
  return null;
}

export default function EmptyComponent({
  image = "default",
  imageSize = 120,
  description = "",
  children,
  style,
  descriptionStyle,
  imageStyle
}: EmptyProps) {
  const sizeStyle = useMemo(() => parseSize(imageSize), [imageSize]);

  const imageNode = useMemo(() => {
    if (image && typeof image === "string" && image.startsWith("http")) {
      return (
        <Image
          source={{ uri: image }}
          style={[styles.image, sizeStyle || styles.defaultSize, imageStyle as any]}
          resizeMode="contain"
        />
      );
    }
    const iconName = iconMap[(image as EmptyImageType) || "default"] || iconMap.default;
    const size = sizeStyle?.width ?? 120;
    return (
      <MaterialIcons
        name={iconName}
        size={size}
        color={Colors.text.light}
        style={imageStyle as any}
      />
    );
  }, [image, imageStyle, sizeStyle]);

  return (
    <View style={[styles.container, style]}>
      {imageNode}
      {description ? (
        <Text style={[styles.description, descriptionStyle]} numberOfLines={2}>
          {description}
        </Text>
      ) : null}
      {children ? <View style={styles.footer}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.lg
  },
  image: {
    marginBottom: Theme.spacing.md
  },
  defaultSize: {
    width: 120,
    height: 120
  },
  description: {
    marginTop: Theme.spacing.sm,
    color: Colors.text.secondary,
    fontSize: Theme.fontSize.md,
    textAlign: "center",
    lineHeight: Theme.lineHeight.lg
  },
  footer: {
    marginTop: Theme.spacing.lg,
    alignItems: "center"
  }
});
