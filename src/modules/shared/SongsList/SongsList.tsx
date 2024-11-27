// import styles from './SongsList.module.scss';

import { SongTrack } from '../SongsTrack';
import { SongTrackType } from './../../../types/SongTrack';

type SongsListProps = {
  tracks: SongTrackType[];
};

export const SongsList = ({ tracks }: SongsListProps) => {
  return (
    <>
      {tracks.map((track) => (
        <SongTrack track={track} key={track.id} />
      ))}
    </>
  );
};
