// src/components/basic/_common/CustomFieldComponent.tsx
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
  DimensionValue
} from "react-native";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";

type InputType = "text" | "password" | "number" | "textarea";

type Props = {
  label?: string;
  labelWidth?: DimensionValue;
  labelAlign?: "left" | "center" | "right";
  inputAlign?: "left" | "center" | "right";
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  clickable?: boolean;
  clearable?: boolean;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  onClick?: () => void;
  maxLength?: number;
  showWordLimit?: boolean;
  type?: InputType;
  rows?: number;
  formatter?: (val: string) => string;
  boxStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export default function CustomFieldComponent({
  label,
  labelWidth,
  labelAlign = "left",
  inputAlign = "left",
  disabled = false,
  readonly = false,
  required = false,
  clickable = false,
  clearable = false,
  error = false,
  errorMessage,
  placeholder = "Please enter",
  value,
  onChange,
  onClick,
  maxLength,
  showWordLimit = false,
  type = "text",
  rows = 3,
  formatter,
  boxStyle,
  inputStyle,
  leftIcon,
  rightIcon
}: Props) {
  const [focused, setFocused] = useState(false);

  const isTextarea = type === "textarea";
  const isDisabledInput = disabled || readonly || clickable;
  const isControlled = value !== undefined || onChange !== undefined;
  const [innerValue, setInnerValue] = useState<string>(value ?? "");

  useEffect(() => {
    if (isControlled) {
      setInnerValue(value ?? "");
    }
  }, [isControlled, value]);

  const displayValue = useMemo(() => innerValue, [innerValue]);
  const canClear = useMemo(
    () => clearable && !!displayValue && !(disabled || readonly || clickable),
    [clearable, displayValue, disabled, readonly, clickable]
  );

  const applyFormatter = useCallback(
    (val: string) => {
      if (!formatter) return val;
      try {
        return formatter(val);
      } catch {
        return val;
      }
    },
    [formatter]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      const next = applyFormatter(text);
      if (isControlled) {
        onChange?.(next);
      } else {
        setInnerValue(next);
      }
    },
    [applyFormatter, isControlled, onChange]
  );

  const handleBlur = useCallback(() => {
    setFocused(false);
    if (formatter) {
      const source = displayValue;
      const next = applyFormatter(source);
      if (next !== source) {
        if (isControlled) {
          onChange?.(next);
        } else {
          setInnerValue(next);
        }
      }
    }
  }, [applyFormatter, displayValue, formatter, isControlled, onChange]);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleClear = useCallback(() => {
    if (disabled || readonly || clickable) return;
    if (isControlled) {
      onChange?.("");
    } else {
      setInnerValue("");
    }
  }, [clickable, disabled, isControlled, onChange, readonly]);

  const handlePress = useCallback(() => {
    if (disabled) return;
    if (clickable || readonly) {
      onClick?.();
    }
  }, [disabled, clickable, readonly, onClick]);

  const keyboardType = type === "number" ? "numeric" : "default";
  const secureTextEntry = type === "password";

  const wordCount = displayValue.length;

  return (
    <View style={[styles.container, isTextarea ? styles.containerTextarea : null, boxStyle]}>
      {label ? (
        <View style={[styles.labelWrap, labelWidth ? { width: labelWidth } : null]}>
          <Text style={[styles.labelText, { textAlign: labelAlign }]}>
            {required ? <Text style={styles.requiredStar}>*</Text> : null}
            {label}
          </Text>
        </View>
      ) : null}

      <View style={styles.fieldArea}>
        <Pressable
          style={({ pressed }) => [
            styles.inputBox,
            isTextarea ? styles.inputBoxTextarea : null,
            disabled ? styles.inputBoxDisabled : null,
            error ? styles.inputBoxError : null,
            focused ? styles.inputBoxFocused : null,
            pressed && (clickable || readonly) ? styles.inputBoxPressed : null
          ]}
          onPress={handlePress}
          disabled={!(clickable || readonly)}
        >
          {leftIcon ? <View style={styles.iconSlot}>{leftIcon}</View> : null}

          <TextInput
          style={[
            styles.input,
            isTextarea ? styles.textareaInput : null,
            disabled || readonly ? styles.inputDisabled : null,
            { textAlign: inputAlign },
            inputStyle
          ]}
            value={displayValue}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.text.light}
            editable={!isDisabledInput}
            selectTextOnFocus={!isDisabledInput}
            maxLength={maxLength}
            multiline={isTextarea}
            numberOfLines={isTextarea ? rows : 1}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textAlignVertical={isTextarea ? "top" : "center"}
          />

          {canClear ? (
            <Pressable onPress={handleClear} hitSlop={6} style={styles.clearButton}>
              <Text style={styles.clearIcon}>{"\u00d7"}</Text>
            </Pressable>
          ) : null}

          {rightIcon ? <View style={styles.iconSlot}>{rightIcon}</View> : null}
        </Pressable>

        {showWordLimit && maxLength ? (
          <Text style={styles.wordLimit}>{`${wordCount}/${maxLength}`}</Text>
        ) : null}

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Theme.spacing.sm
  },
  containerTextarea: {
    alignItems: "flex-start"
  },
  labelWrap: {
    marginRight: Theme.spacing.sm,
    paddingTop: 4,
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
  fieldArea: {
    flex: 1
  },
  inputBox: {
    minHeight: Theme.controlHeight.md,
    borderWidth: Theme.border.width,
    borderColor: Theme.border.color,
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center"
  },
  inputBoxTextarea: {
    paddingVertical: Theme.spacing.sm,
    alignItems: "flex-start"
  },
  inputBoxDisabled: {
    backgroundColor: "#f5f5f5"
  },
  inputBoxError: {
    borderColor: Colors.required
  },
  inputBoxFocused: {
    borderColor: Colors.primary
  },
  inputBoxPressed: {
    opacity: 0.9
  },
  input: {
    flex: 1,
    fontSize: Theme.fontSize.lg,
    color: Colors.text.primary,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: 0
  },
  textareaInput: {
    minHeight: Theme.controlHeight.textarea
  },
  inputDisabled: {
    color: Colors.text.light
  },
  iconSlot: {
    marginHorizontal: Theme.spacing.xs,
    justifyContent: "center",
    alignItems: "center"
  },
  clearButton: {
    paddingHorizontal: Theme.spacing.xs,
    paddingVertical: Theme.spacing.xs
  },
  clearIcon: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.light
  },
  wordLimit: {
    alignSelf: "flex-end",
    marginTop: Theme.spacing.xs,
    fontSize: Theme.fontSize.xs,
    color: Colors.text.light
  },
  errorText: {
    marginTop: Theme.spacing.xs,
    fontSize: Theme.fontSize.xs,
    color: Colors.required
  }
});
