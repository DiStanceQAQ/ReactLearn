import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ViewStyle
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";
import { DropdownMenuContext, DropdownValue, useDropdownMenuContext } from "./DropdownMenuComponent";
import { OverlayRenderProps, useOverlayHost } from "../../overlay/OverlayHost";

export type DropdownOption = {
  text: string;
  value: DropdownValue;
  disabled?: boolean;
  icon?: ReactNode;
};

export type DropdownItemProps = {
  index?: number;
  title?: string;
  options?: DropdownOption[];
  value?: DropdownValue;
  defaultValue?: DropdownValue;
  disabled?: boolean;
  placeholder?: string;
  activeColor?: string;
  inactiveColor?: string;
  closeOnSelect?: boolean;
  onChange?: (val: DropdownValue) => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

function DropdownItemComponent({
  index,
  title,
  options = [],
  value,
  defaultValue,
  disabled = false,
  placeholder = "请选择",
  activeColor,
  inactiveColor,
  closeOnSelect = true,
  onChange,
  children,
  style
}: DropdownItemProps) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const menu = useDropdownMenuContext();
  const overlayHost = useOverlayHost();
  const overlayKeyRef = useRef<string | null>(null);
  const overlayFinishCloseRef = useRef<(() => void) | null>(null);
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState<DropdownValue | undefined>(
    () => defaultValue
  );

  const currentValue = isControlled ? value : innerValue ?? defaultValue;
  const activeOption = useMemo(
    () => options.find(opt => opt.value === currentValue),
    [options, currentValue]
  );
  const displayTitle = title ?? activeOption?.text ?? placeholder;
  const isPlaceholder = !title && !activeOption;

  const visible = menu?.activeIndex === index;
  const hasPosition = Boolean(menu?.barPosition);
  const [mounted, setMounted] = useState(Boolean(visible && hasPosition));
  const anim = useRef(new Animated.Value(visible && hasPosition ? 1 : 0)).current;
  const shouldInstantClose = !visible && menu?.instantCloseIndex === index;
  const prevVisibleRef = useRef<boolean>(visible && hasPosition);
  const duration = menu?.duration ?? 200;
  const measureBar = menu?.measureBar ?? (() => undefined);

  useEffect(() => {
    const prevVisible = prevVisibleRef.current;
    const nextVisible = Boolean(visible && hasPosition);
    if (nextVisible === prevVisible && !shouldInstantClose) return;
    prevVisibleRef.current = nextVisible;

    if (nextVisible) {
      setMounted(true);
      measureBar();
    }
    if (shouldInstantClose) {
      anim.stopAnimation();
      anim.setValue(0);
      setMounted(false);
      overlayFinishCloseRef.current?.();
      overlayFinishCloseRef.current = null;
      return;
    }
    Animated.timing(anim, {
      toValue: nextVisible ? 1 : 0,
      duration,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished && !nextVisible) {
        setMounted(false);
        overlayFinishCloseRef.current?.();
        overlayFinishCloseRef.current = null;
      }
    });
  }, [anim, duration, hasPosition, measureBar, shouldInstantClose, visible]);

  const handleTitlePress = () => {
    if (disabled || index === undefined) return;
    menu?.toggleItem(index);
  };

  const closeMenu = () => {
    if (menu) {
      menu.closeMenu();
    }
  };

  const handleSelect = useCallback(
    (val: DropdownValue) => {
      if (disabled) return;
      if (!isControlled) {
        setInnerValue(val);
      }
      onChange?.(val);
      if (menu && index !== undefined) {
        menu.onItemChange?.(index, val);
      }
      if (closeOnSelect) {
        closeMenu();
      }
    },
    [closeOnSelect, disabled, index, isControlled, menu, onChange]
  );

  const content = useMemo(() => {
    if (children) return children;
    return (
      <ScrollView style={styles.optionsList}>
        {options.map((opt, optIndex) => {
          const active = opt.value === currentValue;
          const itemColor = active
            ? activeColor ?? menu?.activeColor ?? Colors.primary
            : inactiveColor ?? menu?.inactiveColor ?? Colors.text.primary;
          const isLast = optIndex === options.length - 1;
          return (
            <Pressable
              key={String(opt.value)}
              onPress={() => !opt.disabled && handleSelect(opt.value)}
              disabled={opt.disabled}
              style={({ pressed }) => [
                styles.optionRow,
                pressed && !opt.disabled ? styles.optionPressed : null,
                opt.disabled ? styles.optionDisabled : null,
                !isLast ? styles.optionDivider : null
              ]}
            >
              <View style={styles.optionTextWrap}>
                {opt.icon ? <View style={styles.optionIcon}>{opt.icon}</View> : null}
                <Text style={[styles.optionText, { color: itemColor }]}>
                  {opt.text}
                </Text>
              </View>
              {active ? (
                <MaterialIcons
                  name="check"
                  size={18}
                  color={activeColor ?? menu?.activeColor ?? Colors.primary}
                />
              ) : null}
            </Pressable>
          );
        })}
      </ScrollView>
    );
  }, [activeColor, children, currentValue, handleSelect, inactiveColor, menu?.activeColor, menu?.inactiveColor, options]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [menu?.direction === "down" ? -8 : 8, 0]
  });

  const arrowRotation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"]
  });

  const panelPositionStyle = useMemo(() => {
    if (!menu?.barPosition) {
      return menu?.direction === "up" ? { bottom: 0 } : { top: 0 };
    }
    const left = Math.max(menu.barPosition.x, 0);
    const width = Math.min(menu.barPosition.width, windowWidth - left);
    if (menu.direction === "down") {
      return { top: menu.barPosition.y + menu.barPosition.height, left, width };
    }
    return { bottom: Math.max(windowHeight - menu.barPosition.y, 0), left, width };
  }, [menu?.barPosition, menu?.direction, windowHeight, windowWidth]);

  const panelRadiusStyle = menu?.direction === "down"
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
    : { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 };

  // Cover整屏，点击任意空白处都可关闭；不再限制只在bar下方
  const overlayInsetStyle = useMemo(() => ({ top: 0, bottom: 0 }), []);

  const handleOverlayPress = () => {
    const shouldClose = menu?.overlay
      ? menu.closeOnPressOverlay
      : menu?.closeOnPressOutside;
    if (shouldClose ?? true) {
      closeMenu();
    }
  };

  const renderPortalRef = useRef<(overlayProps?: OverlayRenderProps) => React.ReactNode>(() => null);
  renderPortalRef.current = overlayProps => {
    overlayFinishCloseRef.current = overlayProps?.finishClose ?? null;
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {menu?.overlay ? (
          <Pressable
            style={[StyleSheet.absoluteFillObject, overlayInsetStyle]}
            onPress={handleOverlayPress}
          />
        ) : null}

        <Animated.View
          style={[
            styles.panel,
            panelPositionStyle,
            panelRadiusStyle,
            { opacity: anim, transform: [{ translateY }], zIndex: 2 }
          ]}
        >
          {/* 为自定义内容提供上下文 */}
          <DropdownMenuContext.Provider value={menu}>
            {content}
          </DropdownMenuContext.Provider>
        </Animated.View>
      </View>
    );
  };

  useEffect(() => {
    if (!overlayHost) return;
    if (!mounted) {
      overlayFinishCloseRef.current?.();
      overlayFinishCloseRef.current = null;
      if (overlayKeyRef.current) {
        overlayHost.close(overlayKeyRef.current);
        overlayKeyRef.current = null;
      }
      return;
    }
    const key = overlayHost.open({
      key: overlayKeyRef.current ?? undefined,
      overlayColor: "transparent",
      overlayOpacity: 0,
      closeOnOverlayPress: false,
      waitForRenderClose: true,
      zIndex: (menu?.zIndex ?? Theme.zIndex.popup) + 1,
      render: overlayProps => renderPortalRef.current(overlayProps)
    });
    overlayKeyRef.current = key;
    return () => {
      if (!mounted && overlayKeyRef.current) {
        overlayHost.close(overlayKeyRef.current);
        overlayKeyRef.current = null;
      }
    };
  }, [mounted, overlayHost, menu?.zIndex, content]);

  useEffect(
    () => () => {
      if (overlayKeyRef.current && overlayHost) {
        overlayHost.close(overlayKeyRef.current);
      }
      overlayKeyRef.current = null;
      overlayFinishCloseRef.current?.();
      overlayFinishCloseRef.current = null;
    },
    [overlayHost]
  );

  if (!menu) {
    return null;
  }

  return (
    <View
      style={[
        styles.item,
        style,
        menu.scrollable ? { minWidth: menu.minItemWidth } : { flex: 1 }
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          styles.titleWrap,
          pressed && !disabled ? styles.titlePressed : null
        ]}
        onPress={handleTitlePress}
        disabled={disabled}
      >
        <Text
          style={[
            styles.titleText,
            {
              color:
                menu.activeIndex === index
                  ? activeColor ?? menu.activeColor
                  : isPlaceholder
                    ? inactiveColor ?? menu.inactiveColor ?? Colors.text.secondary
                    : menu.textColor ?? Colors.text.primary
            },
            disabled ? styles.titleDisabled : null,
            menu.activeIndex === index ? styles.titleTextActive : null
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {displayTitle}
        </Text>
        <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={18}
            color={
              menu.activeIndex === index
                ? activeColor ?? menu.activeColor
                : inactiveColor ?? menu.inactiveColor ?? Colors.text.secondary
            }
          />
        </Animated.View>
      </Pressable>

    </View>
  );
}

export default DropdownItemComponent;

const styles = StyleSheet.create({
  item: {
    flex: 1
  },
  titleWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.sm,
    gap: 2,
    flex: 1,
    minWidth: 0
  },
  titleText: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.primary,
    maxWidth: "90%",
    flexShrink: 1
  },
  titleTextActive: {
    fontWeight: "600"
  },
  titleDisabled: {
    color: Colors.text.light
  },
  titlePressed: {
    opacity: 0.85
  },
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    maxHeight: 360,
    overflow: "hidden",
    borderWidth: Theme.border.width,
    borderColor: Theme.border.color,
  },
  optionsList: {
    maxHeight: 360
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md
  },
  optionPressed: {
    backgroundColor: "#f5f5f5"
  },
  optionDisabled: {
    opacity: Theme.opacity.disabled
  },
  optionDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border
  },
  optionTextWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Theme.spacing.sm
  },
  optionIcon: {
    marginRight: Theme.spacing.xs
  },
  optionText: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.primary
  }
});
