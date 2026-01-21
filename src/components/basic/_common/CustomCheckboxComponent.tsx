// src/components/basic/_common/CustomCheckboxComponent.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle, DimensionValue } from "react-native";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

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
            {required ? <Text style={styles.requiredStar}>*</Text> : null}
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
    paddingVertical: Theme.spacing.sm
  },
  labelWrap: {
    marginRight: Theme.spacing.sm,
    paddingTop: Theme.spacing.xs,
    flexShrink: 1
  },
  labelText: {
    color: Colors.text.secondary,
    fontSize: Theme.fontSize.sm,
    flexShrink: 1,
    flexWrap: "wrap"
  },
  requiredStar: {
    color: Colors.required
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
    gap: Theme.spacing.sm
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Theme.spacing.md,
    marginBottom: Theme.spacing.sm
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
    borderRadius: Theme.radius.sm,
    borderWidth: Theme.border.width,
    borderColor: Colors.border,
    marginRight: Theme.spacing.sm,
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
    fontSize: Theme.fontSize.xs,
    fontWeight: "600"
  },
  optionText: {
    fontSize: Theme.fontSize.sm,
    lineHeight: Theme.lineHeight.sm,
    color: Colors.text.primary
  },
  optionTextDisabled: {
    color: Colors.text.light
  }
});
