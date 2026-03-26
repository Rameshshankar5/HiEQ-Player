import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

type Track = {
  id: string;
  title: string;
  artist: string;
  format: string;
  bitrate: string;
  sampleRate: string;
  quality: string;
  duration: number;
};

type Props = {
  tracks: Track[];
  onBack: () => void;
  onSelectTrack: (track: Track) => void;
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function LibraryScreen({tracks, onBack, onSelectTrack}: Props) {
  const renderTrack = ({item}: {item: Track}) => (
    <TouchableOpacity
      style={styles.trackCard}
      onPress={() => onSelectTrack(item)}>
      <View style={styles.leftSection}>
        <View style={styles.iconBox}>
          <Text style={styles.iconText}>🎵</Text>
        </View>

        <View>
          <Text style={styles.trackTitle}>{item.title}</Text>
          <Text style={styles.trackArtist}>{item.artist}</Text>
          <Text style={styles.trackDuration}>{formatTime(item.duration)}</Text>
        </View>
      </View>

      <View style={styles.rightBox}>
        <Text style={styles.trackMeta}>{item.format}</Text>
        <Text style={styles.trackMeta}>{item.quality}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Library</Text>
      <Text style={styles.subtitle}>Choose a song</Text>

      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderTrack}
      />
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
  backText: {
    color: '#7bb0ff',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#9db7ff',
    marginTop: 6,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  trackCard: {
    backgroundColor: '#0d1b34',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#13284d',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconText: {
    fontSize: 22,
  },
  trackTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  trackArtist: {
    color: '#a9b8d4',
    fontSize: 14,
    marginTop: 4,
  },
  trackDuration: {
    color: '#7bb0ff',
    fontSize: 12,
    marginTop: 4,
  },
  rightBox: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  trackMeta: {
    color: '#7bb0ff',
    fontSize: 13,
    fontWeight: '600',
  },
});