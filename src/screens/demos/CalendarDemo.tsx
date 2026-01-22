import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarComponent from "../../components/form/calendar/Calendar";
import CellComponent from "../../components/basic/cell/CellComponent";
import PopupComponent from "../../components/container/popup/PopupComponent";
import { Colors } from "../../constants/colors";
import { Theme } from "../../constants/theme";

export const CalendarDemo = () => {
  const [showSingle, setShowSingle] = useState(false);
  const [singleDate, setSingleDate] = useState<Date | null>(null);

  const [showMultiple, setShowMultiple] = useState(false);
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);

  const [showRange, setShowRange] = useState(false);
  const [rangeDates, setRangeDates] = useState<Date[] | null>(null);

  const [showRangeWithLimit, setShowRangeWithLimit] = useState(false);
  const [rangeWithLimit, setRangeWithLimit] = useState<Date[] | null>(null);

  const [showYearMonthSwitch, setShowYearMonthSwitch] = useState(false);
  const [yearMonthDate, setYearMonthDate] = useState<Date | null>(null);

  const [showReadonly, setShowReadonly] = useState(false);
  const [showNoConfirm, setShowNoConfirm] = useState(false);
  const [noConfirmDate, setNoConfirmDate] = useState<Date | null>(null);

  const [showMinMaxDate, setShowMinMaxDate] = useState(false);
  const [minMaxDate, setMinMaxDate] = useState<Date | null>(null);

  const [rangeLimitTip, setRangeLimitTip] = useState<string>("");
  const [multipleLimitTip, setMultipleLimitTip] = useState<string>("");
  const [panelInfo, setPanelInfo] = useState<string>("");
  const [monthShowInfo, setMonthShowInfo] = useState<string>("");

  const [flatRange, setFlatRange] = useState<Date[] | null>(null);

  const [builtInVisible, setBuiltInVisible] = useState(false);
  const [builtInValue, setBuiltInValue] = useState<Date | null>(null);
  const [builtInStatus, setBuiltInStatus] = useState<string>("");

  const renderSection = (title: string, content: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{content}</View>
    </View>
  );

  const formatDate = (d?: Date | null) => {
    if (!d) return '';
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  };

  const formatDateArray = (dates?: Date[]) => {
    if (!dates || dates.length === 0) return '未选择';
    if (dates.length === 1) return formatDate(dates[0]);
    return `${formatDate(dates[0])} - ${formatDate(dates[dates.length - 1])}`;
  };

  const formatMultipleDates = (dates?: Date[]) => {
    if (!dates || dates.length === 0) return '未选择';
    return `${dates.length} 个日期`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderSection(
          "选择单个日期",
          <View>
            <CellComponent
              title="选择单个日期"
              value={singleDate ? formatDate(singleDate) : "请选择"}
              isLink
              onPress={() => setShowSingle(true)}
            />
            <PopupComponent visible={showSingle} position="bottom" round onClose={() => setShowSingle(false)}>
              <CalendarComponent
                type="single"
                onConfirm={val => {
                  setSingleDate(val as Date);
                  setShowSingle(false);
                }}
                onSelect={val => setSingleDate(val as Date)}
                showConfirm
                color={Colors.primary}
                switchMode="month"
                title="单选日期"
              />
            </PopupComponent>
          </View>
        )}

        {renderSection(
          "选择多个日期（含上限）",
          <View>
            <CellComponent
              title="选择多个日期"
              value={formatMultipleDates(multipleDates)}
              isLink
              onPress={() => setShowMultiple(true)}
              extra={
                multipleLimitTip ? <Text style={styles.extraText}>{multipleLimitTip}</Text> : undefined
              }
            />
            <PopupComponent visible={showMultiple} position="bottom" round onClose={() => setShowMultiple(false)}>
              <CalendarComponent
                type="multiple"
                defaultDate={multipleDates}
                onConfirm={val => {
                  setMultipleDates(val as Date[]);
                  setShowMultiple(false);
                  setMultipleLimitTip("");
                }}
                onUnselect={() => setMultipleLimitTip("")}
                onOverRange={payload => {
                  if (payload?.maxRange) {
                    setMultipleLimitTip(`最多可选 ${payload.maxRange} 天`);
                  }
                }}
                showConfirm
                color={Colors.orange}
                switchMode="month"
                title="多选日期"
                maxRange={5}
              />
            </PopupComponent>
          </View>
        )}

        {renderSection(
          "选择日期范围",
          <View>
            <CellComponent
              title="选择日期范围"
              value={rangeDates ? formatDateArray(rangeDates) : "请选择"}
              isLink
              onPress={() => setShowRange(true)}
            />
            <PopupComponent visible={showRange} position="bottom" round onClose={() => setShowRange(false)}>
              <CalendarComponent
                type="range"
                onConfirm={val => {
                  setRangeDates(val as Date[]);
                  setShowRange(false);
                }}
                showConfirm
                color="#FF6B35"
                switchMode="month"
                title="日期范围选择"
                allowSameDay={false}
              />
            </PopupComponent>
          </View>
        )}

        {renderSection(
          "范围选择（限制最大天数）",
          <View>
            <CellComponent
              title="范围选择（最多 7 天）"
              value={rangeWithLimit ? formatDateArray(rangeWithLimit) : "请选择"}
              isLink
              onPress={() => setShowRangeWithLimit(true)}
              extra={rangeLimitTip ? <Text style={styles.extraText}>{rangeLimitTip}</Text> : undefined}
            />
            <PopupComponent visible={showRangeWithLimit} position="bottom" round onClose={() => setShowRangeWithLimit(false)}>
              <CalendarComponent
                type="range"
                onConfirm={val => {
                  setRangeWithLimit(val as Date[]);
                  setRangeLimitTip("");
                  setShowRangeWithLimit(false);
                }}
                showConfirm
                color={Colors.required}
                switchMode="month"
                title="日期范围（最多 7 天）"
                maxRange={7}
                confirmDisabledText="请选择结束日期（最多 7 天）"
                onOverRange={() => setRangeLimitTip("超过 7 天不可选")}
              />
            </PopupComponent>
          </View>
        )}

        {renderSection(
          "年月切换模式（带事件）",
          <View>
            <CellComponent
              title="年月切换"
              value={yearMonthDate ? formatDate(yearMonthDate) : "请选择"}
              isLink
              onPress={() => setShowYearMonthSwitch(true)}
              extra={panelInfo ? <Text style={styles.extraText}>{panelInfo}</Text> : undefined}
            />
            <PopupComponent visible={showYearMonthSwitch} position="bottom" round onClose={() => setShowYearMonthSwitch(false)}>
              <CalendarComponent
                type="single"
                onConfirm={val => {
                  setYearMonthDate(val as Date);
                  setShowYearMonthSwitch(false);
                }}
                showConfirm
                color="#9C27B0"
                switchMode="year-month"
                title="年月切换模式"
                onPanelChange={({ date }) => setPanelInfo(`切换到：${date.getFullYear()}-${date.getMonth() + 1}`)}
              />
            </PopupComponent>
          </View>
        )}

        {renderSection(
          "无确认按钮（实时选择）",
          <View>
            <CellComponent
              title="无确认按钮"
              value={noConfirmDate ? formatDate(noConfirmDate) : "请选择"}
              isLink
              onPress={() => setShowNoConfirm(true)}
            />
            <PopupComponent visible={showNoConfirm} position="bottom" round onClose={() => setShowNoConfirm(false)}>
              <CalendarComponent
                type="single"
                onSelect={val => {
                  setNoConfirmDate(val as Date);
                  setShowNoConfirm(false);
                }}
                showConfirm={false}
                color="#607D8B"
                switchMode="month"
                title="点击即选择"
              />
            </PopupComponent>
          </View>
        )}

        {renderSection(
          "只读模式",
          <View>
            <CellComponent title="只读日历" value="只读展示" isLink onPress={() => setShowReadonly(true)} />
            <PopupComponent visible={showReadonly} position="bottom" round onClose={() => setShowReadonly(false)}>
              <CalendarComponent
                type="single"
                defaultDate={new Date()}
                readonly
                showConfirm={false}
                switchMode="month"
                title="只读日历"
                showTitle={true}
                showSubtitle={true}
              />
            </PopupComponent>
          </View>
        )}

        {renderSection(
          "日期范围限制",
          <View>
            <CellComponent
              title="日期范围限制（本月）"
              value={minMaxDate ? formatDate(minMaxDate) : "请选择"}
              isLink
              onPress={() => setShowMinMaxDate(true)}
            />
            <PopupComponent visible={showMinMaxDate} position="bottom" round onClose={() => setShowMinMaxDate(false)}>
              <CalendarComponent
                type="single"
                onConfirm={val => {
                  setMinMaxDate(val as Date);
                  setShowMinMaxDate(false);
                }}
                showConfirm
                color={Colors.primary}
                switchMode="month"
                title="日期范围限制"
                minDate={new Date(new Date().getFullYear(), new Date().getMonth(), 1)}
                maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)}
                firstDayOfWeek={1}
              />
            </PopupComponent>
          </View>
        )}

        {renderSection(
          "平铺模式（switchMode=none）",
          <View>
            <Text style={styles.tipText}>默认渲染当前起 6 个月；展示 month-show 事件。</Text>
            <CalendarComponent
              type="range"
              switchMode="none"
              onConfirm={val => setFlatRange(val as Date[])}
              showConfirm
              color={Colors.primary}
              onMonthShow={({ title }) => setMonthShowInfo(title)}
              minDate={new Date()}
            />
            <Text style={styles.tipText}>最近 month-show：{monthShowInfo || "无"}</Text>
            <Text style={styles.tipText}>已选范围：{flatRange ? formatDateArray(flatRange) : "未选择"}</Text>
          </View>
        )}

        {renderSection(
          "formatter 示例（周末标记）",
          <View>
            <CalendarComponent
              type="multiple"
              switchMode="month"
              showConfirm={false}
              color={Colors.primary}
              formatter={day => {
                const weekday = day.date.getDay();
                if (weekday === 0 || weekday === 6) {
                  return { ...day, topInfo: "周末", bottomInfo: "放松", type: day.type };
                }
                return day;
              }}
            />
          </View>
        )}

        {renderSection(
          "内置弹层（poppable）",
          <View>
            <CellComponent
              title="打开内置弹层"
              value={builtInValue ? formatDate(builtInValue) : "请选择"}
              isLink
              onPress={() => setBuiltInVisible(true)}
              extra={builtInStatus ? <Text style={styles.extraText}>{builtInStatus}</Text> : undefined}
            />
            <CalendarComponent
              type="single"
              poppable
              visible={builtInVisible}
              onOpen={() => setBuiltInStatus("onOpen")}
              onOpened={() => setBuiltInStatus("onOpened")}
              onClose={() => setBuiltInStatus("onClose")}
              onClosed={() => setBuiltInStatus("onClosed")}
              onConfirm={val => {
                setBuiltInValue(val as Date);
                setBuiltInVisible(false);
              }}
              onClickOverlay={() => setBuiltInVisible(false)}
              switchMode="month"
              title="内置弹层"
              color={Colors.primary}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  sectionContent: {
    backgroundColor: Colors.white,
    marginHorizontal: Theme.spacing.lg,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.md,
    ...Theme.shadow.card,
  },
  tipText: {
    marginTop: Theme.spacing.sm,
    color: Colors.text.secondary,
    fontSize: Theme.fontSize.sm,
  },
  extraText: {
    color: Colors.required,
    fontSize: Theme.fontSize.sm,
  },
});

export default CalendarDemo;
