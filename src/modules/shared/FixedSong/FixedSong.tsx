import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentSong, setIsPlaying } from '../../../slices/playerSlice';
import styles from './FixedSong.module.scss';

export const FixedSong = () => {
  const currentSong = useAppSelector((state) => state.player.currentSong);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);

  const dispatch = useAppDispatch();

  function stopTrack() {
    dispatch(setCurrentSong(null));
    dispatch(setIsPlaying(false));
  }

  return (
    <div
      className={`${
        isPlaying && currentSong ? styles.showPlayer : styles.hidePlayer
      } ${styles.player}`}
    >
      <img
        className={styles.player__photo}
        src={currentSong?.photo}
        alt='foto'
      />

      <div className={styles.player__right}>
        <div className={styles.player__info}>
          <h4 className={styles.player__title}>{currentSong?.title}</h4>

          <h5 className={styles.player__artist}>{currentSong?.artist}</h5>
        </div>

        <div className={styles.stopButton}>
          <div
            title='stop'
            onClick={() => stopTrack()}
            className={styles.songAnimation}
          >
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
        </div>
      </div>
    </div>
  );
};
