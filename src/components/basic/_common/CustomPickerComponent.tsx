import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

type PickerFieldNames = { text: string; value: string; children: string };
type PickerValue = string | number;

export type PickerOption = {
  text: string | number;
  value: PickerValue;
  disabled?: boolean;
  children?: PickerOption[];
};

export type PickerColumns = PickerOption[] | PickerOption[][];

export type PickerChangePayload = {
  selectedValues: PickerValue[];
  selectedOptions: (PickerOption | undefined)[];
  selectedIndexes: number[];
  columnIndex?: number;
};

export type PickerProps = {
  columns: PickerColumns;
  value?: PickerValue[];
  onChange?: (payload: PickerChangePayload) => void;
  onConfirm?: (payload: PickerChangePayload) => void;
  onCancel?: (payload: PickerChangePayload) => void;
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  toolbarPosition?: "top" | "bottom";
  loading?: boolean;
  readonly?: boolean;
  showToolbar?: boolean;
  optionHeight?: number;
  visibleOptionNum?: number;
  fieldNames?: Partial<PickerFieldNames>;
  style?: ViewStyle;
  columnsTop?: React.ReactNode;
  columnsBottom?: React.ReactNode;
  empty?: React.ReactNode;
};

const defaultFieldNames: PickerFieldNames = { text: "text", value: "value", children: "children" };

function isMultiColumns(cols: PickerColumns): cols is PickerOption[][] {
  return Array.isArray(cols[0]);
}

