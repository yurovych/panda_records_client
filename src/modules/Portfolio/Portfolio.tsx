import { SongsList } from '../shared/SongsList';
import styles from './Portfolio.module.scss';
import songsAll from './../../data/songsCards.json';
import { useTranslation } from 'react-i18next';
import { Footer } from '../shared/Footer';
import { useAppSelector } from '../../app/hooks';
import { ServicesSwiper } from '../shared/ServicesSwiper';
import { SongCard } from '../shared/SongCard';
import { Loader } from '../Loader';

export const Portfolio = () => {
  // const songsList = useAppSelector((state) => state.songs.objects);
  const { t } = useTranslation();
  const currentSong = useAppSelector((state) => state.player.currentSong);

  return (
    <div className={styles.portfolio}>
      <div className={styles.topSongsWrapper}>
        <section className={styles.topSongs}>
          <div className={styles.stars}>
            <img
              className={`${styles.stars__star} ${styles.stars__star_star1}`}
              src='./images/songs-star-big.png'
              alt='star_ico'
            />
            <img
              className={`${styles.stars__star} ${styles.stars__star_star2}`}
              src='./images/songs-star-avarage.png'
              alt='star_ico'
            />
            <img
              className={`${styles.stars__star} ${styles.stars__star_star3}`}
              src='./images/songs-star-small.png'
              alt='star_ico'
            />
          </div>
          <h2 className={styles.topSongs__title}> Our Top Works</h2>

          {songsAll ? (
            <div className={styles.topSongs__swiper}>
              <ServicesSwiper
                type='type1'
                songsCards={songsAll}
                SongToRender={SongCard}
              />
            </div>
          ) : (
            <div className={styles.topSongs__swiper}>
              <Loader />
            </div>
          )}
        </section>
      </div>

      <div className={styles.allSongsWrapper}>
        <section className={styles.allSongs}>
          <div className={styles.stars2}>
            <img
              className={`${styles.stars2__star} ${styles.stars2__star_star1}`}
              src='./images/songs-star-big.png'
              alt='star_ico'
            />
            <img
              className={`${styles.stars2__star} ${styles.stars2__star_star2}`}
              src='./images/songs-star-avarage.png'
              alt='star_ico'
            />
            <img
              className={`${styles.stars2__star} ${styles.stars2__star_star3}`}
              src='./images/songs-star-small.png'
              alt='star_ico'
            />
          </div>
          <h2 className={styles.allSongs__title}>More Our Works</h2>

          <div className={styles.allSongs__main}>
            <div className={styles.allSongs__image}>
              <img
                className={styles.allSongs__imageItself}
                src={currentSong?.photo || './images/big-logo.png'}
                alt='song_imege'
              />
            </div>

            <div className={styles.allSongs__list}>
              {songsAll ? (
                <SongsList tracks={songsAll} visual='strip' />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};
