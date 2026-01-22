import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  StyleProp,
  GestureResponderEvent
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../constants/colors";
import { Theme } from "../../../constants/theme";
import PopupComponent from "../../container/popup/PopupComponent";

export type CalendarType = "single" | "multiple" | "range";
export type CalendarSwitchMode = "none" | "month" | "year-month";

export type CalendarDayType =
  | "selected"
  | "start"
  | "middle"
  | "end"
  | "disabled"
  | "start-end"
  | "multiple-selected"
  | "multiple-middle"
  | "placeholder";

export type CalendarDayItem = {
  date: Date;
  type?: CalendarDayType;
  text?: string | number;
  topInfo?: string;
  bottomInfo?: string;
  className?: string;
};

export type CalendarProps = {
  type?: CalendarType;
  switchMode?: CalendarSwitchMode;
  title?: string;
  color?: string;
  minDate?: Date;
  maxDate?: Date;
  defaultDate?: Date | Date[] | null;
  rowHeight?: number;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showConfirm?: boolean;
  readonly?: boolean;
  confirmText?: string;
  confirmDisabledText?: string;
  firstDayOfWeek?: number;
  maxRange?: number | string;
  allowSameDay?: boolean;
  onSelect?: (value: Date | Date[] | null) => void;
  onConfirm?: (value: Date | Date[] | null) => void;
  onUnselect?: (value: Date) => void;
  onMonthShow?: (payload: { date: Date; title: string }) => void;
  onPanelChange?: (payload: { date: Date }) => void;
  onClickSubtitle?: (event: GestureResponderEvent) => void;
  onClickDisabledDate?: (value: Date | Date[]) => void;
  onClickOverlay?: (event?: GestureResponderEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onOpened?: () => void;
  onClosed?: () => void;
  onOverRange?: (payload?: { maxRange?: number; range?: Date[] }) => void;
  formatter?: (day: CalendarDayItem) => CalendarDayItem;
  showMark?: boolean;
  poppable?: boolean;
  visible?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  round?: boolean;
  closeOnClickOverlay?: boolean;
  safeAreaInsetBottom?: boolean;
  style?: StyleProp<ViewStyle>;
};

const WEEK_LABELS = ["日", "一", "二", "三", "四", "五", "六"];

export default function CalendarComponent({
  type = "single",
  switchMode = "none",
  title = "日期选择",
  color = Colors.primary,
  minDate,
  maxDate,
  defaultDate,
  rowHeight = 48,
  showTitle = true,
  showSubtitle = true,
  showConfirm = true,
  readonly = false,
  confirmText = "确认",
  confirmDisabledText = "请选择结束时间",
  firstDayOfWeek = 0,
  maxRange,
  allowSameDay = false,
  onSelect,
  onConfirm,
  onUnselect,
  onMonthShow,
  onPanelChange,
  onClickSubtitle,
  onClickDisabledDate,
  onClickOverlay,
  onOpen,
  onClose,
  onOpened,
  onClosed,
  onOverRange,
  formatter,
  showMark = true,
  poppable = false,
  visible = true,
  position = "bottom",
  round = true,
  closeOnClickOverlay = true,
  safeAreaInsetBottom = true,
  style
}: CalendarProps) {
  const today = useMemo(() => startOfDay(new Date()), []);

  const computedMinDate = useMemo(() => {
    if (minDate) return startOfDay(minDate);
    if (switchMode === "none") return today;
    return undefined;
  }, [minDate, switchMode, today]);

  const computedMaxDate = useMemo(() => {
    if (maxDate) return startOfDay(maxDate);
    if (switchMode === "none") return addMonths(today, 6);
    return undefined;
  }, [maxDate, switchMode, today]);

  const initialSelected = useMemo(() => {
    if (defaultDate === null) return null;
    if (type === "single") {
      return defaultDate instanceof Date ? defaultDate : today;
    }
    if (type === "multiple") {
      return Array.isArray(defaultDate) ? defaultDate.map(d => (d instanceof Date ? d : today)) : [];
    }
    if (type === "range") {
      if (Array.isArray(defaultDate) && defaultDate.length >= 2) {
        const [s, e] = defaultDate;
        return [s || today, e || today];
      }
      return [today, null];
    }
    return null;
  }, [defaultDate, today, type]);

  const [currentMonth, setCurrentMonth] = useState<Date>(
    initialSelected instanceof Date
      ? startOfMonth(initialSelected)
      : Array.isArray(initialSelected) && initialSelected.length
        ? startOfMonth(initialSelected[0] || today)
        : startOfMonth(today)
  );
  const [selected, setSelected] = useState<any>(initialSelected);

  const monthViews = useMemo(() => {
    const start = startOfMonth(computedMinDate || today);
    const end = startOfMonth(computedMaxDate || addMonths(today, 6));
    if (switchMode === "none") {
      const months = enumerateMonths(start, end);
      return months.map(month => ({
        month,
        title: formatMonthTitle(month),
        weeks: buildMonth(month, firstDayOfWeek, computedMinDate, computedMaxDate)
      }));
    }
    const current = startOfMonth(currentMonth);
    return [
      {
        month: current,
        title: formatMonthTitle(current),
        weeks: buildMonth(current, firstDayOfWeek, computedMinDate, computedMaxDate)
      }
    ];
  }, [computedMaxDate, computedMinDate, currentMonth, firstDayOfWeek, switchMode, today]);

  const headerSubtitle = useMemo(() => monthViews[0]?.title || "", [monthViews]);
  const rangeBgColor = useMemo(() => buildRangeBg(color), [color]);
  const monthBlockMinHeight = useMemo(
    () => rowHeight * 6 + Theme.spacing.md * 2 + Theme.fontSize.md,
    [rowHeight]
  );

  const handleChangeMonth = useCallback(
    (delta: number, unit: "month" | "year" = "month") => {
      setCurrentMonth(prev => {
        const next = new Date(prev);
        if (unit === "year") {
          next.setFullYear(next.getFullYear() + delta);
        } else {
          next.setMonth(next.getMonth() + delta);
        }
        const target = startOfMonth(next);
        if (computedMinDate && target < startOfMonth(computedMinDate)) return prev;
        if (computedMaxDate && target > startOfMonth(computedMaxDate)) return prev;
        return target;
      });
    },
    [computedMaxDate, computedMinDate]
  );

  useEffect(() => {
    if (switchMode === "none") return;
    onPanelChange?.({ date: currentMonth });
  }, [currentMonth, onPanelChange, switchMode]);

  useEffect(() => {
    if (!onMonthShow) return;
    if (switchMode === "none") {
      monthViews.forEach(item => onMonthShow({ date: item.month, title: item.title }));
      return;
    }
    onMonthShow({ date: currentMonth, title: formatMonthTitle(currentMonth) });
  }, [currentMonth, monthViews, onMonthShow, switchMode]);

  const emitSelect = useCallback(
    (val: any) => {
      onSelect?.(val);
      if (!showConfirm) {
        if (type === "range") {
          const [s, e] = (val || []) as Date[];
          if (s && e) {
            onConfirm?.([s, e]);
          }
        } else {
          onConfirm?.(val);
        }
      }
    },
    [onConfirm, onSelect, showConfirm, type]
  );

  const setSelection = useCallback(
    (next: any) => {
      setSelected(next);
      emitSelect(next);
    },
    [emitSelect]
  );

  const handleSelectSingle = useCallback(
    (day: Date) => {
      if (readonly) return;
      setSelection(day);
    },
    [readonly, setSelection]
  );

  const handleSelectMultiple = useCallback(
    (day: Date) => {
      if (readonly) return;
      const exists = (selected as Date[]).some(d => isSameDay(d, day));
      const next = exists ? (selected as Date[]).filter(d => !isSameDay(d, day)) : [...((selected as Date[]) || []), day];
      if (!exists && maxRange && next.length > Number(maxRange)) {
        onOverRange?.({ maxRange: Number(maxRange), range: next });
        return;
      }
      if (exists) {
        onUnselect?.(day);
      }
      setSelection(next);
    },
    [maxRange, onOverRange, onUnselect, readonly, selected, setSelection]
  );

  const handleSelectRange = useCallback(
    (day: Date) => {
      if (readonly) return;
      const [start, end] = (selected as Date[] | null) || [];
      if (!start || (start && end)) {
        setSelection([day, null]);
        return;
      }
      const sameDay = isSameDay(start, day);
      if (!allowSameDay && sameDay) {
        setSelection([day, null]);
        return;
      }
      const ordered: [Date, Date] = day < start ? [day, start] : [start, day];
      if (maxRange) {
        const days = diffDays(ordered[0], ordered[1]) + 1;
        if (days > Number(maxRange)) {
          onOverRange?.({ maxRange: Number(maxRange), range: ordered });
          return;
        }
      }
      setSelection(ordered);
    },
    [allowSameDay, maxRange, onOverRange, readonly, selected, setSelection]
  );

  const handleSelect = useCallback(
    (day: Date) => {
      switch (type) {
        case "multiple":
          handleSelectMultiple(day);
          break;
        case "range":
          handleSelectRange(day);
          break;
        default:
          handleSelectSingle(day);
      }
    },
    [handleSelectMultiple, handleSelectRange, handleSelectSingle, type]
  );

  const handleConfirm = useCallback(() => {
    if (type === "range") {
      const [start, end] = selected || [];
      if (!start || !end) return;
      onConfirm?.([start, end]);
    } else {
      onConfirm?.(selected);
    }
  }, [onConfirm, selected, type]);

  const renderHeader = () => {
    if (!showTitle && !showSubtitle && switchMode === "none") return null;
    const subtitleNode = showSubtitle ? (
      <Pressable disabled={!onClickSubtitle} onPress={onClickSubtitle}>
        <Text style={[styles.subtitle, switchMode !== "none" ? styles.subtitleCenter : null]}>{headerSubtitle}</Text>
      </Pressable>
    ) : null;
    return (
      <View style={styles.header}>
        {showTitle ? <Text style={styles.title}>{title}</Text> : null}
        {switchMode !== "none" ? (
          <View style={styles.switchRow}>
            {switchMode === "year-month" ? (
              <>
                <Pressable style={styles.switchBtn} onPress={() => handleChangeMonth(-1, "year")} hitSlop={8}>
                  <MaterialIcons name="fast-rewind" size={20} color={Colors.text.secondary} />
                </Pressable>
                <Pressable style={styles.switchBtn} onPress={() => handleChangeMonth(-1, "month")} hitSlop={8}>
                  <MaterialIcons name="chevron-left" size={20} color={Colors.text.secondary} />
                </Pressable>
                {subtitleNode}
                <Pressable style={styles.switchBtn} onPress={() => handleChangeMonth(1, "month")} hitSlop={8}>
                  <MaterialIcons name="chevron-right" size={20} color={Colors.text.secondary} />
                </Pressable>
                <Pressable style={styles.switchBtn} onPress={() => handleChangeMonth(1, "year")} hitSlop={8}>
                  <MaterialIcons name="fast-forward" size={20} color={Colors.text.secondary} />
                </Pressable>
              </>
            ) : (
              <>
                <Pressable style={styles.switchBtn} onPress={() => handleChangeMonth(-1, "month")} hitSlop={8}>
                  <MaterialIcons name="chevron-left" size={20} color={Colors.text.secondary} />
                </Pressable>
                {subtitleNode}
                <Pressable style={styles.switchBtn} onPress={() => handleChangeMonth(1, "month")} hitSlop={8}>
                  <MaterialIcons name="chevron-right" size={20} color={Colors.text.secondary} />
                </Pressable>
              </>
            )}
          </View>
        ) : showSubtitle ? (
          <Pressable disabled={!onClickSubtitle} onPress={onClickSubtitle} style={{ marginTop: Theme.spacing.xs }}>
            <Text style={styles.subtitle}>{headerSubtitle}</Text>
          </Pressable>
        ) : null}
      </View>
    );
  };

  const footerDisabled = useMemo(() => {
    if (type !== "range") return false;
    const [start, end] = selected || [];
    return !start || !end;
  }, [selected, type]);

  const prevVisibleRef = useRef(false);
  const closeReasonRef = useRef<"overlay" | null>(null);

  const handlePopupClose = useCallback(
    (event?: GestureResponderEvent) => {
      closeReasonRef.current = "overlay";
      onClickOverlay?.(event as GestureResponderEvent);
      onClose?.();
    },
    [onClickOverlay, onClose]
  );

  useEffect(() => {
    const prev = prevVisibleRef.current;
    if (poppable && visible && !prev) {
      onOpen?.();
      onOpened?.();
    }
    if (poppable && !visible && prev) {
      if (closeReasonRef.current !== "overlay") {
        onClose?.();
      }
      onClosed?.();
    }
    if (!visible) {
      closeReasonRef.current = null;
    }
    prevVisibleRef.current = visible;
  }, [onClose, onOpen, onOpened, onClosed, poppable, visible]);

  const calendarNode = (
    <View style={[styles.container, style]}>
      {renderHeader()}

      <View style={styles.weekRow}>
        {new Array(7).fill(0).map((_, idx) => {
          const real = (idx + firstDayOfWeek) % 7;
          return (
            <Text key={`w-${idx}`} style={styles.weekText}>
              {WEEK_LABELS[real]}
            </Text>
          );
        })}
      </View>

      <View style={styles.calendarBody}>
        {monthViews.map(month => (
          <View key={month.month.toISOString()} style={[styles.monthBlock, { minHeight: monthBlockMinHeight }]}>
            <Text style={styles.monthTitle}>{month.title}</Text>
            {showMark ? <Text style={styles.monthMark} pointerEvents="none">{month.title}</Text> : null}
            {month.weeks.map((row, rowIdx) => (
              <View key={`month-${month.month.toISOString()}-${rowIdx}`} style={[styles.row, { height: rowHeight }]}>
                {row.map((day, colIdx) => {
                  if (!day) return <View key={`empty-${colIdx}`} style={[styles.cell, { height: rowHeight }]} />;
                  const isSelected = computeSelected(day.date, selected, type);
                  const isRangeMiddle = type === "range" && isBetween(day.date, selected as Date[] | null);
                  const isStart = type === "range" && isSameDay(day.date, (selected as Date[] || [])[0]);
                  const isEnd = type === "range" && isSameDay(day.date, (selected as Date[] || [])[1]);
                  const hasRangeEnd =
                    type === "range" && !!(selected as Date[] || [])[0] && !!(selected as Date[] || [])[1];
                  const isSameRangeDay = isStart && isEnd;
                  const showRangeBg = hasRangeEnd && !isSameRangeDay && (isStart || isEnd || isRangeMiddle);
                  const rangeLeftActive = showRangeBg && (isRangeMiddle || isEnd);
                  const rangeRightActive = showRangeBg && (isRangeMiddle || isStart);
                  const dayType = deriveDayType(type, isSelected, isRangeMiddle, isStart, isEnd, day.disabled);
                  const formattedDay = formatter ? formatter({ ...day, type: dayType }) : { ...day, type: dayType };
                  const formattedDate = formattedDay.date || day.date;
                  const disabled = day.disabled || formattedDay.type === "disabled";
                  const textColor = isSelected || isRangeMiddle ? color : Colors.text.primary;
                  const cellRadiusStyle =
                    type === "range"
                      ? isStart && !isEnd
                        ? styles.rangeStart
                        : isEnd && !isStart
                          ? styles.rangeEnd
                          : isRangeMiddle
                            ? styles.rangeMiddle
                            : null
                      : null;
                  const radiusStyle =
                    type === "range" && (isStart || isEnd)
                      ? { borderRadius: Theme.radius.md }
                      : isSelected
                        ? { borderRadius: Theme.radius.md }
                        : null;
                  const startEndBg = isStart || isEnd;
                  return (
                    <Pressable
                      key={day.date.toISOString()}
                      style={[
                        styles.cell,
                        { height: rowHeight },
                        cellRadiusStyle
                      ]}
                      onPress={() => {
                        if (disabled) {
                          onClickDisabledDate?.(formattedDate);
                          return;
                        }
                        handleSelect(day.date);
                      }}
                      disabled={readonly}
                    >
                      {showRangeBg ? (
                        <View style={styles.rangeBg}>
                          <View
                            style={[
                              styles.rangeBgHalf,
                              rangeLeftActive ? { backgroundColor: rangeBgColor } : null
                            ]}
                          />
                          <View
                            style={[
                              styles.rangeBgHalf,
                              rangeRightActive ? { backgroundColor: rangeBgColor } : null
                            ]}
                          />
                        </View>
                      ) : null}
                      <View
                        style={[
                          styles.dayInner,
                          startEndBg || isSelected ? { backgroundColor: color } : null,
                          radiusStyle
                        ]}
                      >
                        {formattedDay.topInfo ? <Text style={styles.topInfo}>{formattedDay.topInfo}</Text> : null}
                        <Text
                          style={[
                            styles.dayText,
                            { color: startEndBg || isSelected ? Colors.white : textColor },
                            disabled ? styles.disabledText : null
                          ]}
                        >
                          {formattedDay.text ?? day.date.getDate()}
                        </Text>
                        {formattedDay.bottomInfo ? <Text style={styles.bottomInfo}>{formattedDay.bottomInfo}</Text> : null}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        ))}
      </View>

      {showConfirm ? (
        <View style={styles.footer}>
          <Pressable
            style={[
              styles.confirmBtn,
              { backgroundColor: footerDisabled ? Colors.border : color }
            ]}
            onPress={handleConfirm}
            disabled={footerDisabled}
          >
            <Text style={styles.confirmText}>
              {footerDisabled ? confirmDisabledText : confirmText}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );

  if (poppable) {
    return (
      <PopupComponent
        visible={visible}
        position={position}
        round={round}
        closeOnClickOverlay={closeOnClickOverlay}
        onClose={handlePopupClose}
        safeAreaInsetBottom={safeAreaInsetBottom}
      >
        {calendarNode}
      </PopupComponent>
    );
  }

  if (!visible) return null;

  return calendarNode;
}

type DayCell = CalendarDayItem & {
  date: Date;
  disabled: boolean;
};

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function formatMonthTitle(d: Date) {
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}

function formatDate(d: Date) {
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

function isSameDay(a?: Date | null, b?: Date | null) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isBetween(day: Date, range: Date[] | null): boolean {
  if (!range || range.length < 2 || !range[0] || !range[1]) return false;
  const start = startOfDay(range[0]);
  const end = startOfDay(range[1]);
  return day > start && day < end;
}

function computeSelected(day: Date, selected: any, type: CalendarType) {
  if (!selected) return false;
  if (type === "single") return isSameDay(day, selected as Date);
  if (type === "multiple") return (selected as Date[]).some(d => isSameDay(d, day));
  if (type === "range") {
    const [s, e] = selected as Date[];
    return isSameDay(day, s) || isSameDay(day, e);
  }
  return false;
}

function deriveDayType(
  calendarType: CalendarType,
  isSelected: boolean,
  isRangeMiddle: boolean,
  isStart: boolean,
  isEnd: boolean,
  disabled: boolean
): CalendarDayType | undefined {
  if (disabled) return "disabled";
  if (calendarType === "range") {
    if (isStart && isEnd) return "start-end";
    if (isStart) return "start";
    if (isEnd) return "end";
    if (isRangeMiddle) return "middle";
    return undefined;
  }
  if (calendarType === "multiple") {
    return isSelected ? "multiple-selected" : undefined;
  }
  return isSelected ? "selected" : undefined;
}

function diffDays(a: Date, b: Date) {
  const diff = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

function addMonths(date: Date, count: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + count);
  return next;
}

function enumerateMonths(start: Date, end: Date) {
  const months: Date[] = [];
  const cursor = startOfMonth(start);
  const last = startOfMonth(end);
  while (cursor <= last) {
    months.push(new Date(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return months;
}

function buildMonth(current: Date, firstDayOfWeek: number, minDate?: Date, maxDate?: Date) {
  const year = current.getFullYear();
  const month = current.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (first.getDay() - firstDayOfWeek + 7) % 7;
  const rows: Array<(DayCell | null)[]> = [];
  let currentRow: (DayCell | null)[] = Array(offset).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const disabled =
      (!!minDate && startOfDay(date) < startOfDay(minDate)) ||
      (!!maxDate && startOfDay(date) > startOfDay(maxDate));
    currentRow.push({
      date,
      disabled,
      text: day
    });
    if (currentRow.length === 7) {
      rows.push(currentRow);
      currentRow = [];
    }
  }
  if (currentRow.length) {
    while (currentRow.length < 7) currentRow.push(null);
    rows.push(currentRow);
  }
  return rows;
}

function buildRangeBg(input: string, alpha = 0.1): string {
  const hex = hexToRgba(input, alpha);
  if (hex) return hex;
  const rgb = rgbToRgba(input, alpha);
  if (rgb) return rgb;
  return `rgba(0, 0, 0, ${alpha})`;
}

function hexToRgba(color: string, alpha: number): string | null {
  if (!color || color[0] !== "#") return null;
  const raw = color.slice(1);
  if (raw.length !== 3 && raw.length !== 6) return null;
  const full = raw.length === 3 ? raw.split("").map(c => c + c).join("") : raw;
  const int = parseInt(full, 16);
  if (Number.isNaN(int)) return null;
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function rgbToRgba(color: string, alpha: number): string | null {
  const match = color.match(/^rgba?\\((\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})(?:\\s*,\\s*[\\d.]+)?\\)$/);
  if (!match) return null;
  const [r, g, b] = match.slice(1, 4).map(n => Math.min(255, Number(n)));
  if ([r, g, b].some(n => Number.isNaN(n))) return null;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Theme.radius.lg,
    ...Theme.shadow.card,
    overflow: "hidden"
  },
  calendarBody: {
    position: "relative",
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.sm
  },
  monthBlock: {
    position: "relative",
    paddingBottom: Theme.spacing.sm
  },
  monthTitle: {
    paddingVertical: Theme.spacing.xs,
    color: Colors.text.secondary,
    fontSize: Theme.fontSize.sm
  },
  monthMark: {
    position: "absolute",
    top: Theme.spacing.xs,
    right: Theme.spacing.md,
    fontSize: 64,
    color: Colors.text.light,
    opacity: 0.08,
    fontWeight: "700"
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    width: "100%"
  },
  title: {
    fontSize: Theme.fontSize.lg,
    color: Colors.text.primary,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%"
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Theme.spacing.xs,
    width: "100%"
  },
  subtitle: {
    marginTop: Theme.spacing.xs,
    color: Colors.text.secondary,
    fontSize: Theme.fontSize.md
  },
  subtitleCenter: {
    flex: 1,
    textAlign: "center"
  },
  switchBtn: {
    width: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  switchRow: {
    flexDirection: "row",
    marginTop: Theme.spacing.sm,
    alignItems: "center",
    justifyContent: "space-between"
  },
  weekRow: {
    flexDirection: "row",
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
    paddingTop: Theme.spacing.sm
  },
  weekText: {
    flex: 1,
    textAlign: "center",
    color: Colors.text.light,
    fontSize: Theme.fontSize.xs
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  rangeBg: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row"
  },
  rangeBgHalf: {
    flex: 1
  },
  rangeStart: {
    borderTopLeftRadius: Theme.radius.sm,
    borderBottomLeftRadius: Theme.radius.sm
  },
  rangeEnd: {
    borderTopRightRadius: Theme.radius.sm,
    borderBottomRightRadius: Theme.radius.sm
  },
  rangeMiddle: {
    borderRadius: 0
  },
  dayInner: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: Theme.radius.sm,
    minWidth: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  dayText: {
    fontSize: Theme.fontSize.md
  },
  topInfo: {
    fontSize: Theme.fontSize.xs,
    color: Colors.text.secondary,
    marginBottom: 2
  },
  bottomInfo: {
    fontSize: Theme.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: 2
  },
  disabledText: {
    color: Colors.text.light
  },
  footer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white
  },
  confirmBtn: {
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    minWidth: 180,
    alignItems: "center"
  },
  confirmText: {
    color: Colors.white,
    fontSize: Theme.fontSize.md,
    fontWeight: "600"
  }
});
