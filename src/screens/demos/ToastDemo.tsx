import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  showToast as showTextToast,
  showLoadingToast,
  showSuccessToast,
  showFailToast,
  closeToast,
} from '../../components/basic/_common/Toast';
import ButtonComponent from '../../components/basic/button/ButtonComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const ToastDemo = () => {
  const showToastByType = (type: 'success' | 'error' | 'warning' | 'info', message: string, duration?: number) => {
    const payload = duration ? { message, duration } : { message };
    switch (type) {
      case 'success':
        showSuccessToast(payload);
        break;
      case 'error':
        showFailToast(payload);
        break;
      case 'warning':
        showTextToast({ ...payload, icon: 'warning', type: 'text' });
        break;
      default:
        showTextToast({ ...payload, icon: 'info', type: 'text' });
        break;
    }
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
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="显示成功提示"
              type="success"
              onPress={() => showToastByType('success', '操作成功！')}
            />
            <ButtonComponent
              text="显示错误提示"
              type="danger"
              onPress={() => showToastByType('error', '操作失败！')}
            />
            <ButtonComponent
              text="显示警告提示"
              type="warning"
              onPress={() => showToastByType('warning', '请注意！')}
            />
            <ButtonComponent
              text="显示信息提示"
              type="primary"
              onPress={() => showToastByType('info', '这是一条信息')}
            />
          </View>
        )}

        {/* 自定义时长 */}
        {renderSection(
          '自定义时长',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="短时显示 (1秒)"
              onPress={() => showToastByType('info', '短时显示', 1000)}
            />
            <ButtonComponent
              text="正常显示 (3秒)"
              onPress={() => showToastByType('info', '正常显示', 3000)}
            />
            <ButtonComponent
              text="长时显示 (5秒)"
              onPress={() => showToastByType('info', '长时显示', 5000)}
            />
          </View>
        )}

        {/* 长文本 */}
        {renderSection(
          '长文本提示',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="显示长文本"
              onPress={() => showToastByType('info', '这是一个很长的提示信息，用来测试Toast组件对长文本的处理能力。')}
            />
            <ButtonComponent
              text="显示超长文本"
              onPress={() => showToastByType('success', '这是一个超级长的提示信息，用来测试Toast组件对超长文本的处理能力，包括自动换行和滚动显示等功能。')}
            />
          </View>
        )}

        {/* 不同位置 */}
        {renderSection(
          '不同位置',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="顶部显示"
              onPress={() => showTextToast({
                message: '顶部提示',
                position: 'top',
              })}
            />
            <ButtonComponent
              text="中间显示"
              onPress={() => showTextToast({
                message: '中间提示',
                position: 'middle',
              })}
            />
            <ButtonComponent
              text="底部显示"
              onPress={() => showTextToast({
                message: '底部提示',
                position: 'bottom',
              })}
            />
          </View>
        )}

        {/* 加载提示 */}
        {renderSection(
          '加载提示',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="显示加载"
              onPress={() => showLoadingToast('加载中...')}
            />
            <ButtonComponent
              text="隐藏加载"
              onPress={() => closeToast()}
            />
          </View>
        )}

        {/* 使用说明 */}
        {renderSection(
          '使用说明',
          <View style={styles.instruction}>
            <Text style={styles.instructionTitle}>Toast 轻提示组件</Text>
            <Text style={styles.instructionText}>
              • 支持 success、error、warning、info 四种类型{'\n'}
              • 可自定义显示时长{'\n'}
              • 支持 top、center、bottom 三种位置{'\n'}
              • 支持加载状态显示{'\n'}
              • 自动处理长文本换行
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
  buttonGroup: {
    gap: Theme.spacing.md,
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
