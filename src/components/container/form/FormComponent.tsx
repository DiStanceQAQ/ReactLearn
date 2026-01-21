import React, {
  ReactNode,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";

export type FieldValidationStatus = "passed" | "failed" | "unvalidated";
export type ValidateTrigger = "onSubmit" | "onChange" | "onBlur";
export type ScrollErrorAlign = "center" | "end" | "nearest" | "start";

export type FieldValidateResult =
  | boolean
  | string
  | { valid: boolean; message?: string }
  | Promise<boolean | string | { valid: boolean; message?: string }>;

export type FormField = {
  name: string;
  getValue: () => unknown;
  validate?: () => FieldValidateResult;
  resetValidation?: () => void;
  setError?: (message: string | null) => void;
  scrollToField?: (align?: ScrollErrorAlign | boolean) => void;
};

export type FormProps = {
  visibility?: boolean;
  colon?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean | "auto";
  labelWidth?: number | string;
  labelAlign?: "left" | "center" | "right" | "top";
  inputAlign?: "left" | "center" | "right";
  errorMessageAlign?: "left" | "center" | "right";
  validateTrigger?: ValidateTrigger | ValidateTrigger[];
  validateFirst?: boolean;
  showError?: boolean;
  showErrorMessage?: boolean;
  scrollToError?: boolean;
  scrollToErrorPosition?: ScrollErrorAlign;
  children?: ReactNode;
  onSubmit?: (values: Record<string, unknown>) => void;
  onFailed?: (errorInfo: { values: Record<string, unknown>; errors: Array<{ name: string; message?: string }> }) => void;
};

export type FormInstance = {
  submit: () => Promise<void>;
  validate: (names?: string | string[]) => Promise<void>;
  resetValidation: (names?: string | string[]) => void;
  getValues: () => Record<string, unknown>;
  getValidationStatus: () => Record<string, FieldValidationStatus>;
  scrollToField: (name: string, alignToTop?: boolean | ScrollErrorAlign) => void;
  setShowComponent: (value: boolean | null) => void;
  showComponent: boolean | null;
  resetVisibilityOverride: () => void;
};

export type FormContextValue = {
  colon?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean | "auto";
  labelWidth?: number | string;
  labelAlign?: "left" | "center" | "right" | "top";
  inputAlign?: "left" | "center" | "right";
  errorMessageAlign?: "left" | "center" | "right";
  showError?: boolean;
  showErrorMessage?: boolean;
  validateTrigger?: ValidateTrigger | ValidateTrigger[];
  registerField: (field: FormField) => () => void;
  getFieldState: (name: string) => { status: FieldValidationStatus; message?: string };
  setFieldState: (name: string, state: Partial<{ status: FieldValidationStatus; message?: string }>) => void;
};

const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  return useContext(FormContext);
}

