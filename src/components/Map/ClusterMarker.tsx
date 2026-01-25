import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  count: number;
  onPress?: () => void;
}

const ClusterMarker: React.FC<Props> = ({ count, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress} accessibilityLabel={`聚合 ${count} 个标记`}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Text style={styles.text}>{count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,122,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
  }
});

export default ClusterMarker;
