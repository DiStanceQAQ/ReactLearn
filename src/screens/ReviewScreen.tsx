import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import CustomFieldComponent from '../components/basic/_common/CustomFieldComponent';
import CustomPickerComponent, { PickerOption } from '../components/basic/_common/CustomPickerComponent';
import PopupComponent from '../components/container/popup/PopupComponent';

type PickerType = 'province' | 'date' | 'single';

type PickerContentProps = {
  pickerType: PickerType;
  getPickerProps: (type: PickerType) => any;
};

const PickerContent = ({ pickerType, getPickerProps }: PickerContentProps) => {
  const props = getPickerProps(pickerType);
  return <CustomPickerComponent {...props} />;
};

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

type PickerValueArr = PickerOption["value"][];
type DraftSelection = Partial<Record<PickerType, PickerValueArr>>;

export const ReviewScreen = () => {
  const [provinceValue, setProvinceValue] = useState<PickerValueArr>([]);
  const [dateValue, setDateValue] = useState<PickerValueArr>([]);
  const [singleValue, setSingleValue] = useState<PickerValueArr>([]);
  const [showPicker, setShowPicker] = useState<PickerType | null>(null);
  const [draftSelection, setDraftSelection] = useState<DraftSelection>({});

  const getCommittedValue = useCallback(
    (type: PickerType): PickerValueArr => {
      switch (type) {
        case 'province':
          return provinceValue;
        case 'date':
          return dateValue;
        case 'single':
          return singleValue;
        default:
          return [];
      }
    },
    [dateValue, provinceValue, singleValue]
  );

  const getActiveValue = useCallback(
    (type: PickerType): PickerValueArr => {
      if (showPicker === type) {
        return (draftSelection[type] as PickerValueArr | undefined) ?? getCommittedValue(type);
      }
      return getCommittedValue(type);
    },
    [draftSelection, getCommittedValue, showPicker]
  );

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

  const handlePickerConfirm = useCallback(
    (type: PickerType, payload?: any) => {
      const nextValues =
        (payload?.selectedValues as PickerValueArr | undefined) ??
        (draftSelection[type] as PickerValueArr | undefined) ??
        getCommittedValue(type);

      switch (type) {
        case 'province':
          setProvinceValue(nextValues);
          break;
        case 'date':
          setDateValue(nextValues);
          break;
        case 'single':
          setSingleValue(nextValues);
          break;
      }

      setDraftSelection(prev => {
        const next = { ...prev };
        delete next[type];
        return next;
      });
      setShowPicker(null);
    },
    [draftSelection, getCommittedValue]
  );

  const handlePickerCancel = useCallback((type: PickerType) => {
    setDraftSelection(prev => {
      const next = { ...prev };
      delete next[type];
      return next;
    });
    setShowPicker(null);
  }, []);

  const openPicker = useCallback(
    (type: PickerType) => {
      setDraftSelection(prev => ({ ...prev, [type]: getCommittedValue(type) }));
      setShowPicker(type);
    },
    [getCommittedValue]
  );

  const handlePopupClose = useCallback(() => {
    if (showPicker) {
      handlePickerCancel(showPicker);
    }
  }, [handlePickerCancel, showPicker]);

  const getPickerProps = useCallback((type: PickerType) => {
    switch (type) {
      case 'province':
        return {
          columns: provinceCityData,
          value: getActiveValue('province'),
          onChange: (payload: any) =>
            setDraftSelection(prev => ({ ...prev, province: payload.selectedValues })),
          onConfirm: (payload: any) => handlePickerConfirm('province', payload),
          onCancel: () => handlePickerCancel('province'),
          title: '选择省市',
        };
      case 'date':
        return {
          columns: [yearData, monthData, dayData],
          value: getActiveValue('date'),
          onChange: (payload: any) => setDraftSelection(prev => ({ ...prev, date: payload.selectedValues })),
          onConfirm: (payload: any) => handlePickerConfirm('date', payload),
          onCancel: () => handlePickerCancel('date'),
          title: '选择日期',
        };
      case 'single':
        return {
          columns: [simpleOptions],
          value: getActiveValue('single'),
          onChange: (payload: any) => setDraftSelection(prev => ({ ...prev, single: payload.selectedValues })),
          onConfirm: (payload: any) => handlePickerConfirm('single', payload),
          onCancel: () => handlePickerCancel('single'),
          title: '选择选项',
        };
    }
  }, [getActiveValue, handlePickerCancel, handlePickerConfirm]);

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Picker组件测试表单</Text>

        <View style={styles.form}>
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

        <View style={styles.result}>
          <Text style={styles.resultTitle}>当前选择结果：</Text>
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
      </ScrollView>

      {showPicker && (
        <PopupComponent
          visible={true}
          position="bottom"
          round={true}
          overlay={true}
          closeOnClickOverlay={false}
          onClose={handlePopupClose}
        >
          <PickerContent pickerType={showPicker} getPickerProps={getPickerProps} />
        </PopupComponent>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    padding: 20,
  },
  form: {
    padding: 20,
    gap: 16,
  },
  arrow: {
    fontSize: 12,
    color: Colors.text.light,
  },
  result: {
    padding: 20,
    backgroundColor: Colors.white,
    margin: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  resultText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
});

