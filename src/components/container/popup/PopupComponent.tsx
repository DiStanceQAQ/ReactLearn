// src/components/container/popup/PopupComponent.tsx
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
  StyleProp,
  ViewStyle,
  Easing
} from "react-native";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

type Position = "center" | "top" | "bottom" | "left" | "right";
type CloseIconPosition = "top-right" | "top-left" | "bottom-left" | "bottom-right";

type Props = {
  visible: boolean;
  children?: ReactNode;
  position?: Position;
  round?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
  closeable?: boolean;
  closeIcon?: ReactNode;
  closeIconPosition?: CloseIconPosition;
  closeOnClickOverlay?: boolean;
  onClose?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  safeAreaInsetBottom?: boolean;
  zIndex?: number;
};

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default function PopupComponent({
  visible,
  children,
  position = "center",
  round = false,
  overlay = true,
  overlayOpacity = Theme.opacity.overlay,
  closeable = false,
  closeIcon,
  closeIconPosition = "top-right",
  closeOnClickOverlay = true,
  onClose,
  contentStyle,
  overlayStyle,
  safeAreaInsetBottom = false,
  zIndex = Theme.zIndex.popup
}: Props) {
  const [mounted, setMounted] = useState(visible);
  const translateAnim = useRef(new Animated.Value(visible ? 0 : getHiddenOffset(position))).current;
  const scaleAnim = useRef(new Animated.Value(visible ? 1 : 0.9)).current;
  const contentOpacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const overlayAnim = useRef(new Animated.Value(visible && overlay ? 1 : 0)).current;

  const hiddenOffset = useMemo(() => getHiddenOffset(position), [position]);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      // reset start values before入场动画
      translateAnim.setValue(hiddenOffset);
      contentOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(overlayAnim, {
          toValue: overlay ? 1 : 0,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateAnim, {
          toValue: hiddenOffset,
          duration: 450,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: position === "center" ? 0.9 : 1,
          duration: 450,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(contentOpacity, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 350,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true
        })
      ]).start(() => {
        setMounted(false);
      });
    }
  }, [visible, hiddenOffset, overlay, position, translateAnim, scaleAnim, overlayAnim, contentOpacity]);

  const containerPositionStyle = useMemo(() => getContainerPositionStyle(position), [position]);
  const contentRoundStyle = useMemo(() => getRoundStyle(position, round), [position, round]);
  const contentBaseStyle = useMemo(() => getContentBaseStyle(position), [position]);
  const closeIconStyle = useMemo(() => getCloseIconPositionStyle(closeIconPosition), [closeIconPosition]);

  if (!mounted) {
    return null;
  }

  const handleOverlayPress = () => {
    if (!closeOnClickOverlay) return;
    onClose?.();
  };

  const renderCloseIcon = () => {
    if (!closeable) return null;
    return (
      <Pressable onPress={onClose} hitSlop={10} style={[styles.closeIconWrap, closeIconStyle]}>
        {closeIcon ? <View>{closeIcon}</View> : <Text style={styles.closeIcon}>{"\u00d7"}</Text>}
      </Pressable>
    );
  };

  const animatedContentStyle =
    position === "center"
      ? { opacity: contentOpacity, transform: [{ scale: scaleAnim }] }
      : { opacity: contentOpacity, transform: [getTranslateTransform(position, translateAnim)] };

  const animatedOverlayStyle = {
    opacity: overlayAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, overlayOpacity]
    })
  };

  return (
    <Modal transparent visible={mounted} animationType="none" onRequestClose={onClose}>
      <View style={[styles.wrapper, containerPositionStyle, { zIndex }]}>
        {overlay ? (
          <Animated.View style={[styles.overlay, overlayStyle, animatedOverlayStyle]}>
            <Pressable style={styles.overlayPressArea} onPress={handleOverlayPress} />
          </Animated.View>
        ) : null}

        <Animated.View
          style={[
            styles.content,
            contentBaseStyle,
            contentRoundStyle,
            safeAreaInsetBottom ? styles.safeAreaBottom : null,
            animatedContentStyle,
            contentStyle
          ]}
        >
          {children}
          {renderCloseIcon()}
        </Animated.View>
      </View>
    </Modal>
  );
}

function getHiddenOffset(position: Position) {
  switch (position) {
    case "top":
      return -screenHeight;
    case "bottom":
      return screenHeight;
    case "left":
      return -screenWidth;
    case "right":
      return screenWidth;
    default:
      return 0;
  }
}

function getTranslateTransform(position: Position, translateAnim: Animated.Value) {
  if (position === "top" || position === "bottom") {
    return { translateY: translateAnim };
  }
  if (position === "left" || position === "right") {
    return { translateX: translateAnim };
  }
  return { translateY: 0 };
}

function getContainerPositionStyle(position: Position): ViewStyle {
  switch (position) {
    case "top":
      return { justifyContent: "flex-start", alignItems: "stretch" } as ViewStyle;
    case "bottom":
      return { justifyContent: "flex-end", alignItems: "stretch" } as ViewStyle;
    case "left":
      return { justifyContent: "center", alignItems: "flex-start" } as ViewStyle;
    case "right":
      return { justifyContent: "center", alignItems: "flex-end" } as ViewStyle;
    default:
      return { justifyContent: "center", alignItems: "center" } as ViewStyle;
  }
}

function getContentBaseStyle(position: Position): ViewStyle {
  if (position === "left" || position === "right") {
    return { width: screenWidth * 0.8, maxWidth: screenWidth * 0.9, maxHeight: screenHeight * 0.9 };
  }
  if (position === "top" || position === "bottom") {
    return { width: screenWidth, maxHeight: screenHeight * 0.8 };
  }
  return { maxWidth: screenWidth * 0.9, minWidth: screenWidth * 0.7 };
}

function getRoundStyle(position: Position, round: boolean) {
  if (!round) return null;
  if (position === "top") {
    return { borderBottomLeftRadius: Theme.radius.lg, borderBottomRightRadius: Theme.radius.lg };
  }
  if (position === "bottom") {
    return { borderTopLeftRadius: Theme.radius.lg, borderTopRightRadius: Theme.radius.lg };
  }
  if (position === "left") {
    return { borderTopRightRadius: Theme.radius.lg, borderBottomRightRadius: Theme.radius.lg };
  }
  if (position === "right") {
    return { borderTopLeftRadius: Theme.radius.lg, borderBottomLeftRadius: Theme.radius.lg };
  }
  return { borderRadius: Theme.radius.lg };
}

function getCloseIconPositionStyle(pos: CloseIconPosition) {
  switch (pos) {
    case "top-left":
      return { top: 10, left: 10 };
    case "bottom-left":
      return { bottom: 10, left: 10 };
    case "bottom-right":
      return { bottom: 10, right: 10 };
    default:
      return { top: 10, right: 10 };
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "transparent"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000"
  },
  overlayPressArea: {
    flex: 1
  },
  content: {
    backgroundColor: Colors.white,
    overflow: "hidden",
    minHeight: 40
  },
  closeIconWrap: {
    position: "absolute",
    padding: 8
  },
  closeIcon: {
    fontSize: Theme.fontSize.xl,
    color: Colors.text.light
  },
  safeAreaBottom: {
    paddingBottom: Theme.spacing.md
  }
});
