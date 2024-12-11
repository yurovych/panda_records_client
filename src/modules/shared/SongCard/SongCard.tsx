import styles from './SongCard.module.scss';
import { SongTrackType } from './../../../types/SongTrack';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setCurrentSong,
  setIsPlaying,
  toggleTrack,
} from '../../../slices/playerSlice';

type SongTrackProps = {
  track: SongTrackType;
  visual: 'card' | 'strip';
};

export const SongCard: React.FC<SongTrackProps> = ({ track, visual }) => {
  const audioElem = useRef<HTMLAudioElement | null>(null);
  const searchBarElement = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.player.currentSong);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);
  const audio = audioElem.current;

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

  useEffect(() => {
    const handleEnded = () => {
      dispatch(setIsPlaying(false));
      dispatch(setCurrentSong(null));
    };

    if (!audio) return;

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  useEffect(() => {
    const audio = audioElem.current;
    if (!audio) return;

    if (isPlaying && track.id === currentSong?.id) {
      audio
        .play()
        .catch((error) => console.error('Помилка відтворення:', error));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isPlaying, currentSong?.id, track.id]);

  function dragRunner(event: React.MouseEvent<HTMLDivElement>) {
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
  }

  function shownProgress() {
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
  }

  function shownDuration() {
    if (audio) {
      const minutes = Math.trunc(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60)
        .toString()
        .padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    return '0:00';
  }

  return (
    <>
      {visual === 'card' ? (
        <div className={styles.card}>
          <audio
            onTimeUpdate={onPlaying}
            ref={audioElem}
            src={track.audio_file}
          ></audio>

          <img
            className={styles.card__photo}
            src={track.photo || './images/big-logo.png'}
            alt='foto'
          />

          <div className={styles.card__top}>
            <div className={styles.card__info}>
              <h4 className={styles.card__title}>{track.title}</h4>

              <h5 className={styles.card__artist}>{track.artist}</h5>
            </div>

            <div className={styles.card__buttonWrapper}>
              <img
                onClick={() => dispatch(toggleTrack(track))}
                className={`${styles.card__button} ${
                  isPlaying &&
                  isPlaying &&
                  currentSong?.id === track.id &&
                  styles.rotate
                } `}
                src={
                  isPlaying && currentSong?.id === track.id
                    ? './icons/stop-audio-ico.svg'
                    : './icons/play-ico.svg'
                }
                alt='play'
              />
              {isPlaying && currentSong?.id === track.id && (
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
            </div>
          </div>

          <div className={styles.card__bottom}>
            <div className={styles.card__time}>
              <p className={styles.card__time_element}>
                {isPlaying ? shownProgress() : '0:00'}
              </p>

              <p className={styles.card__time_element}>
                {shownDuration() || '0:00'}
              </p>
            </div>

            <div
              ref={searchBarElement}
              onClick={dragRunner}
              className={styles.card__searchBar}
            >
              <div
                style={{
                  width: `${
                    isPlaying && track.id === currentSong?.id
                      ? currentSong?.progress + '%'
                      : 0
                  }`,
                }}
                className={styles.card__searchBar_runner}
              ></div>

              <div className={styles.card__searchBar_runnerSpot}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.strip}>
          <audio
            onTimeUpdate={onPlaying}
            ref={audioElem}
            src={track.audio_file}
          ></audio>

          <div className={styles.strip__top}>
            <img
              className={styles.strip__photo}
              src={track.photo || './images/big-logo.png'}
              alt='foto'
            />

            <div className={styles.strip__info}>
              <h4 className={styles.strip__title}>{track.title}</h4>

              <h5 className={styles.strip__artist}>{track.artist}</h5>
            </div>

            <div className={styles.strip__buttonWrapper}>
              <img
                onClick={() => dispatch(toggleTrack(track))}
                className={`${styles.strip__button} ${
                  isPlaying &&
                  isPlaying &&
                  currentSong?.id === track.id &&
                  styles.rotate
                } `}
                src={
                  isPlaying && currentSong?.id === track.id
                    ? './icons/stop-audio-ico.svg'
                    : './icons/play-ico.svg'
                }
                alt='play'
              />
              {isPlaying && currentSong?.id === track.id && (
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
            </div>
          </div>

          <div className={styles.strip__bottom}>
            <div className={styles.strip__time}>
              <p className={styles.strip__time_element}>
                {isPlaying ? shownProgress() : '0:00'}
              </p>

              <p className={styles.strip__time_element}>
                {shownDuration() || '0:00'}
              </p>
            </div>

            <div
              ref={searchBarElement}
              onClick={dragRunner}
              className={styles.strip__searchBar}
            >
              <div
                style={{
                  width: `${
                    isPlaying && track.id === currentSong?.id
                      ? currentSong?.progress + '%'
                      : 0
                  }`,
                }}
                className={styles.strip__searchBar_runner}
              ></div>

              <div className={styles.strip__searchBar_runnerSpot}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
