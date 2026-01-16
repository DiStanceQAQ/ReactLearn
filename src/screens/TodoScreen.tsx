import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import CustomCascaderComponent from '../components/basic/_common/CustomCascaderComponent';

export const TodoScreen = () => {
  const insets = useSafeAreaInsets();

  // 测试状态
  const [selectedValue1, setSelectedValue1] = useState<string>('');
  const [selectedValue2, setSelectedValue2] = useState<string>('');
  const [selectedValue3, setSelectedValue3] = useState<string>('');
  const [selectedValue4, setSelectedValue4] = useState<string>('');

  // 测试数据1：地区选择
  const regionOptions = [
    {
      value: 'guangdong',
      name: '广东省',
      children: [
        {
          value: 'shenzhen',
          name: '深圳市',
          children: [
            { value: 'nanshan', name: '南山区' },
            { value: 'futian', name: '福田区' },
            { value: 'luohu', name: '罗湖区' },
          ],
        },
        {
          value: 'guangzhou',
          name: '广州市',
          children: [
            { value: 'tianhe', name: '天河区' },
            { value: 'yuexiu', name: '越秀区' },
            { value: 'haizhu', name: '海珠区' },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      name: '江苏省',
      children: [
        {
          value: 'nanjing',
          name: '南京市',
          children: [
            { value: 'xuanwu', name: '玄武区' },
            { value: 'gulou', name: '鼓楼区' },
          ],
        },
      ],
    },
  ];

  // 测试数据2：分类选择
  const categoryOptions = [
    {
      value: 'tech',
      name: '科技',
      children: [
        {
          value: 'frontend',
          name: '前端开发',
          children: [
            { value: 'react', name: 'React' },
            { value: 'vue', name: 'Vue' },
            { value: 'angular', name: 'Angular' },
          ],
        },
        {
          value: 'backend',
          name: '后端开发',
          children: [
            { value: 'nodejs', name: 'Node.js' },
            { value: 'python', name: 'Python' },
            { value: 'java', name: 'Java' },
          ],
        },
      ],
    },
    {
      value: 'design',
      name: '设计',
      children: [
        {
          value: 'ui',
          name: 'UI设计',
          children: [
            { value: 'web', name: 'Web设计' },
            { value: 'mobile', name: '移动设计' },
          ],
        },
      ],
    },
  ];

  // 测试数据3：简单的两级选择
  const simpleOptions = [
    {
      value: 'fruit',
      name: '水果',
      children: [
        { value: 'apple', name: '苹果' },
        { value: 'banana', name: '香蕉' },
        { value: 'orange', name: '橙子' },
      ],
    },
    {
      value: 'vegetable',
      name: '蔬菜',
      children: [
        { value: 'carrot', name: '胡萝卜啊啊啊啊啊' },
        { value: 'tomato', name: '番茄' },
        { value: 'potato', name: '土豆' },
      ],
    },
  ];

  // 自定义字段名的测试数据
  const customFieldOptions = [
    {
      id: 'level1',
      label: '一级选项',
      subs: [
        {
          id: 'level2',
          label: '二级选项',
          subs: [
            { id: 'level3', label: '三级选项' },
          ],
        },
      ],
    },
  ];

  const handleChange = (setter: (value: string) => void, testName: string) =>
    (value: string, displayText?: string) => {
      setter(value);
      Alert.alert(
        `${testName} - 选择结果`,
        `值: ${value}\n显示文本: ${displayText || '无'}`,
        [{ text: '确定' }]
      );
    };

  const clearAll = () => {
    setSelectedValue1('');
    setSelectedValue2('');
    setSelectedValue3('');
    setSelectedValue4('');
    Alert.alert('成功', '已清除所有选择');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>级联选择器测试</Text>
        <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>清除全部</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 测试1：基本地区选择 */}
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>🗺️ 地区选择（默认配置）</Text>
          <CustomCascaderComponent
            label="选择地区"
            placeholder="请选择地区"
            value={selectedValue1}
            onChange={handleChange(setSelectedValue1, '地区选择')}
            setting={{ optionItem: regionOptions }}
          />
          <Text style={styles.result}>当前选择: {selectedValue1 || '未选择'}</Text>
        </View>

        {/* 测试2：分类选择（自定义样式） */}
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>💻 技术分类（自定义样式）</Text>
          <CustomCascaderComponent
            label="选择技术"
            placeholder="请选择技术栈"
            value={selectedValue2}
            onChange={handleChange(setSelectedValue2, '技术分类')}
            activeColor="#FF6B35"
            title="选择您擅长的技术"
            setting={{ optionItem: categoryOptions }}
          />
          <Text style={styles.result}>当前选择: {selectedValue2 || '未选择'}</Text>
        </View>

        {/* 测试3：简单选择（两级） */}
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>🍎 简单选择（两级）</Text>
          <CustomCascaderComponent
            label="选择食物"
            placeholder="请选择食物"
            value={selectedValue3}
            onChange={handleChange(setSelectedValue3, '食物选择')}
            required={true}
            setting={{ optionItem: simpleOptions }}
          />
          <Text style={styles.result}>当前选择: {selectedValue3 || '未选择'}</Text>
        </View>

        {/* 测试4：自定义字段名 */}
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>🔧 自定义字段名</Text>
          <CustomCascaderComponent
            label="自定义字段"
            placeholder="测试自定义字段名"
            value={selectedValue4}
            onChange={handleChange(setSelectedValue4, '自定义字段')}
            setting={{
              optionItem: customFieldOptions,
              fieldNames: {
                text: 'label',
                value: 'id',
                children: 'subs'
              }
            }}
          />
          <Text style={styles.result}>当前选择: {selectedValue4 || '未选择'}</Text>
        </View>

        {/* 状态测试 */}
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>📊 状态测试</Text>

          <Text style={styles.subTitle}>禁用状态：</Text>
          <CustomCascaderComponent
            label="禁用选择"
            placeholder="这个被禁用了"
            disabled={true}
            setting={{ optionItem: simpleOptions }}
          />

          <Text style={styles.subTitle}>只读状态：</Text>
          <CustomCascaderComponent
            label="只读选择"
            placeholder="这个是只读的"
            readonly={true}
            value="fruit"
            setting={{ optionItem: simpleOptions }}
          />
        </View>

        {/* 布局测试 */}
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>📐 布局测试</Text>

          <Text style={styles.subTitle}>标签右对齐：</Text>
          <CustomCascaderComponent
            label="标签右对齐"
            boxStyle={{ width: 100 }}
            labelAlign="right"
            placeholder="测试对齐"
            setting={{ optionItem: simpleOptions }}
          />

          <Text style={styles.subTitle}>输入框居中：</Text>
          <CustomCascaderComponent
            label="输入居中"
            inputAlign="center"
            placeholder="输入内容居中"
            setting={{ optionItem: simpleOptions }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  clearButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  testSection: {
    backgroundColor: Colors.white,
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
    marginTop: 10,
    marginBottom: 5,
  },
  result: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.text.light,
    fontStyle: 'italic',
  },
});