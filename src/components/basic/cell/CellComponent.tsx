import React, { ReactElement, ReactNode, useMemo, useCallback } from "react";
import {
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

type CellSize = "large" | "normal";
type ArrowDirection = "left" | "up" | "down" | "right";

export type CellProps = {
  title?: ReactNode;
  value?: ReactNode;
  label?: ReactNode;
  size?: CellSize;
  icon?: ReactNode | string;
  iconPrefix?: string;
  tag?: string;
  url?: string;
  to?: string | object;
  border?: boolean;
  replace?: boolean;
  clickable?: boolean | null;
  isLink?: boolean;
  required?: boolean;
  center?: boolean;
  arrowDirection?: ArrowDirection;
  titleStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  rightIcon?: ReactNode;
  extra?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  children?: ReactNode;
};

type PrivateInjectedProps = {
  /** injected by CellGroup to control inner borders */
  isLast?: boolean;
  isInGroup?: boolean;
};

export function Cell({
  title,
  value,
  label,
  size = "normal",
  icon,
  border = true,
  clickable = null,
  isLink = false,
  required = false,
  center = false,
  arrowDirection = "right",
  titleStyle,
  valueStyle,
  labelStyle,
  rightIcon,
  extra,
  style,
  url,
  to,
  replace = false,
  onPress,
  disabled = false,
  children,
  isLast,
  isInGroup
}: CellProps & PrivateInjectedProps) {
  const navigation = useNavigation<any>();
  const isClickable = useMemo(
    () => (clickable === null ? isLink || Boolean(url) || Boolean(to) || Boolean(onPress) : clickable),
    [clickable, isLink, onPress, to, url]
  );

  const showBottomBorder = border && !(isInGroup && isLast);

  const arrowIconName = useMemo(() => {
    switch (arrowDirection) {
      case "left":
        return "chevron-left";
      case "up":
        return "expand-less";
      case "down":
        return "expand-more";
      default:
        return "chevron-right";
    }
  }, [arrowDirection]);

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (disabled || !isClickable) return;
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
    [disabled, isClickable, navigation, onPress, replace, to, url]
  );

  const leftIconNode = useMemo(() => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return <View style={styles.leftIcon}>{icon as ReactElement}</View>;
    }
    if (typeof icon === "string") {
      const isImage = icon.startsWith("http") || icon.includes("/") || icon.includes(".");
      if (isImage) {
        return (
          <Image
            source={{ uri: icon }}
            style={styles.iconImage}
            resizeMode="contain"
          />
        );
      }
      return (
        <MaterialIcons
          name={icon}
          size={20}
          color={Colors.text.primary}
          style={styles.leftIcon}
        />
      );
    }
    return null;
  }, [icon]);

  const rightIconNode = useMemo(() => {
    if (rightIcon) {
      return <View style={styles.rightIcon}>{rightIcon}</View>;
    }
    if (isLink) {
      return (
        <MaterialIcons
          name={arrowIconName}
          size={20}
          color={Colors.text.light}
          style={styles.rightIcon}
        />
      );
    }
    return null;
  }, [arrowIconName, isLink, rightIcon]);

  const TitleNode = () => {
    if (title === undefined || title === null) return null;
    if (React.isValidElement(title)) {
      return title as ReactElement;
    }
    return (
      <Text style={[styles.title, size === "large" && styles.titleLarge, titleStyle]}>
        {title}
      </Text>
    );
  };

  const ValueNode = () => {
    if (value === undefined || value === null) return null;
    if (React.isValidElement(value)) {
      return value as ReactElement;
    }
    return (
      <Text style={[styles.value, size === "large" && styles.valueLarge, valueStyle]} numberOfLines={1}>
        {value}
      </Text>
    );
  };

  const LabelNode = () => {
    if (label === undefined || label === null) return null;
    if (React.isValidElement(label)) {
      return label as ReactElement;
    }
    return (
      <Text style={[styles.label, labelStyle]} numberOfLines={2}>
        {label}
      </Text>
    );
  };
  const cellBaseStyle = useMemo(
    () => [
      styles.cell,
      size === "large" ? styles.cellLarge : null,
      center ? styles.cellCenter : null,
      disabled ? styles.cellDisabled : null,
      showBottomBorder ? styles.cellBorder : null,
      style
    ],
    [center, disabled, showBottomBorder, size, style]
  );

  return (
    isClickable ? (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          ...cellBaseStyle,
          pressed && !disabled ? styles.cellPressed : null
        ]}
        android_ripple={disabled ? undefined : { color: "#f2f3f5" }}
        accessibilityRole="button"
      >
        {leftIconNode}
        <View style={[styles.content, center ? styles.contentCenter : null]}>
          <View style={styles.titleRow}>
            {required ? <Text style={styles.required}>*</Text> : null}
            <TitleNode />
            {children}
          </View>
          <LabelNode />
        </View>
        <View style={styles.rightArea}>
          <ValueNode />
          {extra ? <View style={styles.extra}>{extra}</View> : null}
          {rightIconNode}
        </View>
      </Pressable>
    ) : (
      <View style={cellBaseStyle}>
        {leftIconNode}
        <View style={[styles.content, center ? styles.contentCenter : null]}>
          <View style={styles.titleRow}>
            {required ? <Text style={styles.required}>*</Text> : null}
            <TitleNode />
            {children}
          </View>
          <LabelNode />
        </View>
        <View style={styles.rightArea}>
          <ValueNode />
          {extra ? <View style={styles.extra}>{extra}</View> : null}
          {rightIconNode}
        </View>
      </View>
    )
  );
}

