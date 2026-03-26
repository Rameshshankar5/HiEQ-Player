import React, {useEffect, useState} from 'react';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import EqualizerScreen from '../screens/EqualizerScreen';
import LibraryScreen from '../screens/LibraryScreen';

type ScreenName = 'player' | 'eq' | 'library';

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

type Band = {
  label: string;
  value: number;
};

const tracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Echo',
    artist: 'Sample Artist',
    format: 'FLAC',
    bitrate: '3200 kbps',
    sampleRate: '96 kHz',
    quality: 'Hi-Res',
    duration: 275,
  },
  {
    id: '2',
    title: 'Ocean Lights',
    artist: 'Nova Waves',
    format: 'MP3',
    bitrate: '320 kbps',
    sampleRate: '44.1 kHz',
    quality: 'Lossy',
    duration: 200,
  },
  {
    id: '3',
    title: 'Crystal Sky',
    artist: 'Aria Bloom',
    format: 'WAV',
    bitrate: '1411 kbps',
    sampleRate: '44.1 kHz',
    quality: 'Lossless',
    duration: 310,
  },
];

const createDefaultBands = (): Band[] => [
  {label: '60 Hz', value: 0},
  {label: '230 Hz', value: 0},
  {label: '910 Hz', value: 0},
  {label: '3.6 kHz', value: 0},
  {label: '14 kHz', value: 0},
];

const presets = {
  Flat: [0, 0, 0, 0, 0],
  Bass: [6, 4, 0, -2, -4],
  Rock: [4, 2, -2, 2, 4],
  Vocal: [-2, 0, 4, 4, 2],
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function AppNavigator() {
  const [screen, setScreen] = useState<ScreenName>('player');
  const [bands, setBands] = useState<Band[]>(createDefaultBands());
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);

  const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);

  useEffect(() => {
    setCurrentPosition(0);
  }, [currentTrack]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentPosition(prev => {
        if (prev >= currentTrack.duration) {
          return currentTrack.duration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (currentPosition >= currentTrack.duration && isPlaying) {
      setIsPlaying(false);
    }
  }, [currentPosition, currentTrack.duration, isPlaying]);

  const updateBand = (index: number, value: number) => {
    setBands(prev =>
      prev.map((band, i) => (i === index ? {...band, value} : band)),
    );
  };

  const resetEq = () => {
    setBands(createDefaultBands());
  };
  const handleSeek = (value: number) => {
  const newPosition = Math.floor(value * currentTrack.duration);
  setCurrentPosition(newPosition);
};

  const applyPreset = (presetName: keyof typeof presets) => {
    const values = presets[presetName];
    setBands(prev =>
      prev.map((band, i) => ({
        ...band,
        value: values[i],
      })),
    );
  };

  const goPrevious = () => {
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(tracks[prevIndex]);
    setCurrentPosition(0);
  };

  const goNext = () => {
    const nextIndex = currentIndex === tracks.length - 1 ? 0 : currentIndex + 1;
    setCurrentTrack(tracks[nextIndex]);
    setCurrentPosition(0);
  };

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setCurrentPosition(0);
    setScreen('player');
  };

  const nowPlayingTrack = {
    ...currentTrack,
    currentTime: formatTime(currentPosition),
    duration: formatTime(currentTrack.duration),
    progress:
      currentTrack.duration > 0 ? currentPosition / currentTrack.duration : 0,
  };

  if (screen === 'eq') {
    return (
      <EqualizerScreen
        bands={bands}
        onBack={() => setScreen('player')}
        onChangeBand={updateBand}
        onReset={resetEq}
        onApplyPreset={applyPreset}
      />
    );
  }

  if (screen === 'library') {
    return (
      <LibraryScreen
        tracks={tracks}
        onBack={() => setScreen('player')}
        onSelectTrack={handleSelectTrack}
      />
    );
  }

  return (
    <NowPlayingScreen
  track={nowPlayingTrack}
  isPlaying={isPlaying}
  onPlayPause={() => setIsPlaying(prev => !prev)}
  onPrevious={goPrevious}
  onNext={goNext}
  onSeek={handleSeek}
  onOpenEqualizer={() => setScreen('eq')}
  onOpenLibrary={() => setScreen('library')}
/>
  );
}