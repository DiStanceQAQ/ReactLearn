import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormComponent from '../../components/container/form/FormComponent';
import CustomFieldComponent from '../../components/basic/_common/CustomFieldComponent';
import CustomCheckboxComponent from '../../components/basic/_common/CustomCheckboxComponent';
import ButtonComponent from '../../components/basic/button/ButtonComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

interface FormData {
  username: string;
  password: string;
  email: string;
  phone: string;
  gender: string;
  agree: boolean;
  bio: string;
}

export const FormDemo = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
    agree: false,
    bio: '',
  });
  const [submitResult, setSubmitResult] = useState<string>('');

  const handleFieldChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const val = formData;

    const checkRequired = (key: keyof FormData, msg: string) => {
      if (val[key] === undefined || val[key] === null || val[key] === '' || val[key] === false) {
        errors[key] = msg;
      }
    };

    checkRequired('username', '请输入用户名');
    if (val.username && val.username.length < 3) errors.username = '用户名至少3个字符';
    if (val.username && val.username.length > 20) errors.username = '用户名最多20个字符';

    checkRequired('password', '请输入密码');
    if (val.password && val.password.length < 6) errors.password = '密码至少6个字符';

    checkRequired('email', '请输入邮箱');
    if (val.email && !/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(val.email)) errors.email = '请输入正确的邮箱格式';

    checkRequired('phone', '请输入手机号');
    if (val.phone && !/^1[3-9]\d{9}$/.test(val.phone)) errors.phone = '请输入正确的手机号';

    if (!val.agree) errors.agree = '请同意用户协议';

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setSubmitResult(`验证失败: ${JSON.stringify(errors, null, 2)}`);
      return;
    }
    setSubmitResult(`提交成功: ${JSON.stringify(formData, null, 2)}`);
    console.log('表单数据:', formData);
  };

  const handleReset = () => {
    setFormData({
      username: '',
      password: '',
      email: '',
      phone: '',
      gender: '',
      agree: false,
      bio: '',
    });
    setSubmitResult('');
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
        {/* 表单示例 */}
        {renderSection(
          '表单示例',
          <FormComponent
          >
            <CustomFieldComponent
              label="用户名"
              placeholder="请输入用户名"
              value={formData.username}
              onChange={(value) => handleFieldChange('username', value)}
            />

            <CustomFieldComponent
              label="密码"
              type="password"
              placeholder="请输入密码"
              value={formData.password}
              onChange={(value) => handleFieldChange('password', value)}
            />

            <CustomFieldComponent
              label="邮箱"
              placeholder="请输入邮箱"
              value={formData.email}
              onChange={(value) => handleFieldChange('email', value)}
            />

            <CustomFieldComponent
              label="手机号"
              placeholder="请输入手机号"
              value={formData.phone}
              onChange={(value) => handleFieldChange('phone', value)}
            />

            <CustomFieldComponent
              label="个人简介"
              type="textarea"
              placeholder="请输入个人简介"
              value={formData.bio}
              onChange={(value) => handleFieldChange('bio', value)}
              rows={3}
            />

            <View style={styles.checkboxContainer}>
              <CustomCheckboxComponent
                value={formData.agree ? 'agree' : ''}
                onChange={(val) => handleFieldChange('agree', Boolean(val))}
                setting={{
                  optionItem: [{ name: '我同意用户协议', value: 'agree' }],
                }}
              />
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComponent
                text="提交"
                type="primary"
                onPress={handleSubmit}
              />
              <ButtonComponent
                text="重置"
                onPress={handleReset}
              />
            </View>
          </FormComponent>
        )}

        {/* 提交结果 */}
        {submitResult && renderSection(
          '提交结果',
          <View style={styles.result}>
            <Text style={styles.resultText}>{submitResult}</Text>
          </View>
        )}

        {/* 使用说明 */}
        {renderSection(
          '使用说明',
          <View style={styles.instruction}>
            <Text style={styles.instructionTitle}>Form 表单组件</Text>
            <Text style={styles.instructionText}>
              • 支持字段验证规则{'\n'}
              • 提供表单数据管理{'\n'}
              • 支持字段联动和监听{'\n'}
              • 提供表单重置功能{'\n'}
              • 支持异步验证
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
  checkboxContainer: {
    marginVertical: Theme.spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
  },
  result: {
    padding: Theme.spacing.md,
    backgroundColor: Colors.background,
    borderRadius: Theme.radius.sm,
  },
  resultText: {
    fontSize: Theme.fontSize.sm,
    color: Colors.text.secondary,
    fontFamily: 'monospace',
    lineHeight: 16,
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
