import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';

type Band = {
  label: string;
  value: number;
};

type Props = {
  bands: Band[];
  onBack: () => void;
  onChangeBand: (index: number, value: number) => void;
  onReset: () => void;
  onApplyPreset: (presetName: 'Flat' | 'Bass' | 'Rock' | 'Vocal') => void;
};

export default function EqualizerScreen({
  bands,
  onBack,
  onChangeBand,
  onReset,
  onApplyPreset,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.eqHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.eqTitle}>Equalizer</Text>
        <Text style={styles.eqPreset}>Preset: Custom</Text>
      </View>

      <View style={styles.presetRow}>
        {(['Flat', 'Bass', 'Rock', 'Vocal'] as const).map((preset) => (
          <TouchableOpacity
            key={preset}
            style={styles.presetButton}
            onPress={() => onApplyPreset(preset)}>
            <Text style={styles.presetText}>{preset}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.eqScroll}>
        {bands.map((band, index) => (
          <View key={band.label} style={styles.sliderCard}>
            <View style={styles.sliderTopRow}>
              <Text style={styles.bandLabel}>{band.label}</Text>
              <Text style={styles.bandValue}>{band.value.toFixed(1)} dB</Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={-12}
              maximumValue={12}
              value={band.value}
              onValueChange={(value) => onChangeBand(index, value)}
            />

            <View style={styles.sliderMarks}>
              <Text style={styles.markText}>-12</Text>
              <Text style={styles.markText}>0</Text>
              <Text style={styles.markText}>+12</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetButtonText}>Reset Equalizer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071226',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  eqHeader: {
    marginTop: 20,
    marginBottom: 20,
  },
  backText: {
    color: '#7bb0ff',
    fontSize: 16,
    marginBottom: 20,
  },
  eqTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  eqPreset: {
    fontSize: 16,
    color: '#9db7ff',
    marginTop: 6,
  },
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  presetButton: {
    backgroundColor: '#13284d',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  presetText: {
    color: '#ffffff',
  },
  eqScroll: {
    paddingBottom: 30,
  },
  sliderCard: {
    backgroundColor: '#0d1b34',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },
  sliderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bandLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bandValue: {
    color: '#7bb0ff',
    fontSize: 15,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderMarks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  markText: {
    color: '#8ea6cc',
    fontSize: 12,
  },
  resetButton: {
    backgroundColor: '#4d8dff',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});