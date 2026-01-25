import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ControlsProps {
  style?: any;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onLocate?: () => void;
  onToggleMapType?: () => void;
  controls?: { zoom?: boolean; locate?: boolean; mapType?: boolean };
}

const MapControls: React.FC<ControlsProps> = ({ style, onZoomIn, onZoomOut, onLocate, onToggleMapType, controls = { zoom: true, locate: true, mapType: true } }) => {
  return (
    <View style={[styles.container, style]} pointerEvents="box-none">
      {controls.zoom && (
        <View style={styles.zoomRow}>
          <TouchableOpacity style={styles.btn} onPress={onZoomIn} accessibilityLabel="放大">
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={onZoomOut} accessibilityLabel="缩小">
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
        </View>
      )}

      {controls.locate && (
        <TouchableOpacity style={[styles.btn, { marginTop: 8 }]} onPress={onLocate} accessibilityLabel="定位">
          <Text style={styles.btnText}>◎</Text>
        </TouchableOpacity>
      )}

      {controls.mapType && (
        <TouchableOpacity style={[styles.btn, { marginTop: 8 }]} onPress={onToggleMapType} accessibilityLabel="切换地图类型">
          <Text style={styles.btnText}>地</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  zoomRow: {
    flexDirection: 'column'
  },
  btn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
  }
});

export default MapControls;
