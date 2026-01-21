import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

interface ComponentItem {
  name: string;
  chineseName: string;
  screen?: string;
  available: boolean;
}

interface ComponentGroup {
  title: string;
  components: ComponentItem[];
}

export const HomeScreen = () => {
  const navigation = useNavigation();

  // 组件数据 - 按分组组织
  const componentGroups: ComponentGroup[] = [
    {
      title: '基础组件',
      components: [
        { name: 'Button', chineseName: '按钮', screen: 'ButtonDemo', available: true },
        { name: 'Cell', chineseName: '单元格', screen: 'CellDemo', available: true },
      ],
    },
    {
      title: '表单组件',
      components: [
        { name: 'Field', chineseName: '输入框', screen: 'FieldDemo', available: true },
        { name: 'Picker', chineseName: '选择器', screen: 'PickerDemo', available: true },
        { name: 'Cascader', chineseName: '级联选择', screen: 'CascaderDemo', available: true },
        { name: 'Checkbox', chineseName: '复选框', screen: 'CheckboxDemo', available: true },
        { name: 'DatePicker', chineseName: '日期选择器', screen: 'DatePickerDemo', available: true },
      ],
    },
    {
      title: '反馈组件',
      components: [
        { name: 'Toast', chineseName: '轻提示', screen: 'ToastDemo', available: true },
      ],
    },
    {
      title: '容器组件',
      components: [
        { name: 'Popup', chineseName: '弹出层', screen: 'PopupDemo', available: true },
        { name: 'Form', chineseName: '表单', screen: 'FormDemo', available: true },
      ],
    },
    {
      title: '业务组件',
      components: [
        { name: 'ProjectCard', chineseName: '项目卡片', screen: 'ProjectCardDemo', available: true },
      ],
    },
  ];

  const handleComponentPress = (component: ComponentItem) => {
    if (component.available && component.screen) {
      navigation.navigate(component.screen as never);
    }
  };

  const renderComponentItem = (component: ComponentItem) => (
    <TouchableOpacity
      key={component.name}
      style={[
        styles.componentItem,
        !component.available && styles.componentItemDisabled
      ]}
      onPress={() => handleComponentPress(component)}
      disabled={!component.available}
    >
      <Text style={[
        styles.componentName,
        !component.available && styles.componentNameDisabled
      ]}>
        {component.name} {component.chineseName}
      </Text>
      <Icon
        name="chevron-right"
        size={20}
        color={component.available ? Colors.text.light : Colors.border}
      />
    </TouchableOpacity>
  );

  const renderComponentGroup = (group: ComponentGroup) => (
    <View key={group.title} style={styles.groupContainer}>
      <Text style={styles.groupTitle}>{group.title}</Text>
      <View style={styles.groupContent}>
        {group.components.map(renderComponentItem)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>组件测试</Text>
        <Text style={styles.headerSubtitle}>轻量、可定制的移动端组件库</Text>
      </View>

      {/* 组件列表 */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {componentGroups.map(renderComponentGroup)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.xl,
    borderBottomWidth: Theme.border.width,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: Theme.fontSize.sm,
    color: Colors.text.light,
  },
  scrollView: {
    flex: 1,
  },
  groupContainer: {
    marginBottom: Theme.spacing.xl,
  },
  groupTitle: {
    fontSize: Theme.fontSize.sm,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  groupContent: {
    backgroundColor: Colors.white,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.radius.md,
    ...Theme.shadow.card,
  },
  componentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.lg,
    borderBottomWidth: Theme.border.width,
    borderBottomColor: Colors.border,
  },
  componentItemDisabled: {
    opacity: 0.6,
  },
  componentName: {
    fontSize: Theme.fontSize.lg,
    color: Colors.text.primary,
  },
  componentNameDisabled: {
    color: Colors.text.light,
  },
});
