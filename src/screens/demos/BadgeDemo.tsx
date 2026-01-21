import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BadgeComponent from '../../components/basic/badge/BadgeComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

const Box = () => <View style={styles.box} />;

export const BadgeDemo = () => {
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
          <View style={styles.row}>
            <BadgeComponent content={5}><Box /></BadgeComponent>
            <BadgeComponent content={10}><Box /></BadgeComponent>
            <BadgeComponent content="Hot"><Box /></BadgeComponent>
            <BadgeComponent dot><Box /></BadgeComponent>
          </View>
        )}

        {renderSection(
          '最大值',
          <View style={styles.row}>
            <BadgeComponent content={20} max={9}><Box /></BadgeComponent>
            <BadgeComponent content={50} max={20}><Box /></BadgeComponent>
            <BadgeComponent content={200} max={99}><Box /></BadgeComponent>
          </View>
        )}

        {renderSection(
          '自定义颜色',
          <View style={styles.row}>
            <BadgeComponent content={5} color="#1989fa"><Box /></BadgeComponent>
            <BadgeComponent content={10} color="#1989fa"><Box /></BadgeComponent>
            <BadgeComponent dot color="#1989fa"><Box /></BadgeComponent>
          </View>
        )}

        {renderSection(
          '自定义徽标内容',
          <View style={styles.row}>
            <BadgeComponent>
              <Box />
              <Text style={styles.customIcon}>✓</Text>
            </BadgeComponent>
            <BadgeComponent>
              <Box />
              <Text style={styles.customIcon}>✕</Text>
            </BadgeComponent>
            <BadgeComponent>
              <Box />
              <Text style={styles.customIcon}>↓</Text>
            </BadgeComponent>
          </View>
        )}

        {renderSection(
          '自定义位置',
          <View style={styles.row}>
            <BadgeComponent content={10} position="top-left"><Box /></BadgeComponent>
            <BadgeComponent content={10} position="bottom-left"><Box /></BadgeComponent>
            <BadgeComponent content={10} position="bottom-right"><Box /></BadgeComponent>
          </View>
        )}

        {renderSection(
          '独立展示',
          <View style={styles.row}>
            <BadgeComponent content={20} />
            <BadgeComponent content={200} max={99} />
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.lg,
    alignItems: 'center',
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: '#f2f3f5',
    borderRadius: 4,
  },
  customIcon: {
    position: 'absolute',
    top: -6,
    right: -6,
    color: Colors.white,
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    backgroundColor: Colors.primary,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4,
  },
});

export default BadgeDemo;
