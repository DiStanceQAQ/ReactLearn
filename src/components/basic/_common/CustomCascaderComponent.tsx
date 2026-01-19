// src/components/basic/_common/CustomCascaderComponent.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text as RNText, StyleProp, ViewStyle } from "react-native";
import { Divider } from "react-native-paper";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal
} from "@gorhom/bottom-sheet";
import { cloneObject, treeFindPath } from "../../../utils/functionUtil";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

type FieldNames = { text: string; value: string; children: string };
type Option = { [key: string]: any; children?: Option[] };

type Props = {
  label?: string;
  labelAlign?: "left" | "center" | "right";
  inputAlign?: "left" | "center" | "right";
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  rules?: any[];
  value?: string;
  onChange?: (val: string, displayText?: string) => void;
  title?: string;
  activeColor?: string;
  boxStyle?: StyleProp<ViewStyle>;
  setting?: {
    optionItem?: Option[];
    fieldNames?: Partial<FieldNames>;
  };
};

const defaultFieldNames: FieldNames = { text: "name", value: "value", children: "children" };

function transformTreeData(data: Option[], fieldNames: FieldNames): Option[] {
  if (!Array.isArray(data)) return [];
  return data.map(item => {
    const newItem = { ...item };
    const children = newItem[fieldNames.children];
    if (Array.isArray(children) && children.length === 0) {
      delete newItem[fieldNames.children];
    } else if (Array.isArray(children)) {
      newItem[fieldNames.children] = transformTreeData(children, fieldNames);
    }
    return newItem;
  });
}

