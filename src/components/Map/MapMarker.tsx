import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import type { MarkerItem } from './MapComponent';

interface Props {
  item: MarkerItem;
  onPress?: () => void;
}

const MapMarker: React.FC<Props> = ({ item, onPress }) => {
  return (
    <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }} onPress={onPress}>
      <View style={styles.markerWrap}>
        <View style={styles.dot} />
      </View>
      <Callout>
        <View style={styles.callout}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff5a5f',
    borderWidth: 2,
    borderColor: '#fff',
  },
  callout: {
    minWidth: 120,
  },
  title: {
    fontWeight: '600',
  },
  desc: {
    marginTop: 4,
    color: '#666',
  }
});

export default MapMarker;
