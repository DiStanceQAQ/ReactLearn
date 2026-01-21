import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp
} from "react-native";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

export type BadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export type BadgeProps = {
  content?: number | string;
  color?: string;
  dot?: boolean;
  max?: number | string;
  offset?: [number | string, number | string];
  showZero?: boolean;
  position?: BadgePosition;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

function formatContent(content: number | string | undefined, max?: number | string) {
  if (content === undefined || content === null) return "";
  if (max === undefined || max === null) return content;
  const num = Number(content);
  const maxNum = Number(max);
  if (Number.isFinite(num) && Number.isFinite(maxNum) && num > maxNum) {
    return `${maxNum}+`;
  }
  return content;
}

function BadgeComponent({
  content,
  color = "#ee0a24",
  dot = false,
  max,
  offset,
  showZero = true,
  position = "top-right",
  children,
  style
}: BadgeProps) {
  const isNumberZero = content === 0 || content === "0";
  if (!dot && (content === undefined || content === null || content === "") && !children) {
    return null;
  }
  if (!showZero && isNumberZero && !dot) {
    return children ? <>{children}</> : null;
  }

  const display = dot ? null : formatContent(content, max);
  const hasChild = Boolean(children);

  const offsetStyle: ViewStyle = {};
  if (offset && offset.length === 2) {
    const [x, y] = offset;
    const dx = typeof x === "number" ? x : Number(x);
    const dy = typeof y === "number" ? y : Number(y);
    if (Number.isFinite(dx)) offsetStyle.marginLeft = dx;
    if (Number.isFinite(dy)) offsetStyle.marginTop = dy;
  }

  const positionStyle: ViewStyle = (() => {
    switch (position) {
      case "top-left":
        return { top: -6, left: -6 };
      case "bottom-left":
        return { bottom: -6, left: -6 };
      case "bottom-right":
        return { bottom: -6, right: -6 };
      case "top-right":
      default:
        return { top: -6, right: -6 };
    }
  })();

  const badgeNode = (
    <View
      style={[
        styles.badge,
        dot ? styles.dot : null,
        { backgroundColor: color },
        positionStyle,
        offsetStyle
      ]}
    >
      {!dot ? (
        <Text style={styles.text} numberOfLines={1}>
          {display}
        </Text>
      ) : null}
    </View>
  );

  if (!hasChild) {
    return (
      <View style={[styles.standalone, style]}>
        {badgeNode}
      </View>
    );
  }

  return (
    <View style={[styles.wrap, style]}>
      {children}
      {badgeNode}
    </View>
  );
}

export default BadgeComponent;

const styles = StyleSheet.create({
  wrap: {
    alignSelf: "flex-start",
    justifyContent: "center"
  },
  standalone: {
    alignSelf: "flex-start",
    justifyContent: "center",
    paddingTop: 6,
    paddingLeft: 6
  },
  badge: {
    position: "absolute",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4,
    backgroundColor: "#ee0a24",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.white
  },
  text: {
    color: Colors.white,
    fontSize: Theme.fontSize.xs,
    lineHeight: Theme.lineHeight.sm,
    textAlign: "center"
  },
  dot: {
    width: 8,
    minWidth: 8,
    height: 8,
    borderRadius: 4,
    paddingHorizontal: 0
  }
});
