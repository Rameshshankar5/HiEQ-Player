import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
}: Props) {
  return (
    <View style={styles.controls}>
      <TouchableOpacity style={styles.controlButton} onPress={onPrevious}>
        <Text style={styles.controlText}>⏮</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.playButton} onPress={onPlayPause}>
        <Text style={styles.playText}>{isPlaying ? '⏸' : '▶'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlButton} onPress={onNext}>
        <Text style={styles.controlText}>⏭</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#13284d',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  controlText: {
    fontSize: 24,
    color: '#ffffff',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4d8dff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});