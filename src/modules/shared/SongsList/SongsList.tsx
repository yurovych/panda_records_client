// import styles from './SongsList.module.scss';

import { SongCard } from '../SongCard';
import { SongTrackType } from './../../../types/SongTrack';

type SongsListProps = {
  tracks: SongTrackType[];
  visual: 'card' | 'strip';
};

export const SongsList = ({ tracks, visual }: SongsListProps) => {
  return (
    <>
      {tracks.map((track) => (
        <SongCard track={track} visual={visual} key={track.id} />
      ))}
    </>
  );
};
