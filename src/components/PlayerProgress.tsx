import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

type Props = {
  currentTime: string;
  duration: string;
  progress: number; // 0 to 1
  onSeek: (value: number) => void;
};

export default function PlayerProgress({
  currentTime,
  duration,
  progress,
  onSeek,
}: Props) {
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={progress}
        onSlidingComplete={onSeek}
        minimumTrackTintColor="#7bb0ff"
        maximumTrackTintColor="#1b2f52"
        thumbTintColor="#7bb0ff"
      />

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{currentTime}</Text>
        <Text style={styles.timeText}>{duration}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeRow: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#a9b8d4',
    fontSize: 13,
  },
});