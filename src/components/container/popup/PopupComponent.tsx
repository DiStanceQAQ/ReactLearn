// src/components/container/popup/PopupComponent.tsx
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { OverlayRenderProps, useOverlayHost } from "../../overlay/OverlayHost";

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
  useOverlayPortal?: boolean;
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
  zIndex = Theme.zIndex.popup,
  useOverlayPortal = true
}: Props) {
  const [mounted, setMounted] = useState(visible);
  const translateAnim = useRef(new Animated.Value(visible ? 0 : getHiddenOffset(position))).current;
  const scaleAnim = useRef(new Animated.Value(visible ? 1 : 0.9)).current;
  const contentOpacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const overlayAnim = useRef(new Animated.Value(visible && overlay ? 1 : 0)).current;
  const overlayHost = useOverlayHost();
  const openOverlay = overlayHost?.open;
  const closeOverlay = overlayHost?.close;
  const overlayKeyRef = useRef<string | null>(null);
  const portalCloseNotifiedRef = useRef(false);
  const usingPortal = Boolean(useOverlayPortal && openOverlay && closeOverlay);

  const hiddenOffset = useMemo(() => getHiddenOffset(position), [position]);

  useEffect(() => {
    if (visible) {
      portalCloseNotifiedRef.current = false;
    }
  }, [visible]);

  useEffect(() => {
    if (usingPortal) return;
    if (visible) {
      setMounted(true);
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
          duration: 150,
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
          duration: 150,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true
        })
      ]).start(() => {
        setMounted(false);
      });
    }
  }, [visible, hiddenOffset, overlay, position, translateAnim, scaleAnim, overlayAnim, contentOpacity, usingPortal]);

  const containerPositionStyle = useMemo(() => getContainerPositionStyle(position), [position]);
  const contentRoundStyle = useMemo(() => getRoundStyle(position, round), [position, round]);
  const contentBaseStyle = useMemo(() => getContentBaseStyle(position), [position]);
  const closeIconStyle = useMemo(() => getCloseIconPositionStyle(closeIconPosition), [closeIconPosition]);

  const handleOverlayPress = useCallback(() => {
    if (!closeOnClickOverlay) return;
    onClose?.();
  }, [closeOnClickOverlay, onClose]);

  const closeIconNode = useMemo(() => {
    if (!closeable) return null;
    return (
      <Pressable onPress={onClose} hitSlop={10} style={[styles.closeIconWrap, closeIconStyle]}>
        {closeIcon ? <View>{closeIcon}</View> : <Text style={styles.closeIcon}>{"\u00d7"}</Text>}
      </Pressable>
    );
  }, [closeIcon, closeIconStyle, closeable, onClose]);

  const animatedContentStyle = useMemo(
    () =>
      position === "center"
        ? { opacity: contentOpacity, transform: [{ scale: scaleAnim }] }
        : { opacity: contentOpacity, transform: [getTranslateTransform(position, translateAnim)] },
    [contentOpacity, position, scaleAnim, translateAnim]
  );

  const animatedOverlayStyle = useMemo(
    () => ({
      opacity: overlayAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, overlayOpacity]
      })
    }),
    [overlayAnim, overlayOpacity]
  );

  const notifyOnClose = useCallback(() => {
    if (portalCloseNotifiedRef.current) return;
    portalCloseNotifiedRef.current = true;
    onClose?.();
  }, [onClose]);

  const renderPopupContent = useCallback(
    () => (
      <View style={[styles.wrapper, containerPositionStyle, { zIndex }]} pointerEvents="box-none">
        {!usingPortal && overlay ? (
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
          {closeIconNode}
        </Animated.View>
      </View>
    ),
    [
      animatedContentStyle,
      animatedOverlayStyle,
      children,
      closeIconNode,
      containerPositionStyle,
      contentBaseStyle,
      contentRoundStyle,
      contentStyle,
      handleOverlayPress,
      overlay,
      overlayStyle,
      safeAreaInsetBottom,
      usingPortal,
      zIndex
    ]
  );

  const renderPortalContent = useCallback(
    (ctx: OverlayRenderProps) => (
      <PortalPopupContent
        visible={visible}
        closing={ctx.closing}
        position={position}
        closeable={closeable}
        closeIcon={closeIcon}
        safeAreaInsetBottom={safeAreaInsetBottom}
        contentStyle={contentStyle}
        containerPositionStyle={containerPositionStyle}
        contentRoundStyle={contentRoundStyle}
        contentBaseStyle={contentBaseStyle}
        closeIconStyle={closeIconStyle}
        notifyOnClose={notifyOnClose}
        requestClose={ctx.requestClose}
        finishClose={ctx.finishClose}
      >
        {children}
      </PortalPopupContent>
    ),
    [
      children,
      closeIcon,
      closeIconStyle,
      closeable,
      containerPositionStyle,
      contentBaseStyle,
      contentRoundStyle,
      contentStyle,
      notifyOnClose,
      position,
      safeAreaInsetBottom,
      visible
    ]
  );

  useEffect(() => {
    if (!usingPortal || !openOverlay || !closeOverlay) return;

    if (!visible) {
      if (overlayKeyRef.current) {
        closeOverlay(overlayKeyRef.current);
        overlayKeyRef.current = null;
      }
      return;
    }

    // open or update existing portal entry with latest render content/props
    overlayKeyRef.current = openOverlay({
      key: overlayKeyRef.current || undefined,
      render: renderPortalContent,
      overlayOpacity: overlay ? overlayOpacity : 0,
      overlayColor: "#000",
      closeOnOverlayPress: overlay ? closeOnClickOverlay : false,
      onOverlayPress: closeOnClickOverlay ? notifyOnClose : undefined,
      waitForRenderClose: true,
      onClose: () => {
        notifyOnClose();
        overlayKeyRef.current = null;
      },
      zIndex
    });
  }, [
    usingPortal,
    openOverlay,
    closeOverlay,
    visible,
    renderPortalContent,
    overlay,
    overlayOpacity,
    closeOnClickOverlay,
    notifyOnClose,
    zIndex
  ]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (overlayKeyRef.current && closeOverlay) {
        closeOverlay(overlayKeyRef.current);
        overlayKeyRef.current = null;
      }
    };
  }, [closeOverlay]);

  if (usingPortal) {
    return null;
  }

  if (!mounted) {
    return null;
  }

  return (
    <Modal transparent visible={mounted} animationType="none" onRequestClose={onClose} statusBarTranslucent>
      {renderPopupContent()}
    </Modal>
  );
}

