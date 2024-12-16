import styles from './SongCard.module.scss';
import { SongTrackType } from './../../../types/SongTrack';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setCurrentProgress,
  setCurrentSong,
  setIsPlaying,
} from '../../../slices/playerSlice';

type SongTrackProps = {
  track: SongTrackType;
  visual: 'card' | 'strip' | 'mini';
  index?: number;
};

export const SongCard: React.FC<SongTrackProps> = ({
  index,
  track,
  visual,
}) => {
  const searchBarElement = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.player.currentSong);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);

  function toggleTrack(track: SongTrackType) {
    if (currentSong?.id === track.id) {
      if (isPlaying) {
        dispatch(setIsPlaying(false));
        dispatch(setCurrentSong(null));
      } else {
        dispatch(setIsPlaying(true));
      }
    } else {
      dispatch(setCurrentSong(track));
      dispatch(setIsPlaying(true));
    }
  }

  function dragRunner(event: React.MouseEvent<HTMLDivElement>) {
    let position = searchBarElement.current?.clientWidth;
    const offset = event.nativeEvent.offsetX;

    let songProgress;

    if (position) {
      songProgress = (offset / position) * 100;
    }

    if (
      currentSong?.id === track.id &&
      currentSong?.progress &&
      songProgress &&
      currentSong.song_length
    ) {
      dispatch(
        setCurrentProgress((songProgress / 100) * currentSong.song_length)
      );
    }
  }

  function shownProgress() {
    if (track.id !== currentSong?.id) {
      return '0:00';
    }

    if (currentSong.progress) {
      const minutes = Math.trunc(currentSong.progress / 60);
      const seconds = Math.floor(currentSong.progress % 60)
        .toString()
        .padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    return '0:00';
  }

  function shownDuration() {
    if (track.id !== currentSong?.id) {
      return '0:00';
    }

    if (currentSong.song_length) {
      const minutes = Math.trunc(currentSong.song_length / 60);
      const seconds = Math.floor(currentSong.song_length % 60)
        .toString()
        .padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    return '0:00';
  }

  function vizualisation() {
    switch (visual) {
      case 'card':
        return (
          <div className={styles.card}>
            <img
              className={styles.card__photo}
              src={track.photo || './images/big-logo.png'}
              alt='foto'
            />

            <div className={styles.card__top}>
              <div className={styles.card__info}>
                <h4 title={track.title} className={styles.card__title}>
                  {track.title}
                </h4>

                <h5 title={track.artist} className={styles.card__artist}>
                  {track.artist}
                </h5>
              </div>

              <div className={styles.card__buttonWrapper}>
                <img
                  onClick={() => toggleTrack(track)}
                  className={`${styles.card__button} ${
                    isPlaying && currentSong?.id === track.id && styles.rotate
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
                      isPlaying &&
                      track.id === currentSong?.id &&
                      currentSong?.progress &&
                      currentSong.song_length
                        ? (currentSong?.progress / currentSong.song_length) *
                            100 +
                          '%'
                        : 0
                    }`,
                  }}
                  className={styles.card__searchBar_runner}
                ></div>

                <div className={styles.card__searchBar_runnerSpot}></div>
              </div>
            </div>
          </div>
        );

      case 'strip':
        return (
          <div className={styles.strip}>
            <div className={styles.strip__content}>
              <img
                className={styles.strip__photo}
                src={track.photo || './images/big-logo.png'}
                alt='foto'
              />

              <div className={styles.strip__info}>
                <h4 title={track.title} className={styles.strip__title}>
                  {track.title}
                </h4>

                <h5 title={track.artist} className={styles.strip__artist}>
                  {track.artist}
                </h5>

                <div className={styles.strip__progress}>
                  <div className={styles.strip__time}>
                    <p className={styles.strip__time_element}>
                      {isPlaying ? shownProgress() : '0:00'}
                    </p>

                    <p className={styles.strip__time_element}>/</p>

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
                          isPlaying &&
                          track.id === currentSong?.id &&
                          currentSong?.progress &&
                          currentSong.song_length
                            ? (currentSong?.progress /
                                currentSong.song_length) *
                                100 +
                              '%'
                            : 0
                        }`,
                      }}
                      className={styles.strip__searchBar_runner}
                    ></div>

                    <div className={styles.strip__searchBar_runnerSpot}></div>
                  </div>
                </div>
              </div>

              <div className={styles.strip__buttonWrapper}>
                <img
                  onClick={() => toggleTrack(track)}
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
                {/* {isPlaying && currentSong?.id === track.id && (
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
                )} */}
              </div>
            </div>
          </div>
        );

      case 'mini':
        return (
          <div
            onClick={() => toggleTrack(track)}
            className={styles.mini__song}
            key={track.id}
          >
            <div className={styles.mini__data}>
              {isPlaying && currentSong && currentSong.id === track.id ? (
                <div title='stop' className={styles.miniSongAnimation}>
                  <div
                    className={`${styles.miniSongAnimation__bar} ${styles.songAnimation__bar_1}`}
                  ></div>
                  <div
                    className={`${styles.miniSongAnimation__bar} ${styles.songAnimation__bar_2}`}
                  ></div>
                  <div
                    className={`${styles.miniSongAnimation__bar} ${styles.songAnimation__bar_3}`}
                  ></div>
                </div>
              ) : (
                <img
                  className={styles.mini__button}
                  src='./icons/play-triangle-ico.svg'
                  alt='play'
                />
              )}

              <p className={styles.mini__songText}>
                &nbsp;&nbsp;&nbsp;{index && index}.&nbsp;
              </p>

              <p
                className={`${styles.mini__songText} ${styles.mini__songDetails}`}
              >
                {track.artist || 'Unnown singer'}&nbsp;-&nbsp;
                {track.title || 'Unnown song title'}
              </p>
            </div>

            <div className={styles.mini__songLine}></div>
          </div>
        );
    }
  }

  return (
    <>
      {vizualisation()}
      {/* {visual === 'card' ? (
        <div className={styles.card}>
          <img
            className={styles.card__photo}
            src={track.photo || './images/big-logo.png'}
            alt='foto'
          />

          <div className={styles.card__top}>
            <div className={styles.card__info}>
              <h4 title={track.title} className={styles.card__title}>
                {track.title}
              </h4>

              <h5 title={track.artist} className={styles.card__artist}>
                {track.artist}
              </h5>
            </div>

            <div className={styles.card__buttonWrapper}>
              <img
                onClick={() => toggleTrack(track)}
                className={`${styles.card__button} ${
                  isPlaying && currentSong?.id === track.id && styles.rotate
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
                    isPlaying &&
                    track.id === currentSong?.id &&
                    currentSong?.progress &&
                    currentSong.song_length
                      ? (currentSong?.progress / currentSong.song_length) *
                          100 +
                        '%'
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
          <div className={styles.strip__content}>
            <img
              className={styles.strip__photo}
              src={track.photo || './images/big-logo.png'}
              alt='foto'
            />

            <div className={styles.strip__info}>
              <h4 title={track.title} className={styles.strip__title}>
                {track.title}
              </h4>

              <h5 title={track.artist} className={styles.strip__artist}>
                {track.artist}
              </h5>

              <div className={styles.strip__progress}>
                <div className={styles.strip__time}>
                  <p className={styles.strip__time_element}>
                    {isPlaying ? shownProgress() : '0:00'}
                  </p>

                  <p className={styles.strip__time_element}>/</p>

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
                        isPlaying &&
                        track.id === currentSong?.id &&
                        currentSong?.progress &&
                        currentSong.song_length
                          ? (currentSong?.progress / currentSong.song_length) *
                              100 +
                            '%'
                          : 0
                      }`,
                    }}
                    className={styles.strip__searchBar_runner}
                  ></div>

                  <div className={styles.strip__searchBar_runnerSpot}></div>
                </div>
              </div>
            </div>

            <div className={styles.strip__buttonWrapper}>
              <img
                onClick={() => toggleTrack(track)}
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
        </div>
      )} */}
    </>
  );
};
