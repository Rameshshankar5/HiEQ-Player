import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  quality: string;
};

export default function QualityBadge({quality}: Props) {
  const getBadgeStyle = () => {
    if (quality === 'Hi-Res') return styles.hiRes;
    if (quality === 'Lossless') return styles.lossless;
    return styles.lossy;
  };

  return (
    <View style={[styles.badge, getBadgeStyle()]}>
      <Text style={styles.badgeText}>{quality}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  hiRes: {
    backgroundColor: '#4d8dff',
  },
  lossless: {
    backgroundColor: '#2d6a4f',
  },
  lossy: {
    backgroundColor: '#7b2d26',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});