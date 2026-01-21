import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageComponent from '../../components/basic/image/ImageComponent';
import ButtonComponent from '../../components/basic/button/ButtonComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

const SRC = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg';

export const ImageDemo = () => {
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
          <ImageComponent src={SRC} width={120} height={120} alt="cat" />
        )}

        {renderSection(
          '填充模式',
          <View style={styles.row}>
            <ImageComponent src={SRC} width={120} height={120} fit="contain" />
            <ImageComponent src={SRC} width={120} height={120} fit="cover" />
            <ImageComponent src={SRC} width={120} height={120} fit="fill" />
            <ImageComponent src={SRC} width={120} height={120} fit="none" />
          </View>
        )}

        {renderSection(
          '图片位置',
          <View style={styles.row}>
            <ImageComponent src={SRC} width={120} height={120} fit="cover" position="left" />
            <ImageComponent src={SRC} width={120} height={120} fit="cover" position="right" />
            <ImageComponent src={SRC} width={120} height={120} fit="cover" position="top" />
            <ImageComponent src={SRC} width={120} height={120} fit="cover" position="bottom" />
          </View>
        )}

        {renderSection(
          '圆形图片',
          <View style={styles.row}>
            <ImageComponent src={SRC} width={120} height={120} round />
            <ImageComponent src={SRC} width={120} height={80} round fit="cover" />
          </View>
        )}

        {renderSection(
          '加载/错误提示',
          <View style={styles.row}>
            <ImageComponent src="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" width={120} height={120} />
            <ImageComponent src="https://invalid.url/demo.png" width={120} height={120} alt="加载失败" />
            <ImageComponent width={120} height={120} alt="无地址" />
          </View>
        )}

        {renderSection(
          '自定义底部内容',
          <ImageComponent src={SRC} width={160} height={120}>
            <ButtonComponent text="点击我" size="small" />
          </ImageComponent>
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
  },
});

export default ImageDemo;
