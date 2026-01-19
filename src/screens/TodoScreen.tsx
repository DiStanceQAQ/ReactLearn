import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import CustomDatePickerComponent from '../components/basic/_common/CustomDatePickerComponent';

export const TodoScreen = () => {
  const [selectedDate1, setSelectedDate1] = useState<string>('');
  const [selectedDate2, setSelectedDate2] = useState<string>('2024-01-01');
  const [selectedDate3, setSelectedDate3] = useState<string>('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>日期选择器组件测试</Text>
      </View>

      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>基础用法</Text>
        <CustomDatePickerComponent
          label="选择日期"
          placeholder="请选择日期"
          value={selectedDate1}
          onChange={setSelectedDate1}
        />
        <Text style={styles.result}>选中日期: {selectedDate1 || '未选择'}</Text>
      </View>

      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>带默认值</Text>
        <CustomDatePickerComponent
          label="默认日期"
          placeholder="请选择日期"
          value={selectedDate2}
          onChange={setSelectedDate2}
        />
        <Text style={styles.result}>选中日期: {selectedDate2}</Text>
      </View>

      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>带限制日期范围</Text>
        <CustomDatePickerComponent
          label="限制范围"
          placeholder="请选择日期"
          value={selectedDate3}
          onChange={setSelectedDate3}
          minDate={new Date('2024-01-01')}
          maxDate={new Date('2024-12-31')}
        />
        <Text style={styles.result}>选中日期: {selectedDate3 || '未选择'}</Text>
      </View>

      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>只读状态</Text>
        <CustomDatePickerComponent
          label="只读日期"
          placeholder="只读状态"
          value="2024-06-15"
          readonly={true}
        />
      </View>

      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>禁用状态</Text>
        <CustomDatePickerComponent
          label="禁用日期"
          placeholder="禁用状态"
          value="2024-06-15"
          disabled={true}
        />
      </View>

      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>必填字段</Text>
        <CustomDatePickerComponent
          label="必填日期"
          placeholder="请选择日期"
          value={selectedDate1}
          onChange={setSelectedDate1}
          required={true}
        />
        <Text style={styles.result}>选中日期: {selectedDate1 || '未选择'}</Text>
      </View>

      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>标签对齐方式</Text>
        <CustomDatePickerComponent
          label="右对齐标签"
          labelAlign="right"
          placeholder="请选择日期"
          value={selectedDate1}
          onChange={setSelectedDate1}
        />
        <Text style={styles.result}>选中日期: {selectedDate1 || '未选择'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  testSection: {
    backgroundColor: Colors.white,
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 10,
  },
  result: {
    marginTop: 10,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
});
