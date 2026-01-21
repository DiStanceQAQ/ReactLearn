import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomDatePickerComponent from '../../components/basic/_common/CustomDatePickerComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const DatePickerDemo = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (dateString: string) => {
    setSelectedDate(dateString);
  };

  const getDisplayText = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  };

  const renderSection = (title: string, content: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {content}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 基础用法 */}
        {renderSection(
          '基础用法',
          <CustomDatePickerComponent
            label="选择日期"
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="请选择日期"
          />
        )}

        {/* 限制范围 */}
        {renderSection(
          '日期范围限制',
          <View style={styles.datepickerContainer}>
            <CustomDatePickerComponent
              label="2020-2030年"
              value={selectedDate}
              onChange={handleDateChange}
              minDate={new Date(2020, 0, 1)}
              maxDate={new Date(2030, 11, 31)}
              placeholder="2020-2030年范围内"
            />
            <CustomDatePickerComponent
              label="今天之后"
              value={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              placeholder="今天之后"
            />
          </View>
        )}

        {/* 必填验证 */}
        {renderSection(
          '必填验证',
          <CustomDatePickerComponent
            label="必选日期"
            value={selectedDate}
            onChange={handleDateChange}
            required
            placeholder="请选择必填日期"
          />
        )}

        {/* 只读状态 */}
        {renderSection(
          '只读状态',
          <CustomDatePickerComponent
            label="只读日期"
            value="2024-01-15"
            onChange={() => { }}
            readonly
            placeholder="只读状态"
          />
        )}

        {/* 显示结果 */}
        {renderSection(
          '当前选择结果',
          <View style={styles.result}>
            <Text style={styles.resultLabel}>选中日期:</Text>
            <Text style={styles.resultValue}>
              {getDisplayText(selectedDate) || '未选择'}
            </Text>
            <Text style={styles.resultLabel}>日期字符串:</Text>
            <Text style={styles.resultValue}>
              {selectedDate || '无'}
            </Text>
          </View>
        )}

        {/* 使用说明 */}
        {renderSection(
          '使用说明',
          <View style={styles.instruction}>
            <Text style={styles.instructionTitle}>DatePicker 日期选择器组件</Text>
            <Text style={styles.instructionText}>
              • 支持多种日期格式显示{'\n'}
              • 支持最小/最大日期限制{'\n'}
              • 提供选择变化、确认、取消回调{'\n'}
              • 支持默认值设置{'\n'}
              • 移动端优化的日期选择体验
            </Text>
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
  datepickerContainer: {
    gap: Theme.spacing.lg,
  },
  result: {
    padding: Theme.spacing.md,
    backgroundColor: Colors.background,
    borderRadius: Theme.radius.sm,
  },
  resultLabel: {
    fontSize: Theme.fontSize.md,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Theme.spacing.xs,
    marginTop: Theme.spacing.sm,
  },
  resultValue: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: Theme.spacing.xs,
  },
  instruction: {
    padding: Theme.spacing.md,
    backgroundColor: Colors.background,
    borderRadius: Theme.radius.sm,
  },
  instructionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  instructionText: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});
