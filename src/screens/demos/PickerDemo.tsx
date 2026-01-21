import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomFieldComponent from '../../components/basic/_common/CustomFieldComponent';
import PopupComponent from '../../components/container/popup/PopupComponent';
import CustomPickerComponent, { PickerOption } from '../../components/basic/_common/CustomPickerComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

type PickerType = 'province' | 'date' | 'single';

// 省份城市数据
const provinceCityData: PickerOption[] = [
  {
    text: '北京市',
    value: 'beijing',
    children: [
      { text: '朝阳区', value: 'chaoyang' },
      { text: '海淀区', value: 'haidian' },
      { text: '西城区', value: 'xicheng' },
    ],
  },
  {
    text: '上海市',
    value: 'shanghai',
    children: [
      { text: '黄浦区', value: 'huangpu' },
      { text: '徐汇区', value: 'xuhui' },
      { text: '浦东新区', value: 'pudong' },
    ],
  },
  {
    text: '广东省',
    value: 'guangdong',
    children: [
      { text: '广州市', value: 'guangzhou' },
      { text: '深圳市', value: 'shenzhen' },
      { text: '珠海市', value: 'zhuhai' },
    ],
  },
];

// 日期数据
const yearData: PickerOption[] = Array.from({ length: 10 }, (_, i) => ({
  text: `${2024 + i}年`,
  value: 2024 + i,
}));

const monthData: PickerOption[] = Array.from({ length: 12 }, (_, i) => ({
  text: `${i + 1}月`,
  value: i + 1,
}));

const dayData: PickerOption[] = Array.from({ length: 31 }, (_, i) => ({
  text: `${i + 1}日`,
  value: i + 1,
}));

// 简单选择数据
const simpleOptions: PickerOption[] = [
  { text: '选项A', value: 'A' },
  { text: '选项B', value: 'B' },
  { text: '选项C', value: 'C' },
  { text: '选项D', value: 'D' },
];

export const PickerDemo = () => {
  const [provinceValue, setProvinceValue] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState<number[]>([]);
  const [singleValue, setSingleValue] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState<PickerType | null>(null);

  const getDisplayText = useCallback((type: PickerType, values: any[]) => {
    switch (type) {
      case 'province':
        if (values.length >= 2) {
          const province = provinceCityData.find(p => p.value === values[0]);
          const city = province?.children?.find(c => c.value === values[1]);
          return province && city ? `${province.text} ${city.text}` : '';
        }
        return '';
      case 'date':
        if (values.length >= 3) {
          return `${values[0]}年${values[1]}月${values[2]}日`;
        }
        return '';
      case 'single':
        if (values.length > 0) {
          const option = simpleOptions.find(opt => opt.value === values[0]);
          return option?.text || '';
        }
        return '';
      default:
        return '';
    }
  }, []);

  const getPickerProps = useCallback((type: PickerType) => {
    switch (type) {
      case 'province':
        return {
          columns: provinceCityData,
          value: provinceValue,
          onChange: (payload: any) => setProvinceValue(payload.selectedValues),
          title: '选择省市',
        };
      case 'date':
        return {
          columns: [yearData, monthData, dayData],
          value: dateValue,
          onChange: (payload: any) => setDateValue(payload.selectedValues),
          title: '选择日期',
        };
      case 'single':
        return {
          columns: [simpleOptions],
          value: singleValue,
          onChange: (payload: any) => setSingleValue(payload.selectedValues),
          title: '选择选项',
        };
    }
  }, [provinceValue, dateValue, singleValue]);

  const openPicker = useCallback((type: PickerType) => {
    setShowPicker(type);
  }, []);

  const closePicker = useCallback(() => {
    setShowPicker(null);
  }, []);

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
          <View style={styles.pickerGroup}>
            <CustomFieldComponent
              label="省市选择"
              placeholder="请选择省市"
              value={String(getDisplayText('province', provinceValue))}
              clickable={true}
              readonly={true}
              onClick={() => openPicker('province')}
              rightIcon={<Text style={styles.arrow}>▼</Text>}
            />

            <CustomFieldComponent
              label="日期选择"
              placeholder="请选择日期"
              value={String(getDisplayText('date', dateValue))}
              clickable={true}
              readonly={true}
              onClick={() => openPicker('date')}
              rightIcon={<Text style={styles.arrow}>▼</Text>}
            />

            <CustomFieldComponent
              label="单项选择"
              placeholder="请选择选项"
              value={String(getDisplayText('single', singleValue))}
              clickable={true}
              readonly={true}
              onClick={() => openPicker('single')}
              rightIcon={<Text style={styles.arrow}>▼</Text>}
            />
          </View>
        )}

        {/* 显示结果 */}
        {renderSection(
          '当前选择结果',
          <View style={styles.result}>
            <Text style={styles.resultText}>
              省市: {getDisplayText('province', provinceValue) || '未选择'}
            </Text>
            <Text style={styles.resultText}>
              日期: {getDisplayText('date', dateValue) || '未选择'}
            </Text>
            <Text style={styles.resultText}>
              选项: {getDisplayText('single', singleValue) || '未选择'}
            </Text>
          </View>
        )}
      </ScrollView>

      {showPicker && (
        <PopupComponent
          visible={true}
          position="bottom"
          round={true}
          overlay={true}
          closeOnClickOverlay={false}
          onClose={closePicker}
        >
          <CustomPickerComponent
            {...getPickerProps(showPicker)}
            onConfirm={(payload) => {
              getPickerProps(showPicker).onChange(payload);
              closePicker();
            }}
            onCancel={closePicker}
          />
        </PopupComponent>
      )}
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
  pickerGroup: {
    gap: Theme.spacing.lg,
  },
  arrow: {
    fontSize: 12,
    color: Colors.text.light,
  },
  result: {
    padding: Theme.spacing.md,
    backgroundColor: Colors.background,
    borderRadius: Theme.radius.sm,
  },
  resultText: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: Theme.spacing.xs,
  },
});
