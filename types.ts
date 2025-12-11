export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string; // URL to the audio file
  duration?: string;
}

export enum CollaborationStatus {
  COMMITTED = "I will overcome all difficulties to complete it.",
  TENTATIVE = "Play it by ear. I'll try, but I might get busy.",
  BUSY = "School/Work is killing me, I have no time.",
  OTHER_GROUP = "I have found another group / See you next time."
}

export enum Instrument {
  KEYBOARD = "Keyboard",
  RHYTHM_GUITAR = "Rhythm Guitar",
  LEAD_GUITAR = "Lead Guitar",
  STRINGS = "Strings",
  BASS = "Bass",
  DRUMS = "Drums",
  VOCALS = "Vocals"
}

export interface TrackRating {
  trackId: string;
  rating: number | null; // 1-10 excluding 5
  comment: string;
  wantsOtherStyle: boolean;
}