import styles from './Portfolio.module.scss';
import { useTranslation } from 'react-i18next';
import { Footer } from '../shared/Footer';
import { useAppSelector } from '../../app/hooks';
import { ServicesSwiper } from '../shared/ServicesSwiper';
import { SongCard } from '../shared/SongCard';
import { Loader } from '../Loader';
import { ContactUs } from '../shared/ContactUs';
import { SongsList } from '../shared/SongsList';
import simplePhoto from './../../data/simplePhotos.json';
import songsAll from './../../data/songsCards.json';

export const Portfolio = () => {
  const { t } = useTranslation();

  const currentSong = useAppSelector((state) => state.player.currentSong);
  const currentLanguuage = useAppSelector(
    (state) => state.current.currentLanguage
  );
  // const songsAll = useAppSelector((state) => state.songs.objects);
  const songsFetchError = useAppSelector((state) => state.songs.error);

  const topSongs = songsAll.filter((song) => song.top);

  return (
    <>
      <div className={styles.portfolio}>
        <div className={styles.topSongsWrapper}>
          <section className={styles.topSongs}>
            <div className={styles.stars}>
              <img
                className={`${styles.stars__star} ${styles.stars__star_star1}`}
                src='/images/songs-star-big.png'
                alt='star_ico'
              />
              <img
                className={`${styles.stars__star} ${styles.stars__star_star2}`}
                src='/images/songs-star-avarage.png'
                alt='star_ico'
              />
              <img
                className={`${styles.stars__star} ${styles.stars__star_star3}`}
                src='/images/songs-star-small.png'
                alt='star_ico'
              />
            </div>
            <h2 className={styles.topSongs__title}>{t('portfolio_top')}</h2>

            {topSongs.length > 0 ? (
              <div className={styles.topSongs__swiper}>
                <ServicesSwiper
                  type='type1'
                  songsCards={topSongs}
                  SongToRender={SongCard}
                />
              </div>
            ) : songsFetchError ? (
              <p
                className={`${styles.fetchError} notification is-danger is-light`}
              >
                {songsFetchError}
              </p>
            ) : (
              <>
                <p className={styles.noSongsYet}>{t('no_songs_yet')}</p>
                <Loader />
              </>
            )}
          </section>
        </div>

        <div className={styles.banner1Wrapper}>
          <section className={styles.banner1}>
            <p className={styles.banner1__text}>
              {t('portfolio_banner1_text')}
            </p>
          </section>
        </div>

        <div className={styles.allSongsWrapper}>
          <section className={styles.allSongs}>
            <h2 className={styles.allSongs__title}>{t('portfolio_all')}</h2>

            <div className={styles.allSongs__main}>
              <div className={styles.allSongs__sliderWrapper}>
                <ServicesSwiper simplePhotos={simplePhoto} type='type3' />
              </div>

              <div className={styles.allSongs__listWrapper}>
                <div className={styles.allSongs__listHeader}>
                  {currentSong ? (
                    <SongCard track={currentSong} visual='strip' />
                  ) : (
                    <div className={styles.allSongs__listBanner}>
                      <p className={styles.allSongs__listBannnerText}>
                        {t('portfolio_all_listTitle')}
                      </p>
                    </div>
                  )}
                </div>

                <div className={styles.allSongs__list}>
                  {songsAll.length > 0 ? (
                    <>
                      <SongsList tracks={songsAll} visual='mini' />
                    </>
                  ) : songsFetchError ? (
                    <p
                      className={`${styles.fetchError} notification is-danger is-light`}
                    >
                      {songsFetchError}
                    </p>
                  ) : (
                    <>
                      <p className={styles.noSongsYet}>{t('no_songs_yet')}</p>
                      <Loader />
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.banner2Wrapper}>
          <section className={styles.banner2}>
            {currentLanguuage === 'ua' ? (
              <div className={styles.banner2__content}>
                <p className={styles.banner2__text}>
                  Твоя музика варта <b>бути почутою</b>!
                </p>
                <p className={styles.banner2__text}>
                  <b>Перетвори ідею</b> в хітовий трек!
                </p>
              </div>
            ) : (
              <div className={styles.banner2__content}>
                <p className={styles.banner2__text}>
                  Your music deserves <b>to be heard</b>!
                </p>
                <p className={styles.banner2__text}>
                  <b>Turn your idea</b> into a track!
                </p>
              </div>
            )}
          </section>
        </div>

        <ContactUs />

        <Footer />
      </div>
    </>
  );
};
