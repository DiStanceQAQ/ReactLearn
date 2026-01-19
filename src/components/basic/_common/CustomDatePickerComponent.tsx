// src/components/basic/_common/CustomDatePickerComponent.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  DimensionValue
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

type Props = {
  label?: string;
  labelWidth?: DimensionValue;
  labelAlign?: "left" | "center" | "right";
  inputAlign?: "left" | "center" | "right";
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  rules?: any[];
  value?: string; // YYYY-MM-DD
  onChange?: (val: string) => void;
  minDate?: Date;
  maxDate?: Date;
  boxStyle?: StyleProp<ViewStyle>;
};

function formatDate(date: Date | null) {
  if (!date) return "";
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDate(value?: string) {
  if (!value) return null;
  const parts = value.split("-").map(v => Number(v));
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  const [y, m, d] = parts;
  const candidate = new Date(y, m - 1, d);
  if (candidate.getFullYear() !== y || candidate.getMonth() !== m - 1 || candidate.getDate() !== d) {
    return null;
  }
  return candidate;
}

export default function CustomDatePickerComponent({
  label,
  labelWidth,
  labelAlign = "left",
  inputAlign = "left",
  readonly = false,
  required = false,
  placeholder = "请选择日期",
  value,
  onChange,
  minDate,
  maxDate,
  boxStyle
}: Props) {
  const [tempDate, setTempDate] = useState<Date | null>(() => parseDate(value) || new Date());
  const [showPicker, setShowPicker] = useState(false);

  const openSheet = useCallback(() => {
    if (readonly) return;
    setTempDate(parseDate(value) || new Date());
    setShowPicker(true);
  }, [readonly, value]);

  const closeSheet = useCallback(() => {
    setShowPicker(false);
  }, []);

  const commitValue = useCallback(
    (date: Date) => {
      const formatted = formatDate(date);
      onChange?.(formatted);
    },
    [onChange]
  );

  const handleChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === "set" && date) {
        setTempDate(date);
        commitValue(date);
      }
      if (event.type === "set" || event.type === "dismissed") {
        setShowPicker(false);
      }
    },
    [commitValue]
  );

  const displayValue = value ? value : "";
  const showPlaceholder = !displayValue;

  // 如果父层在弹窗打开期间更新了 value，保持同步
  useEffect(() => {
    if (showPicker) {
      setTempDate(parseDate(value) || new Date());
    }
  }, [showPicker, value]);

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

      <TouchableOpacity
        style={[
          styles.inputBox,
          readonly ? styles.inputBoxDisabled : null
        ]}
        activeOpacity={0.8}
        onPress={openSheet}
        disabled={readonly}
      >
        <Text
          style={[
            styles.inputText,
            showPlaceholder ? styles.placeholderText : null,
            readonly ? styles.readonlyText : null,
            { textAlign: inputAlign }
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {showPlaceholder ? placeholder : displayValue}
        </Text>
        <Text style={styles.caretIcon}>▼</Text>
      </TouchableOpacity>

      {showPicker ? (
        <DateTimePicker
          value={tempDate || parseDate(value) || new Date()}
          mode="date"
          display="spinner"
          minimumDate={minDate}
          maximumDate={maxDate}
          onChange={handleChange}
          locale="zh-CN"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
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
    color: Colors.required,
  },
  inputBox: {
    flex: 1,
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
  caretIcon: {
    marginLeft: Theme.spacing.sm,
    color: Colors.text.light,
    fontSize: Theme.fontSize.xs
  },
  readonlyText: {
    color: Colors.text.light
  }
});