type PortalPopupContentProps = {
  visible: boolean;
  closing: boolean;
  position: Position;
  closeable: boolean;
  closeIcon?: ReactNode;
  closeIconStyle: StyleProp<ViewStyle>;
  safeAreaInsetBottom: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  containerPositionStyle: ViewStyle;
  contentRoundStyle: ViewStyle | null;
  contentBaseStyle: ViewStyle;
  children?: ReactNode;
  notifyOnClose?: () => void;
  requestClose: () => void;
  finishClose: () => void;
};

function PortalPopupContent({
  visible,
  closing,
  position,
  closeable,
  closeIcon,
  closeIconStyle,
  safeAreaInsetBottom,
  contentStyle,
  containerPositionStyle,
  contentRoundStyle,
  contentBaseStyle,
  children,
  notifyOnClose,
  requestClose,
  finishClose
}: PortalPopupContentProps) {
  const hiddenOffset = useMemo(() => getHiddenOffset(position), [position]);
  const translateAnim = useRef(new Animated.Value(hiddenOffset)).current;
  const scaleAnim = useRef(new Animated.Value(position === "center" ? 0.9 : 1)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const finishRef = useRef(finishClose);
  const notifyRef = useRef(notifyOnClose);
  const stateRef = useRef<"opening" | "open" | "closing" | "closed">("closed");

  useEffect(() => {
    finishRef.current = finishClose;
  }, [finishClose]);

  useEffect(() => {
    notifyRef.current = notifyOnClose;
  }, [notifyOnClose]);

  const handleClosePress = useCallback(() => {
    notifyRef.current?.();
    requestClose();
  }, [requestClose]);

  useEffect(() => {
    const shouldClose = closing || !visible;

    if (!shouldClose) {
      stateRef.current = "opening";
      translateAnim.setValue(hiddenOffset);
      scaleAnim.setValue(position === "center" ? 0.9 : 1);
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
        })
      ]).start(() => {
        if (stateRef.current === "opening") {
          stateRef.current = "open";
        }
      });
      return;
    }

    if (stateRef.current === "closing") return;
    stateRef.current = "closing";
    if (closing && visible) {
      notifyRef.current?.();
    }
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
      })
    ]).start(() => {
      if (stateRef.current !== "closing") return;
      stateRef.current = "closed";
      finishRef.current?.();
    });
  }, [closing, visible, hiddenOffset, position, contentOpacity, scaleAnim, translateAnim]);

  const animatedContentStyle = useMemo(
    () =>
      position === "center"
        ? { opacity: contentOpacity, transform: [{ scale: scaleAnim }] }
        : { opacity: contentOpacity, transform: [getTranslateTransform(position, translateAnim)] },
    [contentOpacity, position, scaleAnim, translateAnim]
  );

  const portalCloseIconNode = useMemo(() => {
    if (!closeable) return null;
    return (
      <Pressable onPress={handleClosePress} hitSlop={10} style={[styles.closeIconWrap, closeIconStyle]}>
        {closeIcon ? <View>{closeIcon}</View> : <Text style={styles.closeIcon}>{"\u00d7"}</Text>}
      </Pressable>
    );
  }, [closeIcon, closeIconStyle, closeable, handleClosePress]);

  return (
    <View style={[styles.wrapper, containerPositionStyle]} pointerEvents="box-none">
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
        {portalCloseIconNode}
      </Animated.View>
    </View>
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