export default function CustomCascaderComponent({
  label,
  labelAlign,
  inputAlign = "left",
  disabled = false,
  readonly = false,
  required = false,
  placeholder = "请选择",
  title = "请选择",
  activeColor,
  value,
  onChange,
  boxStyle,
  setting = {}
}: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const fieldNames = useMemo(() => ({ ...defaultFieldNames, ...setting.fieldNames }), [setting.fieldNames]);
  const optionItem = useMemo(() => setting.optionItem || [], [setting.optionItem]);
  const cascaderOptionItem = useMemo(() => transformTreeData(cloneObject(optionItem), fieldNames), [optionItem, fieldNames]);

  const [fieldValue, setFieldValue] = useState("");
  const [selectedPath, setSelectedPath] = useState<Option[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);

  const snapPoints = useMemo(() => ["50%", "80%"], []);

  const pathFromValue = useMemo(() => {
    if (!value) return [] as Option[];
    const path = treeFindPath(cascaderOptionItem, (data: Option) => data[fieldNames.value] === value) as Option[];
    return Array.isArray(path) ? path : [];
  }, [value, cascaderOptionItem, fieldNames]);

  useEffect(() => {
    if (pathFromValue.length) {
      setSelectedPath(pathFromValue);
      setCurrentLevel(Math.max(pathFromValue.length - 1, 0));
      setFieldValue(pathFromValue.map(option => option[fieldNames.text]).join("/"));
    } else {
      setSelectedPath([]);
      setCurrentLevel(0);
      setFieldValue("");
    }
  }, [pathFromValue, fieldNames]);

  const resetSelectionFromValue = useCallback(() => {
    if (pathFromValue.length) {
      setSelectedPath(pathFromValue);
      setCurrentLevel(Math.max(pathFromValue.length - 1, 0));
    } else {
      setSelectedPath([]);
      setCurrentLevel(0);
    }
  }, [pathFromValue]);

  const getOptionsByLevel = useCallback(
    (level: number) => {
      if (level === 0) return cascaderOptionItem;
      let data = cascaderOptionItem;
      for (let i = 0; i < level; i++) {
        if (selectedPath[i] && selectedPath[i][fieldNames.children]) {
          data = selectedPath[i][fieldNames.children] as Option[];
        } else {
          return [] as Option[];
        }
      }
      return data;
    },
    [cascaderOptionItem, fieldNames.children, selectedPath]
  );

  const openSheet = useCallback(() => {
    if (disabled || readonly) return;
    resetSelectionFromValue();
    bottomSheetRef.current?.present();
  }, [disabled, readonly, resetSelectionFromValue]);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const handleFinish = useCallback(
    (path = selectedPath) => {
      if (!path.length) return;
      const last = path[path.length - 1];
      if (!last) return;
      const displayText = path.map(option => option[fieldNames.text]).join("/");
      setFieldValue(displayText);
      onChange?.(last[fieldNames.value], displayText);
      closeSheet();
    },
    [closeSheet, fieldNames.text, fieldNames.value, onChange, selectedPath]
  );

  const handleOptionPress = useCallback(
    (option: Option, level: number) => {
      const newPath = [...selectedPath];
      newPath[level] = option;
      const trimmedPath = newPath.slice(0, level + 1);
      setSelectedPath(trimmedPath);

      if (option[fieldNames.children]?.length > 0) {
        setCurrentLevel(level + 1);
      } else {
        handleFinish(trimmedPath);
      }
    },
    [selectedPath, fieldNames.children, handleFinish]
  );

  const handleTabPress = useCallback(
    (level: number) => {
      setSelectedPath(prev => prev.slice(0, level));
      setCurrentLevel(level);
    },
    []
  );

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} {...props} />,
    []
  );

  const currentOptions = useMemo(() => getOptionsByLevel(currentLevel), [getOptionsByLevel, currentLevel]);
  const isLeafSelected = useMemo(() => {
    if (!selectedPath.length) return false;
    const last = selectedPath[selectedPath.length - 1];
    return !last[fieldNames.children]?.length;
  }, [selectedPath, fieldNames.children]);

  const tabs = useMemo(() => {
    const names = selectedPath.map(option => option[fieldNames.text]);
    if (!selectedPath.length || selectedPath[selectedPath.length - 1][fieldNames.children]?.length) {
      names.push("请选择");
    }
    return names;
  }, [selectedPath, fieldNames.text, fieldNames.children]);

  const renderOption = useCallback(
    ({ item }: { item: Option }) => {
      const hasChildren = Boolean(item[fieldNames.children]?.length);
      const isSelected = selectedPath[currentLevel]?.[fieldNames.value] === item[fieldNames.value];
      const color = activeColor || Colors.primary;
      return (
        <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress(item, currentLevel)}>
          <RNText style={[styles.optionText, isSelected && { color, fontWeight: "600" }]}>
            {item[fieldNames.text]}
          </RNText>
          {hasChildren && (
            <RNText style={[styles.arrowText, isSelected && { color }]}>
              {">"}
            </RNText>
          )}
        </TouchableOpacity>
      );
    },
    [activeColor, currentLevel, fieldNames.children, fieldNames.text, fieldNames.value, handleOptionPress, selectedPath]
  );

  const showPlaceholder = !fieldValue;

  return (
    <View style={styles.container}>
      {label ? (
        <RNText style={[styles.inputLabel, labelAlign ? { textAlign: labelAlign } : null]}>
          {required ? <RNText style={styles.requiredStar}>*</RNText> : null}
          {label}
        </RNText>
      ) : null}

      <TouchableOpacity
        style={[
          styles.inputBox,
          disabled || readonly ? styles.inputBoxDisabled : null,
          boxStyle
        ]}
        activeOpacity={0.8}
        onPress={openSheet}
        disabled={disabled || readonly}
      >
        <RNText
          style={[
            styles.inputText,
            showPlaceholder ? styles.placeholderText : null,
            { textAlign: inputAlign as any }
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {showPlaceholder ? placeholder : fieldValue}
        </RNText>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onDismiss={resetSelectionFromValue}
        enablePanDownToClose
      >
        <View style={styles.sheetHeader}>
          <TouchableOpacity onPress={closeSheet} hitSlop={8}>
            <RNText style={styles.sheetAction}>取消</RNText>
          </TouchableOpacity>
          <RNText style={styles.sheetTitle}>{title}</RNText>
          <TouchableOpacity onPress={() => handleFinish()} disabled={!isLeafSelected} hitSlop={8}>
            <RNText style={[styles.sheetAction, !isLeafSelected && styles.disabledText]}>确定</RNText>
          </TouchableOpacity>
        </View>
        <Divider />

        <View style={styles.tabs}>
          {tabs.map((name, index) => {
            const isActive = index === currentLevel;
            const color = isActive ? activeColor || Colors.primary : Colors.text.secondary;
            return (
              <TouchableOpacity
                key={`${name}-${index}`}
                style={[styles.tabItem, isActive && styles.tabItemActive]}
                onPress={() => handleTabPress(index)}
              >
                <RNText style={[styles.tabText, { color }]} numberOfLines={1}>
                  {name}
                </RNText>
              </TouchableOpacity>
            );
          })}
        </View>
        <Divider />

        <BottomSheetFlatList
          data={currentOptions}
          keyExtractor={(item: Option, index: number) => `${item[fieldNames.value]}-${index}`}
          renderItem={renderOption}
          nestedScrollEnabled
        />
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: Theme.spacing.sm },
  inputLabel: {
    marginBottom: Theme.spacing.xs,
    color: Colors.text.secondary,
    fontSize: Theme.fontSize.sm
  },
  requiredStar: {
    color: Colors.required
  },
  inputBox: {
    minHeight: Theme.controlHeight.md,
    borderWidth: Theme.border.width,
    borderColor: Theme.border.color,
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white
  },
  inputBoxDisabled: {
    backgroundColor: "#f5f5f5"
  },
  inputText: {
    flex: 1,
    fontSize: Theme.fontSize.lg,
    color: Colors.text.primary
  },
  placeholderText: {
    color: Colors.text.light
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md
  },
  sheetTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: "600",
    color: Colors.text.primary
  },
  sheetAction: {
    fontSize: Theme.fontSize.md,
    color: Colors.primary
  },
  disabledText: {
    color: Colors.text.light
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    flexWrap: "wrap"
  },
  tabItem: {
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm + 2,
    borderRadius: Theme.radius.lg,
    backgroundColor: Colors.background,
    marginRight: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm
  },
  tabItemActive: {
    backgroundColor: "#E8F2FF"
  },
  tabText: {
    fontSize: Theme.fontSize.sm,
    color: Colors.text.secondary
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border
  },
  optionText: {
    fontSize: Theme.fontSize.lg,
    color: Colors.text.primary
  },
  arrowText: {
    fontSize: Theme.fontSize.lg,
    color: Colors.text.light
  }
});
