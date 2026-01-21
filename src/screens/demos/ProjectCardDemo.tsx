import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProjectCard } from '../../components/ProjectCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const ProjectCardDemo = () => {
  // 示例数据
  const projects = [
    {
      id: '1',
      title: '深圳湾公园改造项目',
      location: '广东省 深圳市',
      type: '市政工程',
      amount: '5000万',
      tag: '进行中',
      relatedCount: 8,
      keywords: '公园改造、景观设计、生态修复',
    },
    {
      id: '2',
      title: '北京CBD商务区开发',
      location: '北京市 朝阳区',
      type: '商业地产',
      amount: '200000万',
      tag: '招标中',
      relatedCount: 15,
      keywords: '商务区、写字楼、商业综合体',
    },
    {
      id: '3',
      title: '杭州地铁5号线建设',
      location: '浙江省 杭州市',
      type: '轨道交通',
      amount: '150000万',
      tag: '已完工',
      relatedCount: 23,
      keywords: '地铁建设、轨道交通、市政工程',
    },
    {
      id: '4',
      title: '上海浦东新区保障房',
      location: '上海市 浦东新区',
      type: '保障性住房',
      amount: '80000万',
      tag: '建设中',
      relatedCount: 12,
      keywords: '保障房、民生工程、住宅建设',
    },
    {
      id: '5',
      title: '广州白云机场扩建',
      location: '广东省 广州市',
      type: '交通枢纽',
      amount: '300000万',
      tag: '规划中',
      relatedCount: 18,
      keywords: '机场扩建、交通枢纽、民航工程',
    },
  ];

  const handleWorkPress = (projectId: string) => {
    console.log('工作台操作:', projectId);
  };

  const handleDetailPress = (projectId: string) => {
    console.log('详情操作:', projectId);
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
        {/* 项目卡片列表 */}
        {renderSection(
          '项目卡片展示',
          <View style={styles.cardList}>
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                title={project.title}
                location={project.location}
                type={project.type}
                amount={project.amount}
                tag={project.tag}
                relatedCount={project.relatedCount}
                keywords={project.keywords}
                onWorkPress={() => handleWorkPress(project.id)}
                onDetailPress={() => handleDetailPress(project.id)}
              />
            ))}
          </View>
        )}

        {/* 使用说明 */}
        {renderSection(
          '使用说明',
          <View style={styles.instruction}>
            <Text style={styles.instructionTitle}>ProjectCard 项目卡片组件</Text>
            <Text style={styles.instructionText}>
              • 显示项目基本信息（标题、地点、类型、金额）{'\n'}
              • 支持项目状态标签显示{'\n'}
              • 显示相关数量统计{'\n'}
              • 支持关键词标签{'\n'}
              • 提供工作台和详情两个操作按钮{'\n'}
              • 响应式设计，适配不同屏幕尺寸
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
  cardList: {
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
