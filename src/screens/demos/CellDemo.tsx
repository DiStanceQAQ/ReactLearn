import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CellComponent from '../../components/basic/cell/CellComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const CellDemo = () => {
  const handlePress = (title: string) => {
    console.log(`Cell pressed: ${title}`);
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
          <View style={styles.cellGroup}>
            <CellComponent
              title="单元格"
              value="内容"
              onPress={() => handlePress('基础单元格')}
            />
            <CellComponent
              title="带标签的单元格"
              value="内容"
              label="描述信息"
              onPress={() => handlePress('带标签的单元格')}
            />
          </View>
        )}

        {/* 带图标的单元格 */}
        {renderSection(
          '带图标的单元格',
          <View style={styles.cellGroup}>
            <CellComponent
              title="用户头像"
              value="点击查看"
              icon="person"
              onPress={() => handlePress('用户头像')}
            />
            <CellComponent
              title="设置"
              value="管理"
              icon="settings"
              onPress={() => handlePress('设置')}
            />
            <CellComponent
              title="通知"
              value="开启"
              icon="notifications"
              onPress={() => handlePress('通知')}
            />
          </View>
        )}

        {/* 不同尺寸 */}
        {renderSection(
          '不同尺寸',
          <View style={styles.cellGroup}>
            <CellComponent
              title="大尺寸单元格"
              value="内容"
              size="large"
              onPress={() => handlePress('大尺寸单元格')}
            />
            <CellComponent
              title="普通尺寸单元格"
              value="内容"
              size="normal"
              onPress={() => handlePress('普通尺寸单元格')}
            />
          </View>
        )}

        {/* 居中显示 */}
        {renderSection(
          '居中显示',
          <View style={styles.cellGroup}>
            <CellComponent
              title="居中显示"
              center
              onPress={() => handlePress('居中显示')}
            />
            <CellComponent
              title="居中带内容"
              value="内容"
              center
              onPress={() => handlePress('居中带内容')}
            />
          </View>
        )}

        {/* 带箭头的单元格 */}
        {renderSection(
          '带箭头的单元格',
          <View style={styles.cellGroup}>
            <CellComponent
              title="右箭头"
              value="默认"
              isLink
              onPress={() => handlePress('右箭头')}
            />
            <CellComponent
              title="下箭头"
              value="展开"
              isLink
              arrowDirection="down"
              onPress={() => handlePress('下箭头')}
            />
            <CellComponent
              title="上箭头"
              value="收起"
              isLink
              arrowDirection="up"
              onPress={() => handlePress('上箭头')}
            />
          </View>
        )}

        {/* 必填项 */}
        {renderSection(
          '必填项',
          <View style={styles.cellGroup}>
            <CellComponent
              title="必填项"
              value="请输入"
              required
              onPress={() => handlePress('必填项')}
            />
            <CellComponent
              title="可选项目"
              value="可不填"
              onPress={() => handlePress('可选项目')}
            />
          </View>
        )}

        {/* 自定义内容 */}
        {renderSection(
          '自定义内容',
          <View style={styles.cellGroup}>
            <CellComponent
              title="自定义右侧内容"
              onPress={() => handlePress('自定义右侧内容')}
            >
              <View style={styles.customContent}>
                <Text style={styles.customText}>自定义内容</Text>
              </View>
            </CellComponent>
            <CellComponent
              title="带标签和自定义内容"
              label="这是标签"
              onPress={() => handlePress('带标签和自定义内容')}
            >
              <View style={styles.customContent}>
                <Text style={styles.customValue}>自定义值</Text>
              </View>
            </CellComponent>
          </View>
        )}

        {/* 禁用状态 */}
        {renderSection(
          '禁用状态',
          <CellComponent
            title="禁用单元格"
            value="不可点击"
            disabled
            onPress={() => handlePress('禁用单元格')}
          />
        )}

        {/* 无边框 */}
        {renderSection(
          '无边框',
          <View style={styles.cellGroup}>
            <CellComponent
              title="无边框单元格1"
              value="内容1"
              border={false}
              onPress={() => handlePress('无边框单元格1')}
            />
            <CellComponent
              title="无边框单元格2"
              value="内容2"
              border={false}
              onPress={() => handlePress('无边框单元格2')}
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
    //marginHorizontal: Theme.spacing.lg,
    //borderRadius: Theme.radius.md,
    //...Theme.shadow.card,
  },
  cellGroup: {
    // Cell组件已经有自己的边框和间距
  },
  customContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customText: {
    fontSize: Theme.fontSize.md,
    color: Colors.primary,
  },
  customValue: {
    fontSize: Theme.fontSize.lg,
    color: Colors.text.primary,
    fontWeight: 'bold',
  },
});
