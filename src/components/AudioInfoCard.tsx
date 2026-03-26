import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import QualityBadge from './QualityBadge';

type Props = {
  format: string;
  bitrate: string;
  sampleRate: string;
  quality: string;
};

export default function AudioInfoCard({
  format,
  bitrate,
  sampleRate,
  quality,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.infoText}>Format: {format}</Text>
      <Text style={styles.infoText}>Bitrate: {bitrate}</Text>
      <Text style={styles.infoText}>Sample Rate: {sampleRate}</Text>
      <QualityBadge quality={quality} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0d1b34',
    borderRadius: 18,
    padding: 18,
    marginBottom: 30,
  },
  infoText: {
    color: '#d6e4ff',
    fontSize: 15,
    marginBottom: 8,
  },
});