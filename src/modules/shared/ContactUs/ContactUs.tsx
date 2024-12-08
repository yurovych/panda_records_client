import { ContactForm } from '../ContactForm';
import styles from './ContactUs.module.scss';

export const ContactUs = () => {
  return (
    <section id='contactUs' className={styles.contactUs}>
      <h2 className={styles.contactUs__title}>Contact us</h2>

      <div className={styles.contactUs__image}>
        <img
          className={styles.contactUs__imageItsels}
          src='./images/contactUs_image.jpg'
          alt='contactUs-image'
        />
      </div>

      <div
        className={`${styles.contactUs__inTouch} ${styles.contactUs__infoBlock}`}
      >
        <h3 className={styles.contactUs__infoBlock_title}>Get in touch via</h3>

        <a
          href='mailto:hello@gmail.com'
          className={`${styles.contactUs__inTouch_email} ${styles.contactUs__infoBlock_text}`}
        >
          hello@gmail.com
        </a>

        <a
          href='tel:+380687166092'
          className={styles.contactUs__infoBlock_text}
        >
          +380687166092
        </a>
      </div>

      <div
        className={`${styles.contactUs__visit} ${styles.contactUs__infoBlock}`}
      >
        <h3 className={styles.contactUs__infoBlock_title}>Visit Studio</h3>

        <a
          target='_blank'
          href={`https://www.google.com/maps/place/Kozelnytska+St,+17,+L'viv,+L'vivs'ka+oblast,+Ukraine,+79000/@49.811592,24.02527,487m/data=!3m2!1e3!4b1!4m6!3m5!1s0x473ae7edcefb9f0f:0x583f612b2e5fa5d0!8m2!3d49.811592!4d24.02527!16s%2Fg%2F11hbr7jmxw?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D`}
          className={styles.contactUs__infoBlock_text}
          rel='noreferrer'
        >
          79000 Ukraine <br /> Lviv, str. Kozelnytska 17
        </a>
      </div>

      <div
        className={`${styles.contactUs__follow} ${styles.contactUs__infoBlock}`}
      >
        <h3
          className={`${styles.contactUs__infoBlock_title} ${styles.contactUs__follow_title}`}
        >
          Follow Us
        </h3>

        <div className={styles.contactUs__icons}>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.instagram.com/panda._.record?igsh=a2J0ajlmbXptNGd4'
          >
            <img src='./icons/instagram-color-ico.svg' alt='instagram-ico' />
          </a>

          <a target='_blank' rel='noreferrer' href='http://youtube.com'>
            <img src='./icons/youtube-color-ico.svg' alt='youtube-ico' />
          </a>

          <a target='_blank' rel='noreferrer' href='http://spotify.com'>
            <img src='./icons/spotify-color-ico.svg' alt='spotify-ico' />
          </a>
        </div>
      </div>

      <h3 className={styles.contactUs__formTitle}>
        Do you have any questions?
        <br />
        Write to us!
      </h3>

      <div className={styles.contactUs__form}>
        <ContactForm />
      </div>
    </section>
  );
};