export type CellGroupProps = {
  title?: ReactNode;
  inset?: boolean;
  border?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export function CellGroup({
  title,
  inset = false,
  border = true,
  children,
  style,
  titleStyle
}: CellGroupProps) {
  const childArray = useMemo(() => React.Children.toArray(children), [children]);

  return (
    <View
      style={[
        styles.group,
        inset ? styles.groupInset : styles.groupFlat,
        border ? styles.groupBorder : null,
        style
      ]}
    >
      {title ? (
        <View style={styles.groupHeader}>
          {React.isValidElement(title) ? (
            title
          ) : (
            <Text style={[styles.groupTitle, titleStyle]}>{title}</Text>
          )}
        </View>
      ) : null}

      <View style={styles.groupBody}>
        {childArray.map((child, index) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as ReactElement, {
            isLast: index === childArray.length - 1,
            isInGroup: true
          } as PrivateInjectedProps);
        })}
      </View>
    </View>
  );
}

type CellComponentType = typeof Cell & {
  Group: typeof CellGroup;
};

const CellComponent = Object.assign(Cell, { Group: CellGroup }) as CellComponentType;

export default CellComponent;

const styles = StyleSheet.create({
  cell: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    backgroundColor: Colors.white
  },
  cellLarge: {
    paddingVertical: Theme.spacing.lg
  },
  cellCenter: {
    alignItems: "center"
  },
  cellBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border
  },
  cellDisabled: {
    opacity: Theme.opacity.disabled
  },
  content: {
    flex: 1
  },
  contentCenter: {
    justifyContent: "center"
  },
  cellPressed: {
    backgroundColor: "#f7f8fa"
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.primary
  },
  titleLarge: {
    fontSize: Theme.fontSize.lg
  },
  label: {
    marginTop: 2,
    fontSize: Theme.fontSize.sm,
    color: Colors.text.secondary
  },
  required: {
    color: Colors.required,
    marginRight: 4
  },
  value: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary
  },
  valueLarge: {
    fontSize: Theme.fontSize.lg
  },
  rightArea: {
    marginLeft: Theme.spacing.md,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  extra: {
    marginTop: 4
  },
  rightIcon: {
    marginTop: 2,
    marginLeft: Theme.spacing.xs
  },
  leftIcon: {
    marginRight: Theme.spacing.md
  },
  iconImage: {
    width: 22,
    height: 22,
    marginRight: Theme.spacing.md
  },
  group: {
    marginBottom: Theme.spacing.md
  },
  groupFlat: {
    backgroundColor: Colors.white
  },
  groupInset: {
    backgroundColor: Colors.white,
    marginHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    overflow: "hidden",
    ...Theme.shadow.card
  },
  groupBorder: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border
  },
  groupHeader: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.xs,
    backgroundColor: Colors.white
  },
  groupTitle: {
    fontSize: Theme.fontSize.sm,
    color: Colors.text.light
  },
  groupBody: {
    backgroundColor: Colors.white
  }
});
