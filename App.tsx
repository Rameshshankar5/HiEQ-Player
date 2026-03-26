import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>HiEQ Player</Text>
        <Text style={styles.smallText}>Now Playing</Text>
      </View>

      <View style={styles.albumCard}>
        <Text style={styles.albumArt}>🎵</Text>
      </View>

      <View style={styles.trackInfo}>
        <Text style={styles.songTitle}>Midnight Echo</Text>
        <Text style={styles.artistName}>Sample Artist</Text>
      </View>

      <View style={styles.audioInfoBox}>
        <Text style={styles.infoText}>Format: FLAC</Text>
        <Text style={styles.infoText}>Bitrate: 3200 kbps</Text>
        <Text style={styles.infoText}>Sample Rate: 96 kHz</Text>
        <Text style={styles.infoText}>Quality: Hi-Res</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>⏮</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playText}>▶</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.controlText}>⏭</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.eqButton}>
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
  header: {
    marginTop: 20,
    marginBottom: 30,
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
  albumCard: {
    height: 280,
    borderRadius: 24,
    backgroundColor: '#112240',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
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
  audioInfoBox: {
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