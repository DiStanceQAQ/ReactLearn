import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomCascaderComponent from '../../components/basic/_common/CustomCascaderComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const CascaderDemo = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [displayText, setDisplayText] = useState('');

  // 级联数据
  const cascaderData = [
    {
      text: '北京市',
      value: 'beijing',
      children: [
        {
          text: '朝阳区',
          value: 'chaoyang',
          children: [
            { text: '三里屯', value: 'sanlitun' },
            { text: '国贸', value: 'guomao' },
            { text: '望京', value: 'wangjing' },
          ],
        },
        {
          text: '海淀区',
          value: 'haidian',
          children: [
            { text: '中关村', value: 'zhongguancun' },
            { text: '五道口', value: 'wudaokou' },
            { text: '清华园', value: 'qinghuayuan' },
          ],
        },
      ],
    },
    {
      text: '上海市',
      value: 'shanghai',
      children: [
        {
          text: '浦东新区',
          value: 'pudong',
          children: [
            { text: '陆家嘴', value: 'lujiazui' },
            { text: '张江', value: 'zhangjiang' },
          ],
        },
        {
          text: '徐汇区',
          value: 'xuhui',
          children: [
            { text: '徐家汇', value: 'xujiahui' },
            { text: '衡山路', value: 'hengshanlu' },
          ],
        },
      ],
    },
    {
      text: '广东省',
      value: 'guangdong',
      children: [
        {
          text: '广州市',
          value: 'guangzhou',
          children: [
            { text: '天河区', value: 'tianhe' },
            { text: '越秀区', value: 'yuexiu' },
            { text: '海珠区', value: 'haizhu' },
          ],
        },
        {
          text: '深圳市',
          value: 'shenzhen',
          children: [
            { text: '南山区', value: 'nanshan' },
            { text: '福田区', value: 'futian' },
            { text: '罗湖区', value: 'luohu' },
          ],
        },
      ],
    },
  ];

  const handleChange = (value: string, displayText?: string) => {
    setSelectedValue(value);
    if (displayText) {
      setDisplayText(displayText);
    }
  };

  const handleFinish = (value: string, displayText?: string) => {
    console.log('选择完成:', value, displayText);
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
          <CustomCascaderComponent
            label="选择地区"
            value={selectedValue}
            onChange={handleChange}
            placeholder="请选择地区"
            setting={{
              optionItem: cascaderData,
              fieldNames: { text: "text", value: "value", children: "children" },
            }}
          />
        )}

        {/* 显示结果 */}
        {renderSection(
          '当前选择结果',
          <View style={styles.result}>
            <Text style={styles.resultLabel}>选中值:</Text>
            <Text style={styles.resultValue}>
              {selectedValue || '未选择'}
            </Text>
            <Text style={styles.resultLabel}>显示文本:</Text>
            <Text style={styles.resultValue}>
              {displayText || '未选择'}
            </Text>
          </View>
        )}

        {/* 使用说明 */}
        {renderSection(
          '使用说明',
          <View style={styles.instruction}>
            <Text style={styles.instructionTitle}>Cascader 级联选择组件</Text>
            <Text style={styles.instructionText}>
              • 支持多级联动选择{'\n'}
              • 支持自定义数据结构{'\n'}
              • 提供选择变化和完成回调{'\n'}
              • 支持默认值设置{'\n'}
              • 自动处理级联逻辑
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
  cascaderContainer: {
    // Cascader组件的样式
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
