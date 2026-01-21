import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ButtonComponent, { ButtonType, ButtonSize } from '../../components/basic/button/ButtonComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const ButtonDemo = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handlePress = (text: string) => {
    console.log(`Button pressed: ${text}`);
  };

  const handleLoadingPress = async () => {
    setLoading(true);
    // 模拟异步操作
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
              text="默认按钮"
              onPress={() => handlePress('默认按钮')}
            />
            <ButtonComponent
              text="主要按钮"
              type="primary"
              onPress={() => handlePress('主要按钮')}
            />
            <ButtonComponent
              text="成功按钮"
              type="success"
              onPress={() => handlePress('成功按钮')}
            />
            <ButtonComponent
              text="警告按钮"
              type="warning"
              onPress={() => handlePress('警告按钮')}
            />
            <ButtonComponent
              text="危险按钮"
              type="danger"
              onPress={() => handlePress('危险按钮')}
            />
          </View>
        )}

        {/* 按钮尺寸 */}
        {renderSection(
          '按钮尺寸',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="大号按钮"
              type="primary"
              size="large"
              onPress={() => handlePress('大号按钮')}
            />
            <ButtonComponent
              text="普通按钮"
              type="primary"
              size="normal"
              onPress={() => handlePress('普通按钮')}
            />
            <ButtonComponent
              text="小号按钮"
              type="primary"
              size="small"
              onPress={() => handlePress('小号按钮')}
            />
            <ButtonComponent
              text="迷你按钮"
              type="primary"
              size="mini"
              onPress={() => handlePress('迷你按钮')}
            />
          </View>
        )}

        {/* 按钮形状 */}
        {renderSection(
          '按钮形状',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="方形按钮"
              type="primary"
              square
              onPress={() => handlePress('方形按钮')}
            />
            <ButtonComponent
              text="圆角按钮"
              type="primary"
              round
              onPress={() => handlePress('圆角按钮')}
            />
          </View>
        )}

        {/* 按钮状态 */}
        {renderSection(
          '按钮状态',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="禁用按钮"
              type="primary"
              disabled
              onPress={() => handlePress('禁用按钮')}
            />
            <ButtonComponent
              text="加载中"
              type="primary"
              loading={loading}
              loadingText="加载中..."
              onPress={handleLoadingPress}
            />
            <ButtonComponent
              text="朴素按钮"
              type="primary"
              plain
              onPress={() => handlePress('朴素按钮')}
            />
          </View>
        )}

        {/* 块级按钮 */}
        {renderSection(
          '块级按钮',
          <ButtonComponent
            text="块级按钮"
            type="primary"
            block
            onPress={() => handlePress('块级按钮')}
          />
        )}

        {/* 带图标的按钮 */}
        {renderSection(
          '带图标的按钮',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="左侧图标"
              type="primary"
              icon="add"
              onPress={() => handlePress('左侧图标')}
            />
            <ButtonComponent
              text="右侧图标"
              type="primary"
              icon="arrow-forward"
              iconPosition="right"
              onPress={() => handlePress('右侧图标')}
            />
            <ButtonComponent
              text="仅图标"
              type="primary"
              icon="favorite"
              onPress={() => handlePress('仅图标')}
            />
          </View>
        )}

        {/* 自定义颜色 */}
        {renderSection(
          '自定义颜色',
          <View style={styles.buttonGroup}>
            <ButtonComponent
              text="自定义颜色"
              color="#ff6b6b"
              onPress={() => handlePress('自定义颜色')}
            />
            <ButtonComponent
              text="渐变色按钮"
              color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              onPress={() => handlePress('渐变色按钮')}
            />
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
