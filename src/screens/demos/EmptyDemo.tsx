import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyComponent from '../../components/basic/empty/EmptyComponent';
import ButtonComponent from '../../components/basic/button/ButtonComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const EmptyDemo = () => {
  const renderSection = (title: string, content: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{content}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderSection(
          '基础用法',
          <EmptyComponent description="描述文字" />
        )}

        {renderSection(
          '图片类型',
          <View style={styles.row}>
            <EmptyComponent image="error" description="通用错误" />
            <EmptyComponent image="network" description="网络错误" />
            <EmptyComponent image="search" description="搜索提示" />
          </View>
        )}

        {renderSection(
          '自定义大小',
          <View style={styles.row}>
            <EmptyComponent imageSize={100} description="100px" />
            <EmptyComponent imageSize={[60, 40]} description="60 x 40" />
          </View>
        )}

        {renderSection(
          '自定义图片',
          <EmptyComponent
            image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
            imageSize={80}
            description="自定义图片"
          />
        )}

        {renderSection(
          '底部内容',
          <EmptyComponent description="描述文字">
            <ButtonComponent text="按钮" type="primary" />
          </EmptyComponent>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default EmptyDemo;