function FormComponentInner(
  {
    visibility = true,
    colon,
    disabled,
    readonly,
    required,
    labelWidth,
    labelAlign,
    inputAlign,
    errorMessageAlign,
    validateTrigger = "onBlur",
    validateFirst = false,
    showError = false,
    showErrorMessage = true,
    scrollToError = false,
    scrollToErrorPosition,
    children,
    onSubmit,
    onFailed
  }: FormProps,
  ref: React.Ref<FormInstance>
) {
  const fieldsRef = useRef<Map<string, FormField>>(new Map());
  const [statusMap, setStatusMap] = useState<Record<string, FieldValidationStatus>>({});
  const [errorMessageMap, setErrorMessageMap] = useState<Record<string, string | undefined>>({});
  const [overrideVisible, setOverrideVisible] = useState<boolean | null>(null);

  const showComputed = useMemo(
    () => (overrideVisible !== null ? overrideVisible : visibility),
    [overrideVisible, visibility]
  );

  const setFieldState = useCallback((name: string, state: Partial<{ status: FieldValidationStatus; message?: string }>) => {
    setStatusMap(prev => ({ ...prev, [name]: state.status ?? prev[name] ?? "unvalidated" }));
    setErrorMessageMap(prev => ({ ...prev, [name]: state.message }));
  }, []);

  const registerField = useCallback((field: FormField) => {
    if (!field.name) return () => undefined;
    fieldsRef.current.set(field.name, field);
    setStatusMap(prev => ({ ...prev, [field.name]: prev[field.name] ?? "unvalidated" }));
    return () => {
      fieldsRef.current.delete(field.name);
      setStatusMap(prev => {
        const next = { ...prev } as Record<string, FieldValidationStatus>;
        delete next[field.name];
        return next;
      });
      setErrorMessageMap(prev => {
        const next = { ...prev } as Record<string, string | undefined>;
        delete next[field.name];
        return next;
      });
    };
  }, []);

  const getFieldState = useCallback(
    (name: string) => ({
      status: statusMap[name] ?? "unvalidated",
      message: errorMessageMap[name]
    }),
    [errorMessageMap, statusMap]
  );

  const getValues = useCallback(() => {
    const values: Record<string, unknown> = {};
    fieldsRef.current.forEach((field, name) => {
      values[name] = field.getValue();
    });
    return values;
  }, []);

  const resetValidation = useCallback((names?: string | string[]) => {
    const targetNames = names ? (Array.isArray(names) ? names : [names]) : Array.from(fieldsRef.current.keys());
    setStatusMap(prev => {
      const next = { ...prev } as Record<string, FieldValidationStatus>;
      targetNames.forEach(name => {
        next[name] = "unvalidated";
      });
      return next;
    });
    setErrorMessageMap(prev => {
      const next = { ...prev } as Record<string, string | undefined>;
      targetNames.forEach(name => {
        next[name] = undefined;
      });
      return next;
    });
    targetNames.forEach(name => {
      const field = fieldsRef.current.get(name);
      field?.resetValidation?.();
      field?.setError?.(null);
    });
  }, []);

  const scrollToField = useCallback((name: string, alignToTop?: boolean | ScrollErrorAlign) => {
    const field = fieldsRef.current.get(name);
    field?.scrollToField?.(alignToTop);
  }, []);

  const runValidation = useCallback(
    async (targetNames?: string[]) => {
      const names = targetNames && targetNames.length ? targetNames : Array.from(fieldsRef.current.keys());
      const errors: Array<{ name: string; message?: string }> = [];
      for (const name of names) {
        const field = fieldsRef.current.get(name);
        if (!field) continue;
        let valid = true;
        let message: string | undefined;
        if (field.validate) {
          const result = await field.validate();
          if (typeof result === "boolean") {
            valid = result;
          } else if (typeof result === "string") {
            valid = false;
            message = result;
          } else if (typeof result === "object") {
            valid = !!result.valid;
            message = result.message;
          }
        }
        if (!valid) {
          errors.push({ name, message });
          setFieldState(name, { status: "failed", message });
          field.setError?.(message ?? null);
          if (validateFirst) break;
        } else {
          setFieldState(name, { status: "passed", message: undefined });
          field.setError?.(null);
        }
      }
      if (errors.length && scrollToError) {
        scrollToField(errors[0].name, scrollToErrorPosition ?? true);
      }
      return errors;
    },
    [scrollToError, scrollToErrorPosition, scrollToField, setFieldState, validateFirst]
  );

  const validate = useCallback(
    async (names?: string | string[]) => {
      const nameList = names ? (Array.isArray(names) ? names : [names]) : undefined;
      const errors = await runValidation(nameList);
      if (errors.length) {
        const errorInfo = { values: getValues(), errors };
        onFailed?.(errorInfo);
        throw errorInfo;
      }
    },
    [getValues, onFailed, runValidation]
  );

  const submit = useCallback(async () => {
    const errors = await runValidation();
    if (errors.length) {
      const errorInfo = { values: getValues(), errors };
      onFailed?.(errorInfo);
      return;
    }
    onSubmit?.(getValues());
  }, [getValues, onFailed, onSubmit, runValidation]);

  useImperativeHandle(
    ref,
    () => ({
      submit,
      validate,
      resetValidation,
      getValues,
      getValidationStatus: () => statusMap,
      scrollToField,
      setShowComponent: setOverrideVisible,
      showComponent: overrideVisible,
      resetVisibilityOverride: () => setOverrideVisible(null)
    }),
    [getValues, overrideVisible, resetValidation, scrollToField, statusMap, submit, validate]
  );

  const contextValue = useMemo<FormContextValue>(
    () => ({
      colon,
      disabled,
      readonly,
      required,
      labelWidth,
      labelAlign,
      inputAlign,
      errorMessageAlign,
      showError,
      showErrorMessage,
      validateTrigger,
      registerField,
      getFieldState,
      setFieldState
    }),
    [
      colon,
      disabled,
      errorMessageAlign,
      getFieldState,
      inputAlign,
      labelAlign,
      labelWidth,
      readonly,
      registerField,
      required,
      showError,
      showErrorMessage,
      validateTrigger,
      setFieldState
    ]
  );

  if (!showComputed) return null;

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
}

const FormComponent = forwardRef<FormInstance, FormProps>(FormComponentInner);

export default FormComponent;
