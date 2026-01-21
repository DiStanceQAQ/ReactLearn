import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PopupComponent from '../../components/container/popup/PopupComponent';
import ButtonComponent from '../../components/basic/button/ButtonComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const PopupDemo = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showRound, setShowRound] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

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
              text="显示弹窗"
              onPress={() => setShowBasic(true)}
            />
          </View>
        )}

        {/* 不同位置 */}
        {renderSection(
          '不同位置',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="顶部弹出"
              onPress={() => setShowTop(true)}
            />
            <ButtonComponent
              text="底部弹出"
              onPress={() => setShowBottom(true)}
            />
            <ButtonComponent
              text="左侧弹出"
              onPress={() => setShowLeft(true)}
            />
            <ButtonComponent
              text="右侧弹出"
              onPress={() => setShowRight(true)}
            />
          </View>
        )}

        {/* 圆角弹窗 */}
        {renderSection(
          '圆角弹窗',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="圆角弹窗"
              onPress={() => setShowRound(true)}
            />
          </View>
        )}

        {/* 自定义内容 */}
        {renderSection(
          '自定义内容',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="自定义弹窗"
              onPress={() => setShowCustom(true)}
            />
          </View>
        )}

        {/* 使用说明 */}
        {renderSection(
          '使用说明',
          <View style={styles.instruction}>
            <Text style={styles.instructionTitle}>Popup 弹出层组件</Text>
            <Text style={styles.instructionText}>
              • 支持 center、top、bottom、left、right 五种位置{'\n'}
              • 支持圆角显示{'\n'}
              • 支持遮罩层和点击关闭{'\n'}
              • 支持自定义内容和样式{'\n'}
              • 支持关闭按钮和回调
            </Text>
          </View>
        )}
      </ScrollView>

      {/* 基础弹窗 */}
      <PopupComponent
        visible={showBasic}
        onClose={() => setShowBasic(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>基础弹窗</Text>
          <Text style={styles.popupText}>这是一个基础的弹出层组件示例。</Text>
          <View style={styles.popupButtons}>
            <ButtonComponent
              text="取消"
              onPress={() => setShowBasic(false)}
            />
            <ButtonComponent
              text="确定"
              type="primary"
              onPress={() => setShowBasic(false)}
            />
          </View>
        </View>
      </PopupComponent>

      {/* 顶部弹窗 */}
      <PopupComponent
        visible={showTop}
        position="top"
        round={true}
        onClose={() => setShowTop(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>顶部弹窗</Text>
          <Text style={styles.popupText}>这是从顶部弹出的弹窗。</Text>
          <ButtonComponent
            text="关闭"
            onPress={() => setShowTop(false)}
          />
        </View>
      </PopupComponent>

      {/* 底部弹窗 */}
      <PopupComponent
        visible={showBottom}
        position="bottom"
        round={true}
        onClose={() => setShowBottom(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>底部弹窗</Text>
          <Text style={styles.popupText}>这是从底部弹出的弹窗。</Text>
          <ButtonComponent
            text="关闭"
            onPress={() => setShowBottom(false)}
          />
        </View>
      </PopupComponent>

      {/* 左侧弹窗 */}
      <PopupComponent
        visible={showLeft}
        position="left"
        onClose={() => setShowLeft(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>左侧弹窗</Text>
          <Text style={styles.popupText}>这是从左侧弹出的弹窗。</Text>
          <ButtonComponent
            text="关闭"
            onPress={() => setShowLeft(false)}
          />
        </View>
      </PopupComponent>

      {/* 右侧弹窗 */}
      <PopupComponent
        visible={showRight}
        position="right"
        onClose={() => setShowRight(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>右侧弹窗</Text>
          <Text style={styles.popupText}>这是从右侧弹出的弹窗。</Text>
          <ButtonComponent
            text="关闭"
            onPress={() => setShowRight(false)}
          />
        </View>
      </PopupComponent>

      {/* 圆角弹窗 */}
      <PopupComponent
        visible={showRound}
        round={true}
        onClose={() => setShowRound(false)}
      >
        <View style={styles.popupContent}>
          <Text style={styles.popupTitle}>圆角弹窗</Text>
          <Text style={styles.popupText}>这是一个带有圆角的弹窗。</Text>
          <ButtonComponent
            text="关闭"
            onPress={() => setShowRound(false)}
          />
        </View>
      </PopupComponent>

      {/* 自定义弹窗 */}
      <PopupComponent
        visible={showCustom}
        round={true}
        closeable={true}
        onClose={() => setShowCustom(false)}
      >
        <View style={styles.customPopupContent}>
          <Text style={styles.popupTitle}>自定义弹窗</Text>
          <View style={styles.customOptions}>
            <ButtonComponent
              text="选项1"
              block
              onPress={() => console.log('选项1')}
            />
            <ButtonComponent
              text="选项2"
              block
              onPress={() => console.log('选项2')}
            />
            <ButtonComponent
              text="选项3"
              block
              onPress={() => console.log('选项3')}
            />
          </View>
          <ButtonComponent
            text="取消"
            type="danger"
            block
            onPress={() => setShowCustom(false)}
          />
        </View>
      </PopupComponent>
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
  popupContent: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    minWidth: 280,
  },
  popupTitle: {
    fontSize: Theme.fontSize.xl,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Theme.spacing.md,
  },
  popupText: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    lineHeight: 20,
  },
  popupButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  customPopupContent: {
    padding: Theme.spacing.xl,
    minWidth: 300,
  },
  customOptions: {
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
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
