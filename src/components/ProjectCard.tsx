import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

interface ProjectCardProps {
  title: string;
  location: string;
  type: string;
  amount: string;
  tag?: string;
  relatedCount: number;
  keywords: string;
  onWorkPress?: () => void;
  onDetailPress?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  location,
  type,
  amount,
  tag,
  relatedCount,
  keywords,
  onWorkPress,
  onDetailPress,
}) => {
  return (
    <View style={styles.card}>
      {/* 标题和标签 */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {tag && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        )}
      </View>

      {/* 项目信息 */}
      <View style={styles.infoRow}>
        <Icon name="location-on" size={16} color={Colors.text.secondary} />
        <Text style={styles.infoText}>{location}</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="business" size={16} color={Colors.text.secondary} />
        <Text style={styles.infoText}>{type}</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="attach-money" size={16} color={Colors.text.secondary} />
        <Text style={styles.infoText}>{amount}</Text>
      </View>

      {/* 操作按钮行 */}
      {/* <View style={styles.actionRow}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>文字_vant_text_55</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="delete" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="content-copy" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="image" size={20} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View> */}

      {/* 关联词 */}
      {/* <View style={styles.keywordBox}>
        <Text style={styles.keywordText}>{keywords}</Text>
      </View> */}

      {/* 关联文档 */}
      <Text style={styles.relatedText}>关联文档：{relatedCount}个</Text>

      {/* 底部按钮 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={onWorkPress}>
          <Text style={styles.footerButtonText}>工作台</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.footerButton} onPress={onDetailPress}>
          <Text style={styles.footerButtonText}>详情</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.sm,
    ...Theme.shadow.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.fontSize.lg,
    fontWeight: 'bold',
    color: Colors.text.primary,
    flex: 1,
  },
  tag: {
    backgroundColor: Colors.orange,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.radius.sm,
  },
  tagText: {
    color: Colors.white,
    fontSize: Theme.fontSize.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  infoText: {
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.radius.sm,
    marginRight: Theme.spacing.sm,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: Theme.fontSize.md,
  },
  iconButton: {
    padding: Theme.spacing.sm,
    marginLeft: Theme.spacing.xs,
  },
  keywordBox: {
    borderWidth: Theme.border.width,
    borderColor: Colors.primary,
    borderRadius: Theme.radius.sm,
    padding: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  keywordText: {
    color: Colors.primary,
    fontSize: Theme.fontSize.md,
  },
  relatedText: {
    fontSize: Theme.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: Theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: Theme.border.width,
    borderTopColor: Colors.border,
    paddingTop: Theme.spacing.md,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  footerButtonText: {
    color: Colors.primary,
    fontSize: Theme.fontSize.md,
  },
  divider: {
    width: Theme.border.width,
    backgroundColor: Colors.border,
  },
});

