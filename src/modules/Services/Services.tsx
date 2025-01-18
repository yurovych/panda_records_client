import { Footer } from '../shared/Footer';
import styles from './Services.module.scss';
import { ServicesSwiper } from '../shared/ServicesSwiper';
import { ProcessVideoCard } from '../shared/ProcessVideoCard';
import { Loader } from '../Loader';
import { ServicesCard } from './../shared/ServicesCard/ServicesCard';
import { useTranslation } from 'react-i18next';
import { ContactUs } from '../shared/ContactUs';
import { ServicesCardsDesktop } from '../shared/ServicesCardsDesktop';
import { useAppSelector } from '../../app/hooks';

export const Services = () => {
  const { t } = useTranslation();

  const videos = useAppSelector((state) => state.videos.objects);
  const servicesList = useAppSelector((state) => state.sevrices.objects);
  const servicesFetchError = useAppSelector((state) => state.sevrices.error);
  const videosFetchError = useAppSelector((state) => state.videos.error);

  return (
    <div className={styles.services}>
      <section className={styles.variety}>
        <img
          className={styles.variety__star}
          src='/images/services-blue-star.png'
          alt='star-foto'
        />
        <h1 className={styles.variety__title}>{t('sevcices_title')} </h1>
        <div className={styles.variety__photeTablet}>
          {servicesList.length > 0 ? (
            <ServicesSwiper
              type='type4'
              servicesWideCards={servicesList}
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

        <div className={styles.variety__desktop}>
          {servicesList.length > 0 ? (
            <ServicesCardsDesktop services={servicesList} />
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

      <section className={styles.process}>
        <h2 className={styles.process__title}>{t('services_videos_title')} </h2>

        {videos.length > 0 ? (
          <ServicesSwiper
            type='type2'
            videoCards={videos}
            VideoToRender={ProcessVideoCard}
          />
        ) : videosFetchError ? (
          <p className={`${styles.fetchError} notification is-danger is-light`}>
            {videosFetchError}
          </p>
        ) : (
          <Loader />
        )}
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
          <div className={`${styles.lessons__card} ${styles.lessons__card_1} `}>
            <div className={styles.lessons__image}>
              <img
                loading='lazy'
                className={styles.lessons__imageItself}
                src='/images/contactUs_image2.jpg'
                alt='card_image'
              />
            </div>

            <h2 className={styles.lessons__title}>
              {t('services_lessons_engenering_title')}
            </h2>

            <p className={styles.lessons__text}>
              {t('services_lessons_engenering_text')}
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

          <div className={`${styles.lessons__card} ${styles.lessons__card_2} `}>
            <div className={styles.lessons__image}>
              <img
                loading='lazy'
                className={styles.lessons__imageItself}
                src='/images/guitar_lesson_services.jpg'
                alt='card_image'
              />
            </div>

            <h2 className={styles.lessons__title}>
              {t('services_lessons_giuitar_title')}
            </h2>

            <p className={styles.lessons__text}>
              {t('services_lessons_giuitar_text')}
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

      <ContactUs />

      <Footer />
    </div>
  );
};
