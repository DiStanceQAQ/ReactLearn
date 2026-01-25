import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform, PermissionsAndroid, Alert } from 'react-native';
import MapView, { Region, Marker } from 'react-native-maps';
import MapControls from './MapControls';
import MapMarker from './MapMarker';
import ClusterMarker from './ClusterMarker';
import Supercluster from 'supercluster';

export interface MarkerItem {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
  avatar?: string;
}

export interface MapComponentProps {
  initialRegion: Region;
  markers?: MarkerItem[];
  showUserLocation?: boolean;
  onMarkerPress?: (marker: MarkerItem) => void;
  onRegionChange?: (region: Region, fromUser?: boolean) => void;
  mapType?: 'standard' | 'satellite' | 'hybrid';
  clusterEnabled?: boolean; // placeholder
  style?: any;
  controls?: {
    zoom?: boolean;
    locate?: boolean;
    mapType?: boolean;
  };
  loadingIndicator?: React.ReactNode;
}

export interface MapRef {
  fitToMarkers: (ids?: string[]) => void;
  animateToRegion: (region: Region, duration?: number) => void;
}

const MapComponent = forwardRef<MapRef, MapComponentProps>((props, ref) => {
  const {
    initialRegion,
    markers = [],
    showUserLocation = false,
    onMarkerPress,
    onRegionChange,
    mapType = 'standard',
    clusterEnabled = false,
    style,
    controls = { zoom: true, locate: true, mapType: true },
    loadingIndicator,
  } = props;

  const mapRef = useRef<MapView | null>(null);
  const [isMapReady, setMapReady] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(initialRegion);
  const [internalMapType, setInternalMapType] = useState<'standard' | 'satellite' | 'hybrid'>(mapType);

  const [clusters, setClusters] = useState<any[]>([]);
  const superRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    fitToMarkers: (ids?: string[]) => {
      if (!mapRef.current || markers.length === 0) return;
      const filtered = ids ? markers.filter(m => ids.includes(m.id)) : markers;
      const coords = filtered.map(m => ({ latitude: m.latitude, longitude: m.longitude }));
      mapRef.current.fitToCoordinates(coords, { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, animated: true });
    },
    animateToRegion: (region: Region, duration = 500) => {
      mapRef.current?.animateToRegion(region, duration);
    },
  }));

  const handleMarkerPress = (item: MarkerItem) => {
    onMarkerPress && onMarkerPress(item);
  };

  const handleRegionChange = (region: Region) => {
    setCurrentRegion(region);
    onRegionChange && onRegionChange(region, true);
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: '位置权限',
            message: '应用需要访问您的位置信息以居中地图',
            buttonNeutral: '稍后',
            buttonNegative: '取消',
            buttonPositive: '确定',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    }
    return true;
  };

  const locateUser = async () => {
    const ok = await requestLocationPermission();
    if (!ok) {
      Alert.alert('权限被拒绝', '无法获取位置信息， 请在设置中允许定位权限');
      return;
    }

    try {
      (globalThis as any).navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const { latitude, longitude } = position.coords;
          const region: Region = {
            latitude,
            longitude,
            latitudeDelta: currentRegion?.latitudeDelta ?? 0.01,
            longitudeDelta: currentRegion?.longitudeDelta ?? 0.01,
          };
          mapRef.current?.animateToRegion(region, 500);
        },
        (error: any) => {
          Alert.alert('定位失败', error.message || '无法获取位置');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
      );
    } catch (e) {
      Alert.alert('定位失败', '无法获取位置');
    }
  };

  const zoom = (factor: number) => {
    if (!currentRegion) return;
    const newRegion: Region = {
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
      latitudeDelta: currentRegion.latitudeDelta * factor,
      longitudeDelta: currentRegion.longitudeDelta * factor,
    };
    mapRef.current?.animateToRegion(newRegion, 300);
  };

  const toggleMapType = () => {
    const next = internalMapType === 'standard' ? 'satellite' : internalMapType === 'satellite' ? 'hybrid' : 'standard';
    setInternalMapType(next);
  };

  const lonLatToBBox = (region?: Region) => {
    if (!region) return [-180, -85, 180, 85];
    const west = region.longitude - region.longitudeDelta / 2;
    const east = region.longitude + region.longitudeDelta / 2;
    const north = region.latitude + region.latitudeDelta / 2;
    const south = region.latitude - region.latitudeDelta / 2;
    return [west, south, east, north];
  };

  const regionToZoom = (region?: Region) => {
    if (!region) return 0;
    const zoom = Math.round(Math.log2(360 / region.longitudeDelta));
    return Math.max(0, Math.min(20, zoom));
  };

  const computeClusters = async (region?: Region | null) => {
    if (!clusterEnabled || !superRef.current) return;
    const bbox = lonLatToBBox(region ?? currentRegion ?? initialRegion);
    const z = regionToZoom(region ?? currentRegion ?? initialRegion);
    try {
      const cls = superRef.current.getClusters(bbox, z);
      setClusters(cls);
    } catch (e) {
      setClusters([]);
    }
  };
  useEffect(() => {
    if (!clusterEnabled) return;
    const index = new Supercluster({ radius: 60, maxZoom: 20 });
    const points = markers.map(m => ({
      type: 'Feature' as const,
      properties: { markerId: m.id },
      geometry: { type: 'Point' as const, coordinates: [m.longitude, m.latitude] as [number, number] }
    }));
    index.load(points);
    superRef.current = index;
    computeClusters(currentRegion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, clusterEnabled]);

  return (
    <View style={[styles.container, style]}>
      {!isMapReady && (
        <View style={styles.loading} pointerEvents="none">
          {loadingIndicator ?? <ActivityIndicator size="large" />}
        </View>
      )}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={showUserLocation}
        mapType={internalMapType}
        onMapReady={() => setMapReady(true)}
        onRegionChangeComplete={(region) => {
          handleRegionChange(region as Region);
          computeClusters(region as Region);
        }}
      >
        {clusterEnabled ? (
          clusters.map((c) => {
            if (c.properties && c.properties.cluster) {
              const [longitude, latitude] = c.geometry.coordinates;
              return (
                <Marker
                  key={`cluster-${c.id}`}
                  coordinate={{ latitude, longitude }}
                  onPress={() => {
                    const newRegion = {
                      latitude,
                      longitude,
                      latitudeDelta: (currentRegion?.latitudeDelta ?? initialRegion.latitudeDelta) / 2,
                      longitudeDelta: (currentRegion?.longitudeDelta ?? initialRegion.longitudeDelta) / 2,
                    };
                    mapRef.current?.animateToRegion(newRegion, 300);
                  }}
                >
                  <ClusterMarker count={c.properties.point_count} />
                </Marker>
              );
            }
            const [longitude, latitude] = c.geometry.coordinates;
            const id = c.properties.markerId;
            const item = markers.find(m => m.id === id);
            if (!item) return null;
            return (
              <MapMarker key={item.id} item={item} onPress={() => handleMarkerPress(item)} />
            );
          })
        ) : (
          markers.map((m) => (
            <MapMarker key={m.id} item={m} onPress={() => handleMarkerPress(m)} />
          ))
        )}
      </MapView>

      <MapControls
        style={styles.controls}
        onZoomIn={() => zoom(0.5)}
        onZoomOut={() => zoom(2)}
        onLocate={locateUser}
        onToggleMapType={toggleMapType}
        controls={controls}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)'
  },
  controls: {
    position: 'absolute',
    right: 12,
    bottom: 24,
  }
});

export default MapComponent;
