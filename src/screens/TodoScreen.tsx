import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import PopupComponent from '../components/container/popup/PopupComponent';

export const TodoScreen = () => {
  // 基础弹窗测试
  const [centerVisible, setCenterVisible] = useState(false);
  const [topVisible, setTopVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  // 样式弹窗测试
  const [roundVisible, setRoundVisible] = useState(false);
  const [noOverlayVisible, setNoOverlayVisible] = useState(false);
  const [closeableVisible, setCloseableVisible] = useState(false);
  const [customIconVisible, setCustomIconVisible] = useState(false);
  const [customStyleVisible, setCustomStyleVisible] = useState(false);

  // 新增动画效果测试
  const [fadeVisible, setFadeVisible] = useState(false);
  const [scaleVisible, setScaleVisible] = useState(false);
  const [multiLayerVisible, setMultiLayerVisible] = useState(false);

  const renderButton = (title: string, onPress: () => void, color?: string) => (
    <TouchableOpacity
      style={[styles.button, color ? { backgroundColor: color } : null]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PopupComponent 增强功能测试</Text>
        <Text style={styles.subtitle}>体验流畅的动画效果和丰富的功能</Text>
      </View>

      {/* 基础位置测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>📍 基础位置</Text>
        <Text style={styles.description}>测试不同弹出位置的布局和动画效果</Text>
        <View style={styles.buttonRow}>
          {renderButton('居中弹窗', () => setCenterVisible(true))}
          {renderButton('顶部弹窗', () => setTopVisible(true))}
        </View>
        <View style={styles.buttonRow}>
          {renderButton('底部弹窗', () => setBottomVisible(true))}
          {renderButton('左侧弹窗', () => setLeftVisible(true))}
        </View>
        <View style={styles.buttonRow}>
          {renderButton('右侧弹窗', () => setRightVisible(true))}
        </View>
      </View>

      {/* 样式和交互测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>🎨 样式和交互</Text>
        <Text style={styles.description}>测试圆角、遮罩、关闭按钮等样式功能</Text>
        <View style={styles.buttonRow}>
          {renderButton('圆角弹窗', () => setRoundVisible(true))}
          {renderButton('无遮罩弹窗', () => setNoOverlayVisible(true))}
        </View>
        <View style={styles.buttonRow}>
          {renderButton('可关闭弹窗', () => setCloseableVisible(true))}
          {renderButton('自定义图标', () => setCustomIconVisible(true))}
        </View>
        <View style={styles.buttonRow}>
          {renderButton('自定义样式', () => setCustomStyleVisible(true))}
        </View>
      </View>

      {/* 动画效果测试 */}
      <View style={styles.testSection}>
        <Text style={styles.sectionTitle}>✨ 动画效果</Text>
        <Text style={styles.description}>体验增强的动画系统和缓动效果</Text>
        <View style={styles.buttonRow}>
          {renderButton('淡入淡出', () => setFadeVisible(true), '#FF9800')}
          {renderButton('缩放动画', () => setScaleVisible(true), '#4CAF50')}
        </View>
        <View style={styles.buttonRow}>
          {renderButton('多层弹窗', () => setMultiLayerVisible(true), '#9C27B0')}
        </View>
      </View>

      {/* 居中弹窗 */}
      <PopupComponent
        visible={centerVisible}
        onClose={() => setCenterVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>居中弹窗</Text>
          <Text style={styles.popupText}>这是一个居中的弹窗组件</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCenterVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 顶部弹窗 */}
      <PopupComponent
        visible={topVisible}
        position="top"
        round={true}
        onClose={() => setTopVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>顶部弹窗</Text>
          <Text style={styles.popupText}>从顶部滑出的弹窗</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setTopVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 底部弹窗 */}
      <PopupComponent
        visible={bottomVisible}
        position="bottom"
        round={true}
        onClose={() => setBottomVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>底部弹窗</Text>
          <Text style={styles.popupText}>从底部滑出的弹窗</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setBottomVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 左侧弹窗 */}
      <PopupComponent
        visible={leftVisible}
        position="left"
        onClose={() => setLeftVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>左侧弹窗</Text>
          <Text style={styles.popupText}>从左侧滑出的弹窗</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setLeftVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 右侧弹窗 */}
      <PopupComponent
        visible={rightVisible}
        position="right"
        onClose={() => setRightVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>右侧弹窗</Text>
          <Text style={styles.popupText}>从右侧滑出的弹窗</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setRightVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 圆角弹窗 */}
      <PopupComponent
        visible={roundVisible}
        round={true}
        onClose={() => setRoundVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>圆角弹窗</Text>
          <Text style={styles.popupText}>带有圆角样式的弹窗</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setRoundVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 无遮罩弹窗 */}
      <PopupComponent
        visible={noOverlayVisible}
        overlay={false}
        onClose={() => setNoOverlayVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>无遮罩弹窗</Text>
          <Text style={styles.popupText}>没有背景遮罩的弹窗</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setNoOverlayVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 可关闭弹窗 */}
      <PopupComponent
        visible={closeableVisible}
        closeable={true}
        onClose={() => setCloseableVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>可关闭弹窗</Text>
          <Text style={styles.popupText}>右上角有关闭按钮</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCloseableVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 自定义图标弹窗 */}
      <PopupComponent
        visible={customIconVisible}
        closeable={true}
        closeIcon={<Text style={{ fontSize: 20 }}>✕</Text>}
        closeIconPosition="top-left"
        onClose={() => setCustomIconVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>自定义关闭图标</Text>
          <Text style={styles.popupText}>左上角的自定义关闭图标</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCustomIconVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 自定义样式弹窗 */}
      <PopupComponent
        visible={customStyleVisible}
        contentStyle={{
          backgroundColor: '#f0f8ff',
          borderWidth: 2,
          borderColor: Colors.primary
        }}
        overlayStyle={{
          backgroundColor: 'rgba(25, 118, 210, 0.3)'
        }}
        onClose={() => setCustomStyleVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={[styles.popupTitle, { color: Colors.primary }]}>自定义样式</Text>
          <Text style={styles.popupText}>带有自定义背景色和边框的弹窗</Text>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: Colors.primary }]}
            onPress={() => setCustomStyleVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 淡入淡出动画弹窗 */}
      <PopupComponent
        visible={fadeVisible}
        onClose={() => setFadeVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={[styles.popupTitle, { color: '#FF9800' }]}>✨ 淡入淡出动画</Text>
          <Text style={styles.popupText}>体验流畅的透明度过渡效果</Text>
          <View style={styles.animationDemo}>
            <Text style={styles.demoText}>• 使用 Easing.out(Easing.quad) 缓动</Text>
            <Text style={styles.demoText}>• 160ms 动画时长</Text>
            <Text style={styles.demoText}>• 原生驱动优化性能</Text>
          </View>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: '#FF9800' }]}
            onPress={() => setFadeVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 缩放动画弹窗 */}
      <PopupComponent
        visible={scaleVisible}
        onClose={() => setScaleVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={[styles.popupTitle, { color: '#4CAF50' }]}>🔍 缩放动画</Text>
          <Text style={styles.popupText}>居中弹窗的弹性缩放效果</Text>
          <View style={styles.animationDemo}>
            <Text style={styles.demoText}>• Spring 弹性动画</Text>
            <Text style={styles.demoText}>• friction: 8</Text>
            <Text style={styles.demoText}>• 从 0.9 缩放到 1.0</Text>
          </View>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => setScaleVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>

      {/* 多层弹窗演示 */}
      <PopupComponent
        visible={multiLayerVisible}
        onClose={() => setMultiLayerVisible(false)}
      >
        <View style={styles.popupContent}>
          <Text style={[styles.popupTitle, { color: '#9C27B0' }]}>🎭 多层动画</Text>
          <Text style={styles.popupText}>同时运行多种动画类型</Text>
          <View style={styles.animationDemo}>
            <Text style={styles.demoText}>• 平移 + 透明度</Text>
            <Text style={styles.demoText}>• 缩放 + 透明度</Text>
            <Text style={styles.demoText}>• 遮罩透明度渐变</Text>
            <Text style={styles.demoText}>• 全部并行执行</Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.miniButton, { backgroundColor: '#FF9800' }]}
              onPress={() => {
                setMultiLayerVisible(false);
                setTimeout(() => setCenterVisible(true), 300);
              }}
            >
              <Text style={styles.miniButtonText}>居中弹窗</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.miniButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => {
                setMultiLayerVisible(false);
                setTimeout(() => setRoundVisible(true), 300);
              }}
            >
              <Text style={styles.miniButtonText}>圆角弹窗</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: '#9C27B0', marginTop: 10 }]}
            onPress={() => setMultiLayerVisible(false)}
          >
            <Text style={styles.closeButtonText}>关闭</Text>
          </TouchableOpacity>
        </View>
      </PopupComponent>
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
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 5,
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
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 15,
    lineHeight: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: Theme.radius.sm,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  popupContent: {
    padding: Theme.spacing.lg,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Theme.spacing.sm,
  },
  popupText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.radius.sm,
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  animationDemo: {
    backgroundColor: '#f8f9fa',
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.sm,
    marginVertical: Theme.spacing.sm,
  },
  demoText: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 2,
    lineHeight: 16,
  },
  miniButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Theme.radius.sm,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  miniButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});