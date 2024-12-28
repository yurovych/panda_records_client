import styles from './SongCard.module.scss';
import { SongTrackType } from './../../../types/SongTrack';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setCurrentSongIndex,
  setCurrentSongProgress,
  setCurrentSong,
  setIsSongPlaying,
} from '../../../slices/playerSlice';
import { Loader } from '../../Loader';
// import allSongs from './../../../data/songsCards.json';

type SongTrackProps = {
  track: SongTrackType;
  visual: 'card' | 'strip' | 'mini' | 'player';
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
  const isSongPlaying = useAppSelector((state) => state.player.isSongPlaying);
  const currentSongIndex = useAppSelector(
    (state) => state.player.currentSongIndex
  );
  const allSongs = useAppSelector((state) => state.songs.objects);

  (function getCurrentIndex() {
    const index = allSongs.findIndex((song) => song.id === currentSong?.id);

    dispatch(setCurrentSongIndex(index));
  })();

  function toggleTrack(track: SongTrackType) {
    if (!track.audio_file) {
      dispatch(setCurrentSong(track));
      dispatch(setIsSongPlaying(false));
      dispatch(setCurrentSongProgress(null));
    } else if (currentSong?.id === track.id) {
      if (isSongPlaying) {
        dispatch(setIsSongPlaying(false));
      } else {
        dispatch(setIsSongPlaying(true));
      }
    } else {
      dispatch(setCurrentSong(track));
      dispatch(setIsSongPlaying(true));
    }
  }

  function closePlayer() {
    dispatch(setIsSongPlaying(false));
    dispatch(setCurrentSong(null));
  }

  function prevSong() {
    dispatch(setIsSongPlaying(true));

    if (currentSongIndex === null) {
      dispatch(setCurrentSong(allSongs[0]));
    } else if (currentSongIndex === 0) {
      dispatch(setCurrentSong(allSongs[allSongs.length - 1]));
    } else {
      dispatch(setCurrentSong(allSongs[currentSongIndex - 1]));
    }
  }

  function nextSong() {
    dispatch(setIsSongPlaying(true));

    if (currentSongIndex === null) {
      dispatch(setCurrentSong(allSongs[0]));
    } else if (currentSongIndex === null) {
      dispatch(setCurrentSong(allSongs[0]));
    } else if (currentSongIndex === allSongs.length - 1) {
      dispatch(setCurrentSong(allSongs[0]));
    } else {
      dispatch(setCurrentSong(allSongs[currentSongIndex + 1]));
    }
  }

  function dragRunner(event: React.MouseEvent<HTMLDivElement>) {
    let position = searchBarElement.current?.clientWidth;
    const offset = event.nativeEvent.offsetX;

    let songProgress;

    if (position) {
      songProgress = (offset / position) * 100;
    }

    if (currentSong?.id === track.id && currentSong?.progress && songProgress) {
      dispatch(
        setCurrentSongProgress(songProgress / 2)
        // setCurrentSongProgress((songProgress / 100) * currentSong.song_length)
      );
    }
  }

  function shownProgress() {
    if (track.id !== currentSong?.id) {
      return '0:00';
    }

    if (track.audio_file && currentSong?.progress) {
      const minutes = Math.trunc(currentSong.progress / 60);
      const seconds = Math.floor(currentSong.progress % 60)
        .toString()
        .padStart(2, '0');
      return `${minutes}:${seconds}`;
    }

    return '0:00';
  }

  function shownDuration() {
    if (track.audio_file && track.id !== currentSong?.id) {
      return '0:00';
    }

    if (currentSong?.duration) {
      const minutes = Math.trunc(currentSong.duration / 60);
      const seconds = Math.floor(currentSong.duration % 60)
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
                {track.id === currentSong?.id && !track.audio_file ? (
                  <Loader />
                ) : (
                  <img
                    onClick={() => toggleTrack(track)}
                    className={styles.card__button}
                    src={
                      isSongPlaying && currentSong?.id === track.id
                        ? './icons/pause-black-ico.svg'
                        : './icons/play-black-ico.svg'
                    }
                    alt='play'
                  />
                )}
                {isSongPlaying &&
                  currentSong?.id === track.id &&
                  track.audio_file && (
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

            <div className={styles.progress}>
              <div className={styles.progress__time}>
                <p className={styles.progress__time_element}>
                  {shownProgress() || '0:00'}
                </p>

                <p className={styles.progress__time_element}>/</p>

                <p className={styles.progress__time_element}>
                  {shownDuration() || '0:00'}
                </p>
              </div>

              <div
                ref={searchBarElement}
                onClick={dragRunner}
                className={styles.progress__searchBar}
              >
                <div
                  style={{
                    width: `${
                      track.audio_file &&
                      track.id === currentSong?.id &&
                      currentSong?.progress &&
                      currentSong.duration
                        ? (currentSong?.progress / currentSong.duration) * 100 +
                          '%'
                        : 0
                    }`,
                  }}
                  className={styles.progress__searchBar_runner}
                ></div>

                <div className={styles.progress__searchBar_runnerSpot}></div>
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

                <div className={styles.progress}>
                  <div className={styles.progress__time}>
                    <p className={styles.progress__time_element}>
                      {shownProgress() || '0:00'}
                    </p>

                    <p className={styles.progress__time_element}>/</p>

                    <p className={styles.progress__time_element}>
                      {shownDuration() || '0:00'}
                    </p>
                  </div>

                  <div
                    ref={searchBarElement}
                    onClick={dragRunner}
                    className={styles.progress__searchBar}
                  >
                    <div
                      style={{
                        width: `${
                          track.audio_file &&
                          track.id === currentSong?.id &&
                          currentSong?.progress &&
                          currentSong.duration
                            ? (currentSong?.progress / currentSong.duration) *
                                100 +
                              '%'
                            : 0
                        }`,
                      }}
                      className={styles.progress__searchBar_runner}
                    ></div>

                    <div
                      className={styles.progress__searchBar_runnerSpot}
                    ></div>
                  </div>
                </div>
              </div>

              <div className={styles.strip__control}>
                {track.id === currentSong?.id && !track.audio_file ? (
                  <Loader />
                ) : (
                  <img
                    onClick={() => toggleTrack(track)}
                    className={styles.strip__playPause}
                    src={
                      isSongPlaying && currentSong?.id === track.id
                        ? './icons/pause-black-ico.svg'
                        : './icons/play-black-ico.svg'
                    }
                    alt='play'
                  />
                )}
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
              {isSongPlaying && currentSong && currentSong.id === track.id ? (
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
              ) : !isSongPlaying &&
                currentSong &&
                currentSong.id === track.id ? (
                <img
                  className={styles.mini__button}
                  src='./icons/pause-black-mini-ico.svg'
                  alt='play'
                />
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

      case 'player':
        return (
          <div className={` ${styles.player}`}>
            <div className={styles.player__topSector}>
              <img
                className={styles.player__photo}
                src={currentSong?.photo}
                alt='foto'
              />

              <div className={styles.player__right}>
                <div className={styles.player__info}>
                  <h4 className={styles.player__title}>{currentSong?.title}</h4>

                  <h5 className={styles.player__artist}>
                    {currentSong?.artist}
                  </h5>
                </div>

                <div className={styles.player__playPauseWrapper}>
                  {track.id === currentSong?.id && !track.audio_file ? (
                    <Loader />
                  ) : (
                    <img
                      onClick={() => toggleTrack(track)}
                      className={styles.player__playPause}
                      src={
                        isSongPlaying && currentSong?.id === track.id
                          ? './icons/pause-pink-ico.svg'
                          : './icons/play-pink-ico.svg'
                      }
                      alt='play'
                    />
                  )}

                  <img
                    onClick={() => closePlayer()}
                    className={styles.player__closeButton}
                    src='./icons/close-ico.svg'
                    alt='close'
                  />
                </div>
              </div>
            </div>

            <div className={styles.player__bottomSector}>
              <div className={styles.progress}>
                <div className={styles.progress__time}>
                  <img
                    onClick={() => prevSong()}
                    className={`${styles.player__songChange} ${styles.player__prevSong}`}
                    src='./icons/previous-black-ico.svg'
                    alt='prev-song'
                  />

                  <p className={styles.progress__time_element}>
                    {shownProgress() || '0:00'}
                  </p>

                  <p className={styles.progress__time_element}>/</p>

                  <p className={styles.progress__time_element}>
                    {shownDuration() || '0:00'}
                  </p>

                  <img
                    onClick={() => nextSong()}
                    className={`${styles.player__songChange} ${styles.player__prevSong}`}
                    src='./icons/next-black-ico.svg'
                    alt='next-song'
                  />
                </div>

                <div
                  ref={searchBarElement}
                  onClick={dragRunner}
                  className={styles.progress__searchBar}
                >
                  <div
                    style={{
                      width: `${
                        track.audio_file &&
                        track.id === currentSong?.id &&
                        currentSong?.progress &&
                        currentSong.duration
                          ? (currentSong?.progress / currentSong.duration) *
                              100 +
                            '%'
                          : 0
                      }`,
                    }}
                    className={styles.progress__searchBar_runner}
                  ></div>

                  <div className={styles.progress__searchBar_runnerSpot}></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  return <>{vizualisation()}</>;
};
