import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WatermarkCamera from '../../components/WatermarkCamera/WatermarkCamera';

const WatermarkCameraDemo: React.FC = () => {
  const [lastUri, setLastUri] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}><Text style={styles.title}>水印相机示例</Text></View>
      <View style={styles.fill}>
        <WatermarkCamera
          watermarkText={`MyCompany © ${new Date().getFullYear()}`}
          watermarkPosition="bottom-right"
          onCapture={(uri) => {
            setLastUri(uri);
            Alert.alert('完成', `生成图片：${uri}`);
          }}
        />
      </View>
      {lastUri ? (
        <View style={styles.previewRow}>
          <Image source={{ uri: lastUri }} style={styles.previewImage} />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  header: { height: 56, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 16, fontWeight: '600' },
  previewRow: { height: 160, borderTopWidth: 1, borderColor: '#eee', padding: 8 },
  previewImage: { width: 120, height: 120, resizeMode: 'cover', borderRadius: 6 }
});

export default WatermarkCameraDemo;
