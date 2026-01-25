import React, { useRef, useState, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapComponent, { MarkerItem } from '../../components/Map/MapComponent';

const initialRegion = {
  latitude: 31.23,
  longitude: 121.47,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

const generateMarkers = (center: { latitude: number; longitude: number }, count = 100) => {
  const arr: MarkerItem[] = [];
  for (let i = 0; i < count; i++) {
    const lat = center.latitude + (Math.random() - 0.5) * 0.12;
    const lng = center.longitude + (Math.random() - 0.5) * 0.12;
    arr.push({ id: `${i + 1}`, latitude: lat, longitude: lng, title: `任务 ${i + 1}` });
  }
  return arr;
};

const MapDemoScreen: React.FC = () => {
  const mapRef = useRef<any>(null);
  const [clusterEnabled, setClusterEnabled] = useState(true);

  const markers = useMemo(() => generateMarkers({ latitude: initialRegion.latitude, longitude: initialRegion.longitude }, 120), []);

  return (
    <SafeAreaView style={styles.fill}>
      <View style={styles.header}>
        <Text style={styles.title}>地图示例</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.btn} onPress={() => setClusterEnabled(v => !v)}>
            <Text style={styles.btnText}>{clusterEnabled ? '关闭聚合' : '开启聚合'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => mapRef.current?.fitToMarkers()}>
            <Text style={styles.btnText}>适配标记</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => mapRef.current?.animateToRegion({ ...initialRegion, latitudeDelta: 0.02, longitudeDelta: 0.02 })}>
            <Text style={styles.btnText}>聚焦</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fill}>
        <MapComponent
          ref={mapRef}
          initialRegion={initialRegion}
          markers={markers}
          showUserLocation
          onMarkerPress={(m) => console.log('marker pressed', m.id)}
          clusterEnabled={clusterEnabled}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  header: { height: 56, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', paddingHorizontal: 12 },
  title: { fontSize: 16, fontWeight: '600', flex: 1 },
  headerButtons: { flexDirection: 'row', alignItems: 'center' },
  btn: { marginLeft: 8, paddingHorizontal: 8, paddingVertical: 6, backgroundColor: '#007AFF', borderRadius: 6 },
  btnText: { color: '#fff', fontSize: 12 }
});

export default MapDemoScreen;
