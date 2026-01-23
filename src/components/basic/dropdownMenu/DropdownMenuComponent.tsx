import React, {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useRef,
  useState
} from "react";
import {
  Dimensions,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

export type DropdownValue = string | number | boolean;

export type DropdownMenuProps = {
  activeColor?: string;
  textColor?: string;
  inactiveColor?: string;
  overlay?: boolean;
  duration?: number;
  direction?: "down" | "up";
  zIndex?: number;
  closeOnPressOverlay?: boolean;
  closeOnPressOutside?: boolean;
  swipeThreshold?: number;
  onChange?: (index: number, value: DropdownValue) => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type BarPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type DropdownMenuContextValue = {
  activeIndex: number | null;
  toggleItem: (index: number) => void;
  closeMenu: () => void;
  activeColor?: string;
  overlay: boolean;
  duration: number;
  direction: "down" | "up";
  zIndex?: number;
  barPosition: BarPosition | null;
  measureBar: () => void;
  closeOnPressOverlay: boolean;
  closeOnPressOutside: boolean;
  textColor?: string;
  inactiveColor?: string;
  scrollable: boolean;
  minItemWidth: number;
  opened: boolean;
  instantCloseIndex: number | null;
  onItemChange?: (index: number, value: DropdownValue) => void;
};

export const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

export function useDropdownMenuContext() {
  return useContext(DropdownMenuContext);
}

function DropdownMenuComponent({
  activeColor = Colors.primary,
  textColor = Colors.text.primary,
  inactiveColor = Colors.text.secondary,
  overlay = true,
  duration = 200,
  direction = "down",
  zIndex,
  closeOnPressOverlay = true,
  closeOnPressOutside = true,
  swipeThreshold = 4,
  onChange,
  children,
  style
}: DropdownMenuProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const [instantCloseIndex, setInstantCloseIndex] = useState<number | null>(null);
  const barRef = useRef<View | null>(null);
  const [barPosition, setBarPosition] = useState<BarPosition | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const measureBar = useCallback(() => {
    const node = barRef.current;
    if (!node) return;
    node.measureInWindow((x, y, width, height) => {
      setBarPosition({ x, y, width, height });
    });
  }, []);

  const closeMenu = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const toggleItem = useCallback(
    (index: number) => {
      const prev = activeIndexRef.current;
      if (prev !== null && prev !== index) {
        setInstantCloseIndex(prev);
      }
      setActiveIndex(prev => (prev === index ? null : index));
      measureBar();
    },
    [measureBar]
  );

  useEffect(() => {
    if (instantCloseIndex === null) return;
    const timer = setTimeout(() => setInstantCloseIndex(null), 0);
    return () => clearTimeout(timer);
  }, [instantCloseIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    measureBar();
    const subscription = Dimensions.addEventListener("change", measureBar);
    return () => {
      subscription?.remove?.();
    };
  }, [activeIndex, measureBar]);

  const ctxValue = useMemo<DropdownMenuContextValue>(
    () => ({
      activeIndex,
      toggleItem,
      closeMenu,
      activeColor,
      textColor,
      inactiveColor,
      overlay,
      duration,
      direction,
      zIndex,
      barPosition,
      measureBar,
      closeOnPressOverlay,
      closeOnPressOutside,
      scrollable: false,
      minItemWidth: 120,
      opened: activeIndex !== null,
      instantCloseIndex,
      onItemChange: onChange
    }),
    [
      activeColor,
      activeIndex,
      instantCloseIndex,
      closeMenu,
      closeOnPressOverlay,
      closeOnPressOutside,
      direction,
      duration,
      measureBar,
      inactiveColor,
      onChange,
      overlay,
      textColor,
      zIndex,
      barPosition
    ]
  );

  const childArray = useMemo(() => {
    const arr = Children.toArray(children);
    return arr.filter(isValidElement) as ReactElement[];
  }, [children]);

  const scrollable = childArray.length > swipeThreshold;
  const finalCtxValue = useMemo(
    () => ({ ...ctxValue, scrollable, minItemWidth: scrollable ? 120 : 0 }),
    [ctxValue, scrollable]
  );

  const barZStyle =
    finalCtxValue.opened && zIndex
      ? { zIndex: zIndex + 1, elevation: zIndex + 1 }
      : zIndex
        ? { zIndex }
        : null;

  return (
    <DropdownMenuContext.Provider value={finalCtxValue}>
      <View
        ref={barRef}
        onLayout={measureBar}
        style={[styles.container, style, zIndex ? { zIndex } : null]}
      >
        {scrollable ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.barScrollable, barZStyle] as StyleProp<ViewStyle>}
            contentContainerStyle={styles.barScrollableContent}
          >
            {childArray.map((child, index) =>
              cloneElement(child, {
                index,
                key: child.key ?? index
              } as any)
            )}
          </ScrollView>
        ) : (
          <View style={[styles.bar, barZStyle]}>
            {childArray.map((child, index) =>
              cloneElement(child, {
                index,
                key: child.key ?? index
              } as any)
            )}
          </View>
        )}
      </View>
    </DropdownMenuContext.Provider>
  );
}

export default DropdownMenuComponent;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: Colors.white
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: Theme.border.width,
    borderBottomColor: Theme.border.color,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Colors.white
  },
  barScrollable: {
    backgroundColor: Colors.white
  },
  barScrollableContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: Theme.border.width,
    borderBottomColor: Theme.border.color
  }
});
