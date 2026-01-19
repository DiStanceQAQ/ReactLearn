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

type Props = {
  label?: string;
  labelWidth?: DimensionValue;
  labelAlign?: "left" | "center" | "right";
  inputAlign?: "left" | "center" | "right";
  disabled?: boolean;
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
  disabled = false,
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

  const isReadonly = readonly || disabled;

  const openSheet = useCallback(() => {
    if (isReadonly) return;
    setTempDate(parseDate(value) || new Date());
    setShowPicker(true);
  }, [isReadonly, value]);

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
            {required ? "*" : ""}
            {label}
          </Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={[
          styles.inputBox,
          isReadonly ? styles.inputBoxDisabled : null
        ]}
        activeOpacity={0.8}
        onPress={openSheet}
        disabled={isReadonly}
      >
        <Text
          style={[
            styles.inputText,
            showPlaceholder ? styles.placeholderText : null,
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
  inputBox: {
    flex: 1,
    minHeight: 44,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
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
    fontSize: 16,
    color: Colors.text.primary
  },
  placeholderText: {
    color: Colors.text.light
  },
  caretIcon: {
    marginLeft: 8,
    color: Colors.text.light,
    fontSize: 12
  }
});
