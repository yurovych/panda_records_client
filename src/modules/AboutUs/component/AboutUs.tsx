import { useTranslation } from 'react-i18next';
import { ContactUs } from '../../shared/ContactUs';
import { Footer } from '../../shared/Footer';
import styles from './AboutUs.module.scss';

export const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.aboutUs}>
      <div className={styles.topWrapper}>
        <section className={styles.top}>
          <div className={styles.top__thornImg}>
            <img
              className={styles.top__thornImgItself}
              src='./icons/thorn-empty-ico.svg'
              alt='thorn_image'
            />
          </div>
          <h3 className={styles.top__greanTitle}>{t('about_us_green_text')}</h3>

          <div className={`${styles.top__photo} ${styles.top__photo_photo1}`}>
            <img
              className={styles.top__photoItself}
              src='./images/about-us-page/about-us-top2.jpg'
              alt='foto'
            />
          </div>

          <h1 className={styles.top__title}>{t('about_us_title')}</h1>

          <div className={`${styles.top__photo} ${styles.top__photo_photo2}`}>
            <img
              className={styles.top__photoItself}
              src='./images/about-us-page/about-us-top1.jpg'
              alt='foto'
            />
          </div>

          <h5 className={styles.top__text}>{t('about_us_title_top_text')}</h5>
        </section>
      </div>

      <div className={styles.staffWrapper}>
        <section className={styles.staff}>
          <h2 className={styles.staff__title}>{t('about_us_founder_title')}</h2>

          <div className={styles.staff__media}>
            <img
              loading='lazy'
              className={styles.staff__mediaItself}
              src='./images/about-us-page/founder-photo.jpg'
              alt='media-content'
            />
          </div>

          <p className={`${styles.staff__text} ${styles.staff__text_text1}`}>
            {t('about_us_founder_text1')}
          </p>

          <p className={`${styles.staff__text} ${styles.staff__text_text2}`}>
            {t('about_us_founder_text2')}
          </p>
        </section>
      </div>

      <div className={styles.historyWrapper}>
        <section className={styles.history}>
          <h2 className={styles.history__title}>
            {t('about_us_history_title')}{' '}
          </h2>

          <article className={styles.history__article1}>
            <p className={styles.history__art1Text}>
              {t('about_us_history_block1')}
            </p>
          </article>

          <article className={styles.history__article2}>
            <div className={styles.history__art2Thorn}>
              <img
                className={styles.history__art2ThornItself}
                src='./icons/thorn-green-ico.svg'
                alt='thorn-image'
              />
            </div>

            <div className={styles.history__art2rectangel}>
              <p className={styles.history__art2RectangelText}>
                {t('about_us_history_block2_title')}
              </p>
            </div>

            <p
              className={`${styles.history__art2Text} ${styles.history__art2Text_text1}`}
            >
              {t('about_us_history_block2_section1')}
            </p>
            <p
              className={`${styles.history__art2Text} ${styles.history__art2Text_text2}`}
            >
              {t('about_us_history_block2_section2')}
            </p>
          </article>

          <article className={styles.history__article3}>
            <p className={styles.history__art3Text}>
              {t('about_us_history_block3')}
            </p>
          </article>

          <article className={styles.history__article4}>
            <div className={styles.history__art4rectangel}>
              <p className={styles.history__art4RectangelText}>
                {t('about_us_history_block4_title')}
              </p>
            </div>

            <p
              className={`${styles.history__art4Text} ${styles.history__art4Text_text1}`}
            >
              {t('about_us_history_block4_section1')}
            </p>
            <p
              className={`${styles.history__art4Text} ${styles.history__art4Text_text2}`}
            >
              {t('about_us_history_block4_section2')}
            </p>
          </article>

          <article className={styles.history__article5}>
            <div className={styles.history__art5Thorn}>
              <img
                className={styles.history__art2ThornItself}
                src='./icons/thorn-blue-ico.svg'
                alt='thorn-image'
              />
            </div>

            <p className={styles.history__art5Text}>
              {t('about_us_history_block5')}
            </p>
          </article>
        </section>
      </div>

      <div className={styles.staffWrapper}>
        <section className={styles.staff}>
          <h2 className={styles.staff__title}>{t('about_us_teacher_title')}</h2>

          <div className={styles.staff__media}>
            <img
              className={styles.staff__mediaItself}
              src='./images/about-us-page/teacher-photo.jpg'
              alt='media-content'
            />
          </div>

          <p className={`${styles.staff__text} ${styles.staff__text_text1}`}>
            {t('about_us_teacher_text1')}
          </p>

          <p className={`${styles.staff__text} ${styles.staff__text_text2}`}>
            {t('about_us_teacher_text2')}
          </p>
        </section>
      </div>

      <ContactUs />

      <Footer />
    </div>
  );
};
