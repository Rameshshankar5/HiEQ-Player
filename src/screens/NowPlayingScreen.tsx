import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import AudioInfoCard from '../components/AudioInfoCard';
import PlayerControls from '../components/PlayerControls';
import PlayerProgress from '../components/PlayerProgress';

type Track = {
  title: string;
  artist: string;
  format: string;
  bitrate: string;
  sampleRate: string;
  quality: string;
  currentTime: string;
  duration: string;
  progress: number;
};

type Props = {
  track: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (value: number) => void;
  onOpenEqualizer: () => void;
  onOpenLibrary: () => void;
};

export default function NowPlayingScreen({
  track,
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onOpenEqualizer,
  onOpenLibrary,
}: Props) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isPlaying) {
      rotateAnim.setValue(0);

      const rotateLoop = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 6000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );

      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );

      rotateLoop.start();
      pulseLoop.start();

      return () => {
        rotateLoop.stop();
        pulseLoop.stop();
      };
    } else {
      pulseAnim.setValue(1);
    }
  }, [isPlaying, pulseAnim, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.appName}>HiEQ Player</Text>
          <Text style={styles.smallText}>Now Playing</Text>
        </View>

        <TouchableOpacity
          style={styles.libraryTopButton}
          onPress={onOpenLibrary}>
          <Text style={styles.libraryTopButtonText}>Library</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.albumCard,
          {
            transform: [{rotate}],
          },
        ]}>
        <Text style={styles.albumArt}>🎵</Text>
      </Animated.View>

      <View style={styles.trackInfo}>
        <Text style={styles.songTitle}>{track.title}</Text>
        <Text style={styles.artistName}>{track.artist}</Text>
      </View>

      <AudioInfoCard
        format={track.format}
        bitrate={track.bitrate}
        sampleRate={track.sampleRate}
        quality={track.quality}
      />

      <PlayerProgress
        currentTime={track.currentTime}
        duration={track.duration}
        progress={track.progress}
        onSeek={onSeek}
      />

      <Animated.View style={{transform: [{scale: pulseAnim}]}}>
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </Animated.View>

      <TouchableOpacity style={styles.eqButton} onPress={onOpenEqualizer}>
        <Text style={styles.eqButtonText}>Open Equalizer</Text>
      </TouchableOpacity>
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
  headerRow: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  smallText: {
    fontSize: 16,
    color: '#9db7ff',
    marginTop: 6,
  },
  libraryTopButton: {
    backgroundColor: '#13284d',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  libraryTopButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  albumCard: {
    height: 280,
    borderRadius: 24,
    backgroundColor: '#112240',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  albumArt: {
    fontSize: 80,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 25,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  artistName: {
    fontSize: 16,
    color: '#a9b8d4',
    marginTop: 8,
  },
  eqButton: {
    backgroundColor: '#7bb0ff',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  eqButtonText: {
    color: '#071226',
    fontSize: 16,
    fontWeight: 'bold',
  },
});