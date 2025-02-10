import styles from './HomePage.module.scss';
import { Footer } from '../../shared/Footer';
import { Button } from '../../shared/Button';
import { ServicesList } from '../../shared/ServicesList';
import { SongsList } from '../../shared/SongsList';
import { ServicesSwiper } from '../../shared/ServicesSwiper';
import { Link, useNavigate } from 'react-router-dom';
import { EquipmentList } from '../../shared/EquipmentList';
import { ContactUs } from '../../shared/ContactUs';
import { ServicesCard } from '../../shared/ServicesCard';
import { EquipmentCard } from '../../shared/EquipmentCard';
import { Loader } from '../../Loader';
import { SongTrackType } from '../../../types/SongTrack';
import { scrollPageUp } from '../../../helpers/scrollPageUp';
import { useAppSelector } from '../../../app/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VideoPlayer } from '../../shared/VideoPlayer';
import { ProcessVideoCard } from '../../shared/ProcessVideoCard';

export const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const servicesList = useAppSelector((state) => state.sevrices.objects);
  const songsList = useAppSelector((state) => state.songs.objects);
  const equipmentList = useAppSelector((state) => state.equipment.objects);
  const videosList = useAppSelector((state) => state.videos.objects);
  const currentSong = useAppSelector((state) => state.player.currentSong);
  const servicesFetchError = useAppSelector((state) => state.sevrices.error);
  const songsFetchError = useAppSelector((state) => state.songs.error);
  const videosFetchError = useAppSelector((state) => state.videos.error);

  const [shuffledSongs, setShuffledSongs] = useState<SongTrackType[]>([]);

  const guitarTeacherVideo = videosList.find(
    (video) => video.description_block1
  );

  async function handleTextMeClick() {
    await navigate('/');
    const element = document.getElementById('contactUs');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  const shuffleSongs = (songs: SongTrackType[]) => {
    const shuffled = [...songs];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  useEffect(() => {
    if (songsList) {
      setShuffledSongs(shuffleSongs(songsList));
    }
  }, [songsList]);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.topWrapper}>
          <section className={styles.top}>
            <h3 className={styles.top__newSong}>{t('home_green_text')} </h3>

            <div className={styles.top__photo}>
              <img
                className={styles.top__photoItself}
                src='/images/top-photo.jpg'
                alt='foto'
              />
            </div>

            <h1 className={styles.top__title}>{t('home_top_title')}</h1>

            <h3 className={styles.top__text}>{t('home_top_text')}</h3>

            <div onClick={handleTextMeClick} className={styles.top__button}>
              <Button text={t('home_top_button')} />
            </div>
          </section>
        </div>

        <div className={styles.aboutUsWrapper}>
          <section className={styles.aboutUs}>
            <h2 id='aboutUsTitleId' className={styles.aboutUs__title}>
              {t('home_about_title')}
            </h2>

            <div className={styles.aboutUs__photo}>
              <img
                className={styles.aboutUs__photoItself}
                src='/images/about-us-photo.jpg'
                alt='foto'
              />
            </div>

            <p className={styles.aboutUs__text}>{t('home_about_text')}</p>

            <div
              className={`${styles.aboutUs__advantages} ${styles.aboutUs__advantages_block1}`}
            >
              <div className={styles.aboutUs__advantage}>
                <img src='/icons/checkmark-filled-ico.svg' alt='checkmark' />
                <p>{t('home_about_marker1')}</p>
              </div>

              <div className={styles.aboutUs__advantage}>
                <img src='/icons/checkmark-filled-ico.svg' alt='checkmark' />{' '}
                <p>{t('home_about_marker2')}</p>
              </div>
            </div>

            <div
              className={`${styles.aboutUs__advantages} ${styles.aboutUs__advantages_block2}`}
            >
              <div className={styles.aboutUs__advantage}>
                <img src='/icons/checkmark-filled-ico.svg' alt='checkmark' />{' '}
                <p>{t('home_about_marker3')}</p>
              </div>

              <div className={styles.aboutUs__advantage}>
                <img src='/icons/checkmark-filled-ico.svg' alt='checkmark' />{' '}
                <p>{t('home_about_marker4')}</p>
              </div>
            </div>

            <Link
              onClick={scrollPageUp}
              to='./about'
              className={styles.aboutUs__button}
            >
              <Button text={t('home_about_button')} />
            </Link>
          </section>
        </div>

        <div className={styles.servicesWrapper}>
          <section className={styles.services}>
            <h2 className={styles.services__title}>
              {t('home_services_title')}
            </h2>

            <div className={styles.services__cardsPhone}>
              {servicesList.length > 0 ? (
                <ServicesSwiper
                  type='type1'
                  servicesCards={servicesList}
                  ServiceToRender={ServicesCard}
                />
              ) : servicesFetchError ? (
                <p
                  className={`${styles.fetchError} notification is-danger is-light`}
                >
                  {servicesFetchError}
                </p>
              ) : (
                <Loader />
              )}
            </div>

            <div className={styles.services__cardstabletDesktop}>
              {servicesList.length > 0 ? (
                <ServicesList cards={servicesList} />
              ) : servicesFetchError ? (
                <p
                  className={`${styles.fetchError} notification is-danger is-light`}
                >
                  {servicesFetchError}
                </p>
              ) : (
                <Loader />
              )}
            </div>
          </section>

          <section className={styles.lessons}>
            <img
              className={styles.lessons__star}
              src='/images/services-pink-star.png'
              alt='star-foto'
            />
            <h2 className={styles.lessons__sectionTitle}>
              {t('services_lessons_title')}
            </h2>

            <div className={styles.lessons__cardsBlock}>
              <div
                className={`${styles.lessons__card} ${styles.lessons__card_1} `}
              >
                <div className={styles.lessons__image}>
                  <img
                    loading='lazy'
                    className={styles.lessons__imageItself}
                    src='/images/contactUs_image2.jpg'
                    alt='card_image'
                  />
                </div>

                <h2 className={styles.lessons__title}>
                  {t('services_lessons_engineering_title')}
                </h2>

                <p className={styles.lessons__text}>
                  {t('services_lessons_engineering_text')}
                </p>

                <div className={styles.lessons__priceBlockWrapper}>
                  <div className={styles.lessons__priceBlock}>
                    <h3 className={styles.lessons__priceBlockText}>800₴ /</h3>
                    <img
                      className={styles.lessons__clockIco}
                      src='/icons/clock-ico.svg'
                      alt='clock-ico'
                    />
                    <h3 className={styles.lessons__priceBlockText}>
                      1 {t('hour')}
                    </h3>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.lessons__card} ${styles.lessons__card_2} `}
              >
                <div className={styles.lessons__image}>
                  <img
                    loading='lazy'
                    className={styles.lessons__imageItself}
                    src='/images/guitar_lesson_services.jpg'
                    alt='card_image'
                  />
                </div>

                <h2 className={styles.lessons__title}>
                  {t('services_lessons_guitar_title')}
                </h2>

                <p className={styles.lessons__text}>
                  {t('services_lessons_guitar_text')}
                </p>

                <div className={styles.lessons__priceBlockWrapper}>
                  <div className={styles.lessons__priceBlock}>
                    <h3 className={styles.lessons__priceBlockText}>450₴ /</h3>
                    <img
                      className={styles.lessons__clockIco}
                      src='/icons/clock-ico.svg'
                      alt='clock-ico'
                    />
                    <h3 className={styles.lessons__priceBlockText}>
                      1 {t('hour')}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.videosWrapper}>
          <section className={styles.videos}>
            <h2 className={styles.videos__title}>
              {t('services_videos_title')}
            </h2>

            {videosList.length > 0 ? (
              <ServicesSwiper
                type='type1'
                videoCards={[...videosList].reverse()}
                VideoToRender={ProcessVideoCard}
              />
            ) : videosFetchError ? (
              <p
                className={`${styles.fetchError} notification is-danger is-light`}
              >
                {videosFetchError}
              </p>
            ) : (
              <Loader />
            )}
          </section>
        </div>

        <div className={styles.ourWorksWrapper}>
          <section className={styles.ourWorks}>
            <h2 className={styles.ourWorks__title}>{t('home_works_title')}</h2>

            <div className={styles.ourWorks__photo}>
              <img
                loading='lazy'
                className={styles.ourWorks__photoItself}
                src={currentSong?.photo || '/images/songs-photo.jpg'}
                alt='foto'
              />
            </div>

            {songsList.length > 0 ? (
              <div className={styles.ourWorks__list}>
                <SongsList tracks={shuffledSongs.slice(0, 2)} visual='strip' />
              </div>
            ) : songsFetchError ? (
              <div className={styles.ourWorks__list}>
                <p
                  className={`${styles.fetchError} notification is-danger is-light`}
                >
                  {songsFetchError}
                </p>
              </div>
            ) : (
              <div className={styles.ourWorks__list}>
                <p className={styles.noSongsYet}>{t('no_songs_yet')}</p>
                <Loader />
              </div>
            )}

            <Link
              onClick={scrollPageUp}
              to='./portfolio'
              className={styles.ourWorks__button}
            >
              <Button text={t('home_works_button')} />
            </Link>
          </section>
        </div>

        <div className={styles.bannerWrapper}>
          <section className={styles.banner}>
            <img
              className={styles.banner__star}
              src='/images/baner-star.png'
              alt='image-star'
            />

            <h2 className={`${styles.banner__text} ${styles.banner__text_1}`}>
              {t('home_banner1')}
            </h2>
            <h2 className={`${styles.banner__text} ${styles.banner__text_2}`}>
              {t('home_banner2')}
            </h2>
            <h2 className={`${styles.banner__text} ${styles.banner__text_3}`}>
              {t('home_banner3')}
            </h2>
            <h2 className={`${styles.banner__text} ${styles.banner__text_4}`}>
              {t('home_banner4')}
            </h2>
          </section>
        </div>

        {guitarTeacherVideo && (
          <div className={styles.lessonsWrapper}>
            <section className={styles.guitarLessons}>
              <>
                <h2 className={styles.guitarLessons__title}>
                  {guitarTeacherVideo?.title}
                </h2>

                <div className={styles.guitarLessons__video}>
                  {guitarTeacherVideo && (
                    <VideoPlayer shownVideo={guitarTeacherVideo} />
                  )}
                </div>

                <h5
                  className={`${styles.guitarLessons__desctiption} ${styles.guitarLessons__desctiption_block1}`}
                >
                  {guitarTeacherVideo?.description_block1}
                </h5>

                <h5
                  className={`${styles.guitarLessons__desctiption} ${styles.guitarLessons__desctiption_block2}`}
                >
                  {guitarTeacherVideo?.description_block2}
                </h5>

                <div
                  onClick={handleTextMeClick}
                  className={styles.guitarLessons__button}
                >
                  <Button text={t('home_lessons_button')} />
                </div>
              </>
            </section>
          </div>
        )}

        {equipmentList.length > 0 && (
          <div className={styles.equipmentWrapper}>
            <section className={styles.equipment}>
              <img
                className={`${styles.equipment__star} ${styles.equipment__star_star1}`}
                src='/images/equipment-white-star.png'
                alt='image-star'
              />

              <img
                className={`${styles.equipment__star} ${styles.equipment__star_star2}`}
                src='/images/equipment-white-star.png'
                alt='image-star'
              />

              <h2 className={styles.equipment__title}>
                {t('home_equipment_title')}
              </h2>

              <div className={styles.equipment__cardsPhone}>
                {equipmentList.length > 0 ? (
                  <ServicesSwiper
                    type='type1'
                    equipmentCadrs={equipmentList}
                    EquipmentToRender={EquipmentCard}
                  />
                ) : (
                  <Loader />
                )}
              </div>

              <div className={styles.equipment__cardsTablet}>
                {equipmentList.length > 0 ? (
                  <ServicesSwiper
                    type='type2'
                    equipmentCadrs={equipmentList}
                    EquipmentToRender={EquipmentCard}
                  />
                ) : (
                  <Loader />
                )}
              </div>

              <div className={styles.equipment__cardsDesktop}>
                {equipmentList.length > 0 ? (
                  <EquipmentList cards={equipmentList.slice(0, 4)} />
                ) : (
                  <Loader />
                )}
              </div>
            </section>
          </div>
        )}

        <div className={styles.testimonialsWrapper}>
          <section className={styles.testimonials}>
            <h2 className={styles.testimonials__title}>
              {t('home_testimonials_title')}
            </h2>

            <div className={styles.testimonials__blocksWrapper}>
              <div
                className={`${styles.testimonials__block} ${styles.testimonials__block_block1}`}
              >
                <img
                  className={`${styles.testimonials__imageQuotes} ${styles.testimonials__imageQuotes_block1}`}
                  src='/icons/white-quotes-ico.svg'
                  alt='image-quotes'
                />

                <div className={styles.testimonials__textContent}>
                  <h4
                    className={`${styles.testimonials__message} ${styles.testimonials__message_block1}`}
                  >
                    {t('home_testimonials_block1_text')}
                  </h4>

                  <div>
                    <h4
                      className={`${styles.testimonials__name} ${styles.testimonials__name_block1}`}
                    >
                      {t('home_testimonials_block1_name')}
                    </h4>

                    <h5
                      className={`${styles.testimonials__activitie} ${styles.testimonials__activitie_block1}`}
                    >
                      {t('home_testimonials_block1_activity')}
                    </h5>
                  </div>
                </div>

                <img
                  loading='lazy'
                  className={`${styles.testimonials__personPhoto} ${styles.testimonials__personPhoto_block1}`}
                  src='/images/section-testimonials/photo-block1.png'
                  alt='photo-persone'
                />
              </div>

              <div
                className={`${styles.testimonials__block} ${styles.testimonials__block_block2}`}
              >
                <img
                  className={`${styles.testimonials__imageQuotes} ${styles.testimonials__imageQuotes_block2}`}
                  src='/icons/pink-quotes-ico.svg'
                  alt='image-quotes'
                />

                <div className={styles.testimonials__textContent}>
                  <h4
                    className={`${styles.testimonials__message} ${styles.testimonials__message_block2}`}
                  >
                    {t('home_testimonials_block2_text')}
                  </h4>

                  <div>
                    <h4
                      className={`${styles.testimonials__name} ${styles.testimonials__name_block2}`}
                    >
                      {t('home_testimonials_block2_name')}
                    </h4>

                    <h5
                      className={`${styles.testimonials__activitie} ${styles.testimonials__activitie_block2}`}
                    >
                      {t('home_testimonials_block2_activity')}
                    </h5>
                  </div>
                </div>

                <img
                  loading='lazy'
                  className={`${styles.testimonials__personPhoto} ${styles.testimonials__personPhoto_block2}`}
                  src='/images/section-testimonials/photo-block2.png'
                  alt='photo-persone'
                />
              </div>

              <div
                className={`${styles.testimonials__block} ${styles.testimonials__block_block3}`}
              >
                <img
                  className={`${styles.testimonials__imageQuotes} ${styles.testimonials__imageQuotes_block3}`}
                  src='/icons/black-quotes-ico.svg'
                  alt='image-quotes'
                />

                <div className={styles.testimonials__textContent}>
                  <h4
                    className={`${styles.testimonials__message} ${styles.testimonials__message_block3}`}
                  >
                    {t('home_testimonials_block3_text')}
                  </h4>

                  <div>
                    <h4
                      className={`${styles.testimonials__name} ${styles.testimonials__name_block3}`}
                    >
                      {t('home_testimonials_block3_name')}
                    </h4>

                    <h5
                      className={`${styles.testimonials__activitie} ${styles.testimonials__activitie_block3}`}
                    >
                      {t('home_testimonials_block3_activity')}
                    </h5>
                  </div>
                </div>

                <img
                  loading='lazy'
                  className={`${styles.testimonials__personPhoto} ${styles.testimonials__personPhoto_block3}`}
                  src='/images/section-testimonials/photo-block3.png'
                  alt='photo-persone'
                />
              </div>
            </div>
          </section>
        </div>

        <ContactUs />

        <Footer />
      </div>
    </>
  );
};
