export type SongTrackType = {
  id: number;
  title: string;
  artist: string;
  photo: string;
  audio_file: string;
  progress?: number | undefined;
  duration: number | null;
  top?: boolean;
};
