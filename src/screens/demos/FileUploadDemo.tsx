import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FileUploadComponent, { FileItem } from '../../components/form/fileUpload/FileUploadComponent';
import ButtonComponent from '../../components/basic/button/ButtonComponent';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

const sampleList: FileItem[] = [
  { uri: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg', status: 'done', isImage: true },
  { uri: 'https://fastly.jsdelivr.net/npm/@vant/assets/tree.jpeg', status: 'uploading', message: '上传中...', isImage: true },
  { uri: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png', status: 'failed', message: '上传失败', isImage: true },
];

export const FileUploadDemo = () => {
  const [fileList, setFileList] = useState<FileItem[]>(sampleList);

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
          <FileUploadComponent
            onChange={setFileList}
            afterRead={files => console.log('afterRead', files)}
          />
        )}

        {renderSection(
          '文件预览 & 状态',
          <FileUploadComponent
            value={fileList}
            onChange={setFileList}
            afterRead={files => console.log('afterRead', files)}
          />
        )}

        {renderSection(
          '限制数量 (2)',
          <FileUploadComponent
            value={fileList}
            onChange={setFileList}
            maxCount={2}
          />
        )}

        {renderSection(
          '限制大小 (200kb)',
          <FileUploadComponent
            maxSize={200 * 1024}
            onOversize={file => Alert.alert('超出大小', `${file.name || file.uri} 超出 200kb`)}
          />
        )}

        {renderSection(
          '自定义上传区域',
          <FileUploadComponent
            uploadRender={
              <View style={styles.customUpload}>
                <Text style={styles.customUploadText}>➕ 自定义上传</Text>
              </View>
            }
          />
        )}

        {renderSection(
          '只读/禁用',
          <View style={styles.row}>
            <FileUploadComponent
              value={fileList.slice(0, 2)}
              readonly
            />
            <FileUploadComponent
              disabled
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
  row: {
    flexDirection: 'row',
    gap: Theme.spacing.lg,
    flexWrap: 'wrap',
  },
  customUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.md,
  },
  customUploadText: {
    color: Colors.primary,
    fontSize: Theme.fontSize.md,
    fontWeight: '600',
  },
});

export default FileUploadDemo;
