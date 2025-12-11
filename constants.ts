import { Track, Instrument, CollaborationStatus } from './types';

// Replace these URLs with your actual music files
export const DEMO_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'pre-dawn(chinese)',
    artist: 'post rock',
    url: 'https://github.com/notsureyet404/qwq/blob/main/electrocollab-survey/4.mp3',
    duration: '03:12'
  },
  {
    id: 'track-2',
    title: 'Dysfunctional Obsession(english)',
    artist: 'idk maybe rock',
    url: 'https://github.com/notsureyet404/qwq/blob/main/electrocollab-survey/Dysfunctional%20Obsession.mp3',
    duration: '04:05'
  },
  {
    id: 'track-3',
    title: '无需困苦！Dont You Worry(chinese)',
    artist: 'jrock?',
    url: 'https://github.com/notsureyet404/qwq/blob/main/electrocollab-survey/%E6%97%A0%E9%9C%80%E5%9B%B0%E8%8B%A6!%EF%BC%8812.5.mp3',
    duration: '02:45'
  },
  {
    id: 'track-4',
    title: 'Void Echo',
    artist: 'edm',
    url: 'https://github.com/notsureyet404/qwq/blob/main/electrocollab-survey/guitar(Silent%20Stars%20Above%20Desert(10.25%20demo)).mp3',
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
