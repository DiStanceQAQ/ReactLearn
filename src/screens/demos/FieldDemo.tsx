import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomFieldComponent from '../../components/basic/_common/CustomFieldComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const FieldDemo = () => {
  const [basicValue, setBasicValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [readonlyValue] = useState('只读内容');
  const [disabledValue] = useState('禁用内容');

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
          <CustomFieldComponent
            label="用户名"
            placeholder="请输入用户名"
            value={basicValue}
            onChange={setBasicValue}
          />
        )}

        {/* 不同类型 */}
        {renderSection(
          '输入类型',
          <View style={styles.fieldGroup}>
            <CustomFieldComponent
              label="文本输入"
              placeholder="请输入文本"
              value={textValue}
              onChange={setTextValue}
            />
            <CustomFieldComponent
              label="密码输入"
              type="password"
              placeholder="请输入密码"
              value={passwordValue}
              onChange={setPasswordValue}
            />
            <CustomFieldComponent
              label="数字输入"
              type="number"
              placeholder="请输入数字"
              value={numberValue}
              onChange={setNumberValue}
            />
          </View>
        )}

        {/* 多行文本 */}
        {renderSection(
          '多行文本',
          <CustomFieldComponent
            label="备注"
            type="textarea"
            placeholder="请输入备注信息"
            value={textareaValue}
            onChange={setTextareaValue}
            rows={4}
          />
        )}

        {/* 带图标的输入框 */}
        {renderSection(
          '带图标的输入框',
          <View style={styles.fieldGroup}>
            <CustomFieldComponent
              label="搜索"
              placeholder="搜索内容"
              leftIcon={<Text style={styles.icon}>🔍</Text>}
            />
            <CustomFieldComponent
              label="邮箱"
              placeholder="请输入邮箱"
              rightIcon={<Text style={styles.icon}>✉️</Text>}
            />
          </View>
        )}

        {/* 可清空的输入框 */}
        {renderSection(
          '可清空的输入框',
          <CustomFieldComponent
            label="可清空"
            placeholder="输入后可点击清除"
            clearable
          />
        )}

        {/* 字数限制 */}
        {renderSection(
          '字数限制',
          <View style={styles.fieldGroup}>
            <CustomFieldComponent
              label="限制字数"
              placeholder="最多输入20个字符"
              maxLength={20}
              showWordLimit
            />
            <CustomFieldComponent
              label="必填项"
              placeholder="必填字段"
              required
            />
          </View>
        )}

        {/* 不同尺寸和对齐 */}
        {renderSection(
          '对齐方式',
          <View style={styles.fieldGroup}>
            <CustomFieldComponent
              label="左对齐"
              placeholder="左对齐输入"
              inputAlign="left"
            />
            <CustomFieldComponent
              label="居中对齐"
              placeholder="居中对齐输入"
              inputAlign="center"
            />
            <CustomFieldComponent
              label="右对齐"
              placeholder="右对齐输入"
              inputAlign="right"
            />
          </View>
        )}

        {/* 状态展示 */}
        {renderSection(
          '状态展示',
          <View style={styles.fieldGroup}>
            <CustomFieldComponent
              label="只读状态"
              value={readonlyValue}
              readonly
            />
            <CustomFieldComponent
              label="禁用状态"
              value={disabledValue}
              disabled
            />
            <CustomFieldComponent
              label="错误状态"
              placeholder="请输入正确内容"
              error
              errorMessage="输入内容格式错误"
            />
          </View>
        )}

        {/* 可点击的输入框 */}
        {renderSection(
          '可点击的输入框',
          <View style={styles.fieldGroup}>
            <CustomFieldComponent
              label="选择城市"
              placeholder="点击选择城市"
              clickable
              readonly
              onClick={() => console.log('选择城市')}
              rightIcon={<Text style={styles.icon}>▼</Text>}
            />
            <CustomFieldComponent
              label="选择日期"
              placeholder="点击选择日期"
              clickable
              readonly
              onClick={() => console.log('选择日期')}
              rightIcon={<Text style={styles.icon}>📅</Text>}
            />
          </View>
        )}

        {/* 格式化器 */}
        {renderSection(
          '格式化器',
          <CustomFieldComponent
            label="自动格式化"
            placeholder="输入将自动转换为大写"
            formatter={(val) => val.toUpperCase()}
          />
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
  fieldGroup: {
    gap: Theme.spacing.lg,
  },
  icon: {
    fontSize: Theme.fontSize.lg,
  },
});
