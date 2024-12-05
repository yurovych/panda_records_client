import styles from './SongCard.module.scss';
import { SongTrackType } from './../../../types/SongTrack';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentSong } from '../../../slices/current';

type SongTrackProps = {
  track: SongTrackType;
};

export const SongCard: React.FC<SongTrackProps> = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElem = useRef<HTMLAudioElement | null>(null);
  const searchBarElement = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.current.currentSong);
  const audio = audioElem.current;

  const playPauseTrack = () => {
    const audio = audioElem.current;
    audio?.load();

    if (isPlaying) {
      dispatch(setCurrentSong(null));
      setIsPlaying(false);
    } else {
      dispatch(setCurrentSong(track));
      setIsPlaying(true);
    }
  };

  const onPlaying = () => {
    const duration = audio?.duration;
    const currentTime = audio?.currentTime;

    if (duration && currentTime && currentSong) {
      dispatch(
        setCurrentSong({
          ...currentSong,
          progress: (currentTime / duration) * 100,
          song_length: duration,
        })
      );
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    dispatch(setCurrentSong(null));
  };

  useEffect(() => {
    if (!audio) return;

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  useEffect(() => {
    if (track.id !== currentSong?.id) {
      setIsPlaying(false);
    }

    const audio = audioElem.current;

    if (!audio) return;

    isPlaying && track.id === currentSong?.id ? audio.play() : audio.load();
  }, [isPlaying, currentSong?.id, track.id, audio]);

  const dragRunner = (event: React.MouseEvent<HTMLDivElement>) => {
    let position = searchBarElement.current?.clientWidth;
    const offset = event.nativeEvent.offsetX;

    let songProgress;

    if (position) {
      songProgress = (offset / position) * 100;
    }

    if (
      audioElem.current &&
      songProgress &&
      currentSong &&
      currentSong.song_length
    ) {
      audioElem.current.currentTime =
        (songProgress / 100) * currentSong.song_length;
    }
  };

  const shownProgress = () => {
    if (track.id !== currentSong?.id) {
      return '0:00';
    }

    if (audio) {
      const minutes = Math.trunc(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60)
        .toString()
        .padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    return '0:00';
  };

  const shownDuration = () => {
    if (audio) {
      const minutes = Math.trunc(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60)
        .toString()
        .padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    return '0:00';
  };

  return (
    <div className={styles.item}>
      <audio
        onTimeUpdate={onPlaying}
        ref={audioElem}
        src={track.audio_file}
      ></audio>

      <img className={styles.item__photo} src={track.photo} alt='foto' />

      <div className={styles.item__bottomBlock}>
        <div className={styles.item__info}>
          <h4 className={styles.item__title}>{track.title}</h4>

          <h5 className={styles.item__artist}>{track.artist}</h5>

          <div className={styles.item__time}>
            <p className={styles.item__time_element}>
              {isPlaying ? shownProgress() : '0:00'}
            </p>

            <p className={styles.item__time_element}>
              {shownDuration() || '0:00'}
            </p>
          </div>

          <div
            ref={searchBarElement}
            onClick={dragRunner}
            className={styles.item__searchBar}
          >
            <div
              style={{
                width: `${
                  isPlaying
                    ? track.id === currentSong?.id &&
                      currentSong?.progress + '%'
                    : 0
                }`,
              }}
              className={styles.item__searchBar_runner}
            ></div>
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
    </div>
  );
};
