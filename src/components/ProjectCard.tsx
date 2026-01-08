import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';

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
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    flex: 1,
  },
  tag: {
    backgroundColor: Colors.orange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: Colors.white,
    fontSize: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  keywordBox: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  keywordText: {
    color: Colors.primary,
    fontSize: 14,
  },
  relatedText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  footerButtonText: {
    color: Colors.primary,
    fontSize: 14,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.border,
  },
});