export default function CustomPickerComponent({
  columns,
  value,
  onChange,
  onConfirm,
  onCancel,
  title,
  confirmButtonText = "确认",
  cancelButtonText = "取消",
  toolbarPosition = "top",
  loading = false,
  readonly = false,
  showToolbar = true,
  optionHeight = 44,
  visibleOptionNum = 6,
  fieldNames: fieldNamesProp,
  style,
  columnsTop,
  columnsBottom,
  empty
}: PickerProps) {
  const fieldNames = useMemo(() => ({ ...defaultFieldNames, ...fieldNamesProp }), [fieldNamesProp]);

  const normalizeOption = useCallback(
    (opt: any): PickerOption => ({
      text: opt[fieldNames.text],
      value: opt[fieldNames.value],
      disabled: opt.disabled,
      children: opt[fieldNames.children]
    }),
    [fieldNames.children, fieldNames.text, fieldNames.value]
  );

  const resolveColumns = useCallback((): PickerOption[][] => {
    if (isMultiColumns(columns)) {
      return (columns as PickerOption[][]).map(col => col.map(normalizeOption));
    }
    // Cascaded columns
    const result: PickerOption[][] = [];
    let currentLevel: PickerOption[] | undefined = (columns as PickerOption[]).map(normalizeOption);
    let depth = 0;
    const selectedVals = value ?? [];
    while (currentLevel && currentLevel.length) {
      result.push(currentLevel);
      const selectedVal = selectedVals[depth];
      const selectedOpt = currentLevel.find(opt => opt.value === selectedVal) || currentLevel[0];
      const children = selectedOpt?.children as PickerOption[] | undefined;
      currentLevel = children?.map(normalizeOption);
      depth += 1;
    }
    return result.length ? result : [[]];
  }, [columns, normalizeOption, value]);

  const [columnOptions, setColumnOptions] = useState<PickerOption[][]>(resolveColumns);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const listRefs = useRef<FlatList<any>[]>([]);

  const scrollToIndex = useCallback(
    (colIdx: number, idx: number, animated: boolean) => {
      const offset = idx * optionHeight;
      const perform = () => listRefs.current[colIdx]?.scrollToOffset({ offset, animated });
      perform();
      if (!listRefs.current[colIdx]) {
        setTimeout(perform, 0);
      }
    },
    [optionHeight]
  );

  // Initialize selected indexes based on value/columns
  useEffect(() => {
    setColumnOptions(resolveColumns());
  }, [resolveColumns]);

  // Controlled value sync
  useEffect(() => {
    if (value === undefined) return;
    const indexes = columnOptions.map((opts, colIdx) => {
      const targetVal = value?.[colIdx];
      if (targetVal !== undefined) {
        const idx = opts.findIndex(opt => opt.value === targetVal);
        return idx >= 0 ? idx : 0;
      }
      return 0;
    });
    setSelectedIndexes(indexes);
    indexes.forEach((idx, colIdx) => {
      scrollToIndex(colIdx, idx, false);
    });
  }, [columnOptions, scrollToIndex, value]);

  // Uncontrolled: initialize indexes when columns change length
  useEffect(() => {
    if (value !== undefined) return;
    if (!columnOptions.length) return;
    if (selectedIndexes.length === columnOptions.length) return;
    const indexes = columnOptions.map((_, idx) => selectedIndexes[idx] ?? 0);
    setSelectedIndexes(indexes);
    indexes.forEach((idx, colIdx) => {
      scrollToIndex(colIdx, idx, false);
    });
  }, [columnOptions, scrollToIndex, selectedIndexes, value]);

  const emitChange = useCallback(
    (nextIndexes: number[], columnIndex?: number) => {
      const selectedOptions = nextIndexes.map((idx, colIdx) => columnOptions[colIdx]?.[idx]);
      const selectedValues = selectedOptions.map(opt => opt?.value) as PickerValue[];
      onChange?.({
        selectedValues,
        selectedOptions,
        selectedIndexes: nextIndexes,
        columnIndex
      });
    },
    [columnOptions, onChange]
  );

  const updateCascade = useCallback(
    (colIdx: number, nextIdx: number) => {
      if (isMultiColumns(columns)) return { options: columnOptions, indexes: selectedIndexes };
      const newIndexes = [...selectedIndexes];
      newIndexes[colIdx] = nextIdx;

      // rebuild subsequent columns based on selection path
      const baseColumns: PickerOption[][] = [];
      let currentLevel: PickerOption[] | undefined = (columns as PickerOption[]).map(normalizeOption);
      let depth = 0;
      while (currentLevel && currentLevel.length) {
        baseColumns.push(currentLevel);
        const pickIdx = newIndexes[depth] ?? 0;
        const picked = currentLevel[pickIdx] ?? currentLevel[0];
        const children = picked?.children as PickerOption[] | undefined;
        currentLevel = children?.map(normalizeOption);
        depth += 1;
      }
      const adjustedIndexes = baseColumns.map((opts, idx) => {
        const wanted = newIndexes[idx];
        if (wanted === undefined) return 0;
        return Math.min(Math.max(wanted, 0), Math.max(opts.length - 1, 0));
      });
      return { options: baseColumns, indexes: adjustedIndexes };
    },
    [columns, columnOptions, normalizeOption, selectedIndexes]
  );

  const handleScrollEnd = useCallback(
    (colIdx: number, e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (readonly) return;
      const offset = e.nativeEvent.contentOffset.y;
      const idx = Math.round(offset / optionHeight);

      if (isMultiColumns(columns)) {
        // Multi-column picker (non-cascading)
        const newIndexes = [...selectedIndexes];
        newIndexes[colIdx] = Math.min(Math.max(idx, 0), columnOptions[colIdx]?.length - 1 || 0);
        setSelectedIndexes(newIndexes);
        emitChange(newIndexes, colIdx);
      } else {
        // Cascading picker
        const { options: newCols, indexes: newIndexes } = updateCascade(colIdx, idx);
        setColumnOptions(newCols);
        setSelectedIndexes(newIndexes);
        // sync scroll positions for regenerated cols
        newIndexes.forEach((i, c) => {
          scrollToIndex(c, i, false);
        });
        emitChange(newIndexes, colIdx);
      }
    },
    [emitChange, optionHeight, readonly, scrollToIndex, updateCascade, columns, columnOptions, selectedIndexes]
  );

  const handleConfirm = useCallback(() => {
    const payload: PickerChangePayload = {
      selectedIndexes,
      selectedOptions: selectedIndexes.map((idx, col) => columnOptions[col]?.[idx]),
      selectedValues: selectedIndexes.map((idx, col) => columnOptions[col]?.[idx]?.value as PickerValue)
    };
    onConfirm?.(payload);
  }, [columnOptions, onConfirm, selectedIndexes]);

  const handleCancel = useCallback(() => {
    const payload: PickerChangePayload = {
      selectedIndexes,
      selectedOptions: selectedIndexes.map((idx, col) => columnOptions[col]?.[idx]),
      selectedValues: selectedIndexes.map((idx, col) => columnOptions[col]?.[idx]?.value as PickerValue)
    };
    onCancel?.(payload);
  }, [columnOptions, onCancel, selectedIndexes]);

  const renderToolbar = () => {
    if (!showToolbar) return null;
    return (
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={handleCancel} disabled={readonly} hitSlop={8}>
          <Text style={[styles.toolbarBtn, readonly && styles.disabledText]}>
            {cancelButtonText}
          </Text>
        </TouchableOpacity>
        {title ? <Text style={styles.toolbarTitle}>{title}</Text> : <View style={{ flex: 1 }} />}
        <TouchableOpacity onPress={handleConfirm} disabled={readonly} hitSlop={8}>
          <Text style={[styles.toolbarBtn, readonly && styles.disabledText]}>
            {confirmButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const contentHeight = optionHeight * visibleOptionNum;
  const pad = (contentHeight - optionHeight) / 2;

  return (
    <View style={[styles.container, style]}>
      {toolbarPosition === "top" ? renderToolbar() : null}
      {columnsTop}
      <View style={[styles.pickerBody, { height: contentHeight }]}>
        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : columnOptions.every(col => col.length === 0) ? (
          empty ?? <Text style={styles.emptyText}>暂无数据</Text>
        ) : (
          <>
            <View style={[styles.highlight, { top: pad, height: optionHeight }]} pointerEvents="none" />
            <View style={styles.columns}>
              {columnOptions.map((opts, colIdx) => (
                <View style={styles.column} key={`col-${colIdx}`}>
                  <FlatList
                    ref={ref => {
                      if (ref) listRefs.current[colIdx] = ref;
                    }}
                    data={opts}
                    keyExtractor={(item, idx) => `${item.value}-${idx}`}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={optionHeight}
                    decelerationRate="fast"
                    getItemLayout={(_, index) => ({
                      length: optionHeight,
                      offset: optionHeight * index,
                      index
                    })}
                    contentContainerStyle={{
                      paddingTop: pad,
                      paddingBottom: pad
                    }}
                    onScrollEndDrag={e => handleScrollEnd(colIdx, e)}
                    onMomentumScrollEnd={e => handleScrollEnd(colIdx, e)}
                    renderItem={({ item, index }) => {
                      const selected = selectedIndexes[colIdx] === index;
                      const disabled = item.disabled || readonly;
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            scrollToIndex(colIdx, index, true);
                            handleScrollEnd(colIdx, {
                              nativeEvent: { contentOffset: { y: index * optionHeight } } as any
                            } as NativeSyntheticEvent<NativeScrollEvent>);
                          }}
                          disabled={disabled}
                        >
                          <View style={[styles.option, { height: optionHeight }]}>
                            <Text
                              style={[
                                styles.optionText,
                                selected && styles.optionTextActive,
                                disabled && styles.optionTextDisabled
                              ]}
                              numberOfLines={1}
                            >
                              {item.text}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ))}
            </View>
          </>
        )}
      </View>
      {columnsBottom}
      {toolbarPosition === "bottom" ? renderToolbar() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border
  },
  toolbarBtn: {
    color: Colors.primary,
    fontSize: Theme.fontSize.md
  },
  toolbarTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: Theme.fontSize.lg,
    color: Colors.text.primary,
    fontWeight: "600"
  },
  disabledText: {
    color: Colors.text.light
  },
  pickerBody: {
    position: "relative"
  },
  highlight: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    backgroundColor: "rgba(0,0,0,0.03)"
  },
  columns: {
    flexDirection: "row"
  },
  column: {
    flex: 1
  },
  option: {
    justifyContent: "center",
    alignItems: "center"
  },
  optionText: {
    fontSize: Theme.fontSize.lg,
    color: Colors.text.secondary
  },
  optionTextActive: {
    color: Colors.text.primary,
    fontWeight: "600"
  },
  optionTextDisabled: {
    color: Colors.text.light
  },
  loadingWrap: {
    height: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: Theme.spacing.lg,
    color: Colors.text.secondary
  }
});
