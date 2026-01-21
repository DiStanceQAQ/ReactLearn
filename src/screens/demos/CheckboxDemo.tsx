import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomCheckboxComponent from '../../components/basic/_common/CustomCheckboxComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const CheckboxDemo = () => {
  const [singleValue, setSingleValue] = useState('');
  const [groupValue, setGroupValue] = useState('option1,option2');

  const singleOptions = [
    { name: '勾选框', value: 'checked' },
  ];

  const groupOptions = [
    { name: '选项A', value: 'option1' },
    { name: '选项B', value: 'option2' },
    { name: '选项C', value: 'option3' },
    { name: '选项D', value: 'option4' },
  ];

  const disabledOptions = [
    { name: '禁用选中', value: 'disabled1' },
    { name: '禁用未选中', value: 'disabled2' },
  ];

  const sizeOptions = [
    { name: '小尺寸', value: 'small' },
    { name: '默认尺寸', value: 'normal' },
    { name: '大尺寸', value: 'large' },
  ];

  const handleSingleChange = (value: string) => {
    setSingleValue(value);
  };

  const handleGroupChange = (value: string) => {
    setGroupValue(value);
  };

  const handleDisabledChange = (value: string) => {
    // 禁用状态，不处理
  };

  const handleSizeChange = (value: string) => {
    // 尺寸演示，不处理
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
          <CustomCheckboxComponent
            label="勾选框"
            value={singleValue}
            onChange={handleSingleChange}
            setting={{
              optionItem: singleOptions,
            }}
          />
        )}

        {/* 复选框组 */}
        {renderSection(
          '复选框组',
          <CustomCheckboxComponent
            label="多选选项"
            value={groupValue}
            onChange={handleGroupChange}
            setting={{
              optionItem: groupOptions,
            }}
          />
        )}

        {/* 不同方向 */}
        {renderSection(
          '排列方向',
          <View style={styles.directionDemo}>
            <View style={styles.directionItem}>
              <Text style={styles.directionLabel}>水平排列:</Text>
              <CustomCheckboxComponent
                value="horizontal1,horizontal2"
                onChange={() => { }}
                direction="horizontal"
                setting={{
                  optionItem: [
                    { name: '选项1', value: 'horizontal1' },
                    { name: '选项2', value: 'horizontal2' },
                    { name: '选项3', value: 'horizontal3' },
                  ],
                }}
              />
            </View>

            <View style={styles.directionItem}>
              <Text style={styles.directionLabel}>垂直排列:</Text>
              <CustomCheckboxComponent
                value="vertical1"
                onChange={() => { }}
                direction="vertical"
                setting={{
                  optionItem: [
                    { name: '选项A', value: 'vertical1' },
                    { name: '选项B', value: 'vertical2' },
                    { name: '选项C', value: 'vertical3' },
                  ],
                }}
              />
            </View>
          </View>
        )}

        {/* 禁用状态 */}
        {renderSection(
          '禁用状态',
          <CustomCheckboxComponent
            label="禁用状态"
            value="disabled1"
            onChange={handleDisabledChange}
            disabled
            setting={{
              optionItem: disabledOptions,
            }}
          />
        )}

        {/* 只读状态 */}
        {renderSection(
          '只读状态',
          <CustomCheckboxComponent
            label="只读状态"
            value="readonly1,readonly2"
            onChange={() => { }}
            readonly
            setting={{
              optionItem: [
                { name: '只读选项1', value: 'readonly1' },
                { name: '只读选项2', value: 'readonly2' },
                { name: '只读选项3', value: 'readonly3' },
              ],
            }}
          />
        )}

        {/* 必填验证 */}
        {renderSection(
          '必填验证',
          <CustomCheckboxComponent
            label="必选项"
            value=""
            onChange={() => { }}
            required
            rules={[
              { required: true, message: '请至少选择一个选项' },
            ]}
            setting={{
              optionItem: [
                { name: '必选1', value: 'required1' },
                { name: '必选2', value: 'required2' },
              ],
            }}
          />
        )}

        {/* 显示结果 */}
        {renderSection(
          '当前选择结果',
          <View style={styles.result}>
            <Text style={styles.resultLabel}>单选值:</Text>
            <Text style={styles.resultValue}>
              {singleValue || '未选择'}
            </Text>
            <Text style={styles.resultLabel}>多选值:</Text>
            <Text style={styles.resultValue}>
              {groupValue || '未选择'}
            </Text>
            <Text style={styles.resultLabel}>选中数量:</Text>
            <Text style={styles.resultValue}>
              {groupValue ? groupValue.split(',').filter(Boolean).length : 0} 个
            </Text>
          </View>
        )}

        {/* 使用说明 */}
        {renderSection(
          '使用说明',
          <View style={styles.instruction}>
            <Text style={styles.instructionTitle}>Checkbox 复选框组件</Text>
            <Text style={styles.instructionText}>
              • 支持单选和多选模式{'\n'}
              • 支持水平和垂直排列{'\n'}
              • 支持禁用和只读状态{'\n'}
              • 支持必填验证规则{'\n'}
              • 值以逗号分隔的字符串形式传递
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
  directionDemo: {
    gap: Theme.spacing.lg,
  },
  directionItem: {
    gap: Theme.spacing.sm,
  },
  directionLabel: {
    fontSize: Theme.fontSize.md,
    fontWeight: 'bold',
    color: Colors.text.primary,
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
