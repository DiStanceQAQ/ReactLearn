import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { showToast, showLoadingToast, showSuccessToast, showFailToast } from '../components/basic/_common/Toast';

export const ReviewScreen = () => {
  const handleShowTextToast = () => {
    showToast('这是一条普通的文本消息');
  };

  const handleShowLoadingToast = () => {
    showLoadingToast({
      message: '正在加载中...',
      duration: 3000,
      forbidClick: true,
    });
  };

  const handleShowSuccessToast = () => {
    showSuccessToast('操作成功！');
  };

  const handleShowFailToast = () => {
    showFailToast('操作失败，请重试');
  };

  const handleShowCustomToast = () => {
    showToast({
      message: '自定义配置的Toast',
      position: 'top',
      duration: 4000,
      icon: 'info',
      iconSize: 40,
    });
  };

  const handleShowLongToast = () => {
    showToast({
      message: '这是一条很长的消息，用来测试自动换行功能。Toast组件会根据内容长度自动调整宽度，但不会超过屏幕宽度的80%。',
      position: 'bottom',
      duration: 5000,
    });
  };

  const handleShowOverlayToast = () => {
    showToast({
      message: '带遮罩的Toast',
      overlay: true,
      forbidClick: true,
      closeOnClickOverlay: true,
      duration: 10000,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toast 组件测试</Text>

      <ScrollView style={styles.buttonContainer} contentContainerStyle={styles.buttonContent}>
        <TouchableOpacity style={styles.button} onPress={handleShowTextToast}>
          <Text style={styles.buttonText}>显示文本Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShowLoadingToast}>
          <Text style={styles.buttonText}>显示加载Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShowSuccessToast}>
          <Text style={styles.buttonText}>显示成功Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShowFailToast}>
          <Text style={styles.buttonText}>显示失败Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShowCustomToast}>
          <Text style={styles.buttonText}>自定义Toast (顶部)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShowLongToast}>
          <Text style={styles.buttonText}>长文本Toast (底部)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleShowOverlayToast}>
          <Text style={styles.buttonText}>带遮罩Toast</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContent: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

