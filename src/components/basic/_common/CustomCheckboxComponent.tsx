// src/components/basic/_common/CustomCheckboxComponent.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle, DimensionValue } from "react-native";
import { Colors } from "../../../constants/colors";

type Option = { value: string; name: string };

type Props = {
  label?: string;
  labelWidth?: DimensionValue;
  labelAlign?: "left" | "center" | "right";
  inputAlign?: "left" | "center" | "right";
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rules?: any[];
  direction?: "horizontal" | "vertical";
  value?: string; // comma separated
  onChange?: (val: string) => void;
  setting?: {
    optionItem?: Option[];
  };
  boxStyle?: StyleProp<ViewStyle>;
};

export default function CustomCheckboxComponent({
  label,
  labelWidth,
  labelAlign = "left",
  inputAlign = "left",
  disabled = false,
  readonly = false,
  required = false,
  direction = "horizontal",
  value = "",
  onChange,
  setting = {},
  boxStyle
}: Props) {
  const optionItem = useMemo(() => setting.optionItem || [], [setting.optionItem]);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  useEffect(() => {
    const next = value ? value.split(",").filter(Boolean) : [];
    setCheckedList(next);
  }, [value]);

  const toggle = useCallback(
    (val: string) => {
      if (disabled || readonly) return;
      setCheckedList(prev => {
        const exists = prev.includes(val);
        const next = exists ? prev.filter(v => v !== val) : [...prev, val];
        onChange?.(next.join(","));
        return next;
      });
    },
    [disabled, readonly, onChange]
  );

  return (
    <View style={[styles.container, boxStyle]}>
      {label ? (
        <View style={[styles.labelWrap, labelWidth ? { width: labelWidth } : null]}>
          <Text style={[styles.labelText, { textAlign: labelAlign }]}>
            {required ? "*" : ""}
            {label}
          </Text>
        </View>
      ) : null}

      <View
        style={[
          styles.group,
          direction === "vertical" ? styles.groupVertical : styles.groupHorizontal
        ]}
      >
        {optionItem.map(item => {
          const isChecked = checkedList.includes(item.value);
          const isDisabled = disabled || readonly;
          return (
            <Pressable
              key={item.value}
              onPress={() => toggle(item.value)}
              disabled={isDisabled}
              style={({ pressed }) => [
                styles.option,
                direction === "vertical" ? styles.optionVertical : null,
                pressed && !isDisabled ? styles.optionPressed : null
              ]}
            >
              <View
                style={[
                  styles.checkbox,
                  isChecked ? styles.checkboxChecked : null,
                  isDisabled ? styles.checkboxDisabled : null
                ]}
              >
                {isChecked ? <Text style={styles.checkMark}>{"\u2713"}</Text> : null}
              </View>
              <Text
                style={[
                  styles.optionText,
                  { textAlign: inputAlign },
                  isDisabled ? styles.optionTextDisabled : null
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 8
  },
  labelWrap: {
    marginRight: 8,
    paddingTop: 4,
    flexShrink: 1
  },
  labelText: {
    color: Colors.text.secondary,
    fontSize: 13,
    flexShrink: 1,
    flexWrap: "wrap"
  },
  group: {
    flex: 1,
    flexWrap: "wrap"
  },
  groupHorizontal: {
    flexDirection: "row"
  },
  groupVertical: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    gap: 8
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 8
  },
  optionVertical: {
    marginRight: 0,
    flex: 1,
    alignSelf: "stretch",
    marginBottom: 0
  },
  optionPressed: {
    opacity: 0.85
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary
  },
  checkboxDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: Colors.border
  },
  checkMark: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600"
  },
  optionText: {
    fontSize: 13,
    lineHeight: 13,
    color: Colors.text.primary
  },
  optionTextDisabled: {
    color: Colors.text.light
  }
});
