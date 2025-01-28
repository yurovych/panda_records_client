import { useTranslation } from 'react-i18next';
import { ContactForm } from '../ContactForm';
import styles from './ContactUs.module.scss';

export const ContactUs = () => {
  const { t } = useTranslation();

  const PHONE_NUMBER = '+380687166092';
  const EMAIL = 'romanmarinec611@gmail.com';

  return (
    <div className={styles.contactUsWrapper}>
      <section id='contactUs' className={styles.contactUs}>
        <h2 className={styles.contactUs__title}>{t('contact_us_title')}</h2>

        <div className={styles.contactUs__image}></div>

        <div
          className={`${styles.contactUs__inTouch} ${styles.contactUs__infoBlock}`}
        >
          <h3 className={styles.contactUs__infoBlock_title}>
            {t('contact_us_block1')}
          </h3>

          <a
            href='mailto:romanmarinec611@gmail.com'
            className={`${styles.contactUs__inTouch_email} ${styles.contactUs__infoBlock_text}`}
          >
            {EMAIL}
          </a>

          <a
            href='tel:+380687166092'
            className={styles.contactUs__infoBlock_text}
          >
            {PHONE_NUMBER}
          </a>
        </div>

        <div
          className={`${styles.contactUs__visit} ${styles.contactUs__infoBlock}`}
        >
          <h3 className={styles.contactUs__infoBlock_title}>
            {t('contact_us_block2')}
          </h3>

          <a
            target='_blank'
            href={`https://www.google.com/maps/place/Kozelnytska+St,+17,+L'viv,+L'vivs'ka+oblast,+Ukraine,+79000/@49.811592,24.02527,487m/data=!3m2!1e3!4b1!4m6!3m5!1s0x473ae7edcefb9f0f:0x583f612b2e5fa5d0!8m2!3d49.811592!4d24.02527!16s%2Fg%2F11hbr7jmxw?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D`}
            className={styles.contactUs__infoBlock_text}
            rel='noreferrer'
          >
            {t('address_1')} <br /> {t('address_2')}
          </a>
        </div>

        <div
          className={`${styles.contactUs__follow} ${styles.contactUs__infoBlock}`}
        >
          <h3
            className={`${styles.contactUs__infoBlock_title} ${styles.contactUs__follow_title}`}
          >
            {t('contact_us_block3')}
          </h3>

          <div className={styles.contactUs__icons}>
            <a
              className={styles.contactUs__icon}
              target='_blank'
              rel='noreferrer'
              href='https://www.instagram.com/panda._.record?igsh=a2J0ajlmbXptNGd4'
            >
              <img src='/icons/instagram-color-ico.svg' alt='instagram-ico' />
            </a>

            <a
              className={styles.contactUs__icon}
              target='_blank'
              rel='noreferrer'
              href='https://www.tiktok.com/@panda._.record?_t=8s3ITFWiSVK&_r=1'
            >
              <img src='/icons/tiktok-color-ico.svg' alt='tiktok-ico' />
            </a>
          </div>
        </div>

        <h3 className={styles.contactUs__formTitle}>
          {t('contact_us_form_title1')}
          <br />
          {t('contact_us_form_title2')}
        </h3>

        <div className={styles.contactUs__form}>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};
