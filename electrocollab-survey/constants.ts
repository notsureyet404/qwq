import { Track, Instrument, CollaborationStatus } from './types';

// Replace these URLs with your actual music files
export const DEMO_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Neon Horizon',
    artist: 'SynthWave Core',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '03:12'
  },
  {
    id: 'track-2',
    title: 'Cyber Pulse',
    artist: 'Electro Vibe',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration: '04:05'
  },
  {
    id: 'track-3',
    title: 'Deep Logic',
    artist: 'Bass Heavy',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '02:45'
  },
  {
    id: 'track-4',
    title: 'Void Echo',
    artist: 'Dark Matter',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    duration: '03:50'
  }
];

export const COLLAB_OPTIONS = [
  { value: CollaborationStatus.COMMITTED, label: "I will overcome all difficulties to complete it.", desc: "Full Commitment" },
  { value: CollaborationStatus.TENTATIVE, label: "Play it by ear. I'll try, but I might get busy.", desc: "Tentative / Unpredictable" },
  { value: CollaborationStatus.BUSY, label: "School is killing me, I have no time.", desc: "Too Busy" },
  { value: CollaborationStatus.OTHER_GROUP, label: "Already found another group / See you next time.", desc: "Unavailable" },
];

export const INSTRUMENTS = [
  Instrument.KEYBOARD,
  Instrument.RHYTHM_GUITAR,
  Instrument.LEAD_GUITAR,
  Instrument.STRINGS,
  Instrument.BASS,
  Instrument.DRUMS,
  Instrument.VOCALS
];

// 1-10 excluding 5
export const RATING_SCALE = [1, 2, 3, 4, 6, 7, 8, 9, 10];