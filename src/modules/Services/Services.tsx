import { Footer } from '../shared/Footer';
import styles from './Services.module.scss';
import servicesList from './../../data/servicesCards.json';
import { ServicesSwiper } from '../shared/ServicesSwiper';
import videos from './../../data/videos.json';
import { ProcessVideoCard } from '../shared/ProcessVideoCard';
import { Loader } from '../Loader';
import { ServicesCard } from './../shared/ServicesCard/ServicesCard';
import { ServicesList } from '../shared/ServicesList';
import { useTranslation } from 'react-i18next';
import { ContactUs } from '../shared/ContactUs';

export const Services = () => {
  const processVideosList = videos.filter((video) => video);
  const { t } = useTranslation();

  return (
    <div className={styles.services}>
      <section className={styles.variety}>
        <h1 className={styles.variety__title}>Our services</h1>
        <div className={styles.variety__photeTablet}>
          {servicesList ? (
            <ServicesSwiper
              type='type3'
              servicesWideCards={servicesList}
              ServiceToRender={ServicesCard}
            />
          ) : (
            <Loader />
          )}
        </div>

        <div className={styles.variety__desktop}>
          {servicesList ? (
            <ServicesList cards={servicesList} visual='wide' />
          ) : (
            <Loader />
          )}
        </div>
      </section>

      <section className={styles.process}>
        <h2 className={styles.process__title}>How the process looks like?</h2>

        <div className={styles.process__swiperWrapper}>
          {processVideosList ? (
            <ServicesSwiper
              type='type2'
              videoCards={processVideosList}
              VideoToRender={ProcessVideoCard}
            />
          ) : (
            <Loader />
          )}
        </div>
      </section>

      <section className={styles.lessons}>
        <h2 className={styles.lessons__sectionTitle}>
          Improve Your skill level
        </h2>

        <div className={styles.lessons__cardsBlock}>
          <div className={`${styles.lessons__card} ${styles.lessons__card_1} `}>
            <div className={styles.lessons__image}>
              <img
                className={styles.lessons__imageItself}
                src='./images/contactUs_image2.jpg'
                alt='card_image'
              />
            </div>

            <h2 className={styles.lessons__title}>
              Lessons of sound engineering
            </h2>

            <p className={styles.lessons__text}>
              Text lesson of sound engineeri ngg fsfadfsd fase rafsdasdag
              sdfaaewrsfewf
            </p>

            <div className={styles.lessons__priceBlockWrapper}>
              <div className={styles.lessons__priceBlock}>
                <h3 className={styles.lessons__priceBlockText}>800₴ /</h3>
                <img
                  className={styles.lessons__clockIco}
                  src='./icons/clock-ico.svg'
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
                className={styles.lessons__imageItself}
                src='./images/guitar_lesson_services.jpg'
                alt='card_image'
              />
            </div>

            <h2 className={styles.lessons__title}>Guitar lessons</h2>

            <p className={styles.lessons__text}>
              Text guitar lessons asdfs fwef cfwaerfa csdfwe rer affsdfsawe tere
              werafsd
            </p>

            <div className={styles.lessons__priceBlockWrapper}>
              <div className={styles.lessons__priceBlock}>
                <h3 className={styles.lessons__priceBlockText}>450₴ /</h3>
                <img
                  className={styles.lessons__clockIco}
                  src='./icons/clock-ico.svg'
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
