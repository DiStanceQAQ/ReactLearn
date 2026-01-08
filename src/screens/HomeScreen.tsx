import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';
import { ProjectCard } from '../components/ProjectCard';

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  // 示例数据
  const projects = [
    {
      id: '1',
      title: '项目名称',
      location: '广东省 深圳市',
      type: '房屋建筑',
      amount: '1000万',
      tag: '标签',
      relatedCount: 3,
      keywords: '关键词1',
    },
    {
      id: '2',
      title: '另一个项目名称',
      location: '广东省 广州市',
      type: '市政工程',
      amount: '2000万',
      relatedCount: 5,
      keywords: '关键词A、关键词B、关键词C',
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 顶部标题栏 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>项目总览</Text>
      </View>

      {/* 搜索栏 */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={Colors.text.light} />
        <TextInput
          style={styles.searchInput}
          placeholder="搜索项目"
          placeholderTextColor={Colors.text.light}
        />
      </View>

      {/* 项目列表 */}
      <ScrollView style={styles.scrollView}>
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
            onWorkPress={() => console.log('工作台', project.id)}
            onDetailPress={() => console.log('详情', project.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
});

