import styles from './Portfolio.module.scss';
import songsAll from './../../data/songsCards.json';
import { useTranslation } from 'react-i18next';
import { Footer } from '../shared/Footer';
import { useAppSelector } from '../../app/hooks';
import { ServicesSwiper } from '../shared/ServicesSwiper';
import { SongCard } from '../shared/SongCard';
import { Loader } from '../Loader';
import { ContactUs } from '../shared/ContactUs';
import { SongsList } from '../shared/SongsList';
import simplePhoto from './../../data/simplePhotos.json';
export const Portfolio = () => {
  const { t } = useTranslation();
  const currentSong = useAppSelector((state) => state.player.currentSong);
  const currentLanguuage = useAppSelector(
    (state) => state.current.currentLanguage
  );

  const topSongs = songsAll.filter((song) => song.top);

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
          <h2 className={styles.topSongs__title}>{t('portfolio_top')}</h2>

          {songsAll ? (
            <div className={styles.topSongs__swiper}>
              <ServicesSwiper
                type='type1'
                songsCards={topSongs}
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

      <div className={styles.banner1Wrapper}>
        <section className={styles.banner1}>
          <img
            className={styles.banner1__star}
            src='./images/baner-star.png'
            alt='image-star'
          />

          <h2 className={`${styles.banner1__text} ${styles.banner1__text_1}`}>
            {t('portfolio_banner1_text1')}
          </h2>
          <h2 className={`${styles.banner1__text} ${styles.banner1__text_2}`}>
            {t('portfolio_banner1_text2')}
          </h2>
          <div className={styles.banner1__textBlock}>
            <h2 className={`${styles.banner1__text} ${styles.banner1__text_3}`}>
              {t('portfolio_banner1_text3')}
            </h2>
            <h2 className={`${styles.banner1__text} ${styles.banner1__text_4}`}>
              {t('portfolio_banner1_text4')}
            </h2>
          </div>
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
                {songsAll ? (
                  <>
                    <SongsList tracks={songsAll} visual='mini' />
                  </>
                ) : (
                  <Loader />
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
  );
};
