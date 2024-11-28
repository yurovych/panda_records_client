import styles from './SongsTrack.module.scss';
import { SongTrackType } from './../../../types/SongTrack';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentSongId } from '../../../slices/current';

type SongTrackProps = {
  track: SongTrackType;
};

export const SongTrack = ({ track }: SongTrackProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElem = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();
  const currentSongId = useAppSelector((state) => state.current.currentSongId);

  const playPauseTrack = () => {
    dispatch(setCurrentSongId(track.id));

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioElem.current;
    if (!audio) return;

    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  useEffect(() => {
    if (track.id !== currentSongId) {
      setIsPlaying(false);
    }

    const audio = audioElem.current;
    if (!audio) return;

    isPlaying && track.id === currentSongId ? audio.play() : audio.load();
  }, [isPlaying, currentSongId, track.id]);

  return (
    <div className={styles.item}>
      <audio ref={audioElem} src={track.audio_file}></audio>

      <div className={styles.item__content}>
        <img className={styles.item__photo} src={track.photo} alt='foto' />

        <div className={styles.item__info}>
          <h4 className={styles.item__title}>{track.title}</h4>
          <h5 className={styles.item__artist}>{track.artist}</h5>
        </div>
      </div>

      <div onClick={playPauseTrack} className={styles.item__buttonWrapper}>
        {isPlaying && (
          <div className={styles.songAnimation}>
            <div
              className={`${styles.songAnimation__bar} ${styles.songAnimation__bar_1}`}
            ></div>
            <div
              className={`${styles.songAnimation__bar} ${styles.songAnimation__bar_2}`}
            ></div>
            <div
              className={`${styles.songAnimation__bar} ${styles.songAnimation__bar_3}`}
            ></div>
          </div>
        )}

        <img
          className={`${styles.item__button} ${isPlaying && styles.rotate} `}
          src={
            isPlaying ? './icons/stop-audio-ico.svg' : './icons/play-ico.svg'
          }
          alt='play'
        />
      </div>
    </div>
  );
};
