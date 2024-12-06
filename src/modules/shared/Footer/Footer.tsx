import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import styles from './Footer.module.scss';
import { scrollPageUp } from '../../../helpers/scrollPageUp';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  const handleLogoClick = () => {
    scrollPageUp();
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer__main}>
        <div onClick={handleLogoClick} className={styles.footer__logo}>
          <Logo />
        </div>

        <div className={styles.footer__navigationWrapper}>
          <Navigation />
        </div>
      </div>

      <div className={styles.footer__adressWrapper}>
        <img
          className={styles.footer__locationIco}
          src='./icons/location-ico.svg'
          alt='location_ico'
        />

        <a
          target='_blank'
          href={`https://www.google.com/maps/place/Kozelnytska+St,+17,+L'viv,+L'vivs'ka+oblast,+Ukraine,+79000/@49.811592,24.02527,487m/data=!3m2!1e3!4b1!4m6!3m5!1s0x473ae7edcefb9f0f:0x583f612b2e5fa5d0!8m2!3d49.811592!4d24.02527!16s%2Fg%2F11hbr7jmxw?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D`}
          className={styles.footer__adress}
          rel='noreferrer'
        >
          {t('adress_1')}
          <br />
          {t('adress_2')}
        </a>

        <a className={styles.footer__number} href='tel:+380687166092'>
          +380687166092
        </a>
      </div>

      <div className={styles.footer__line}></div>
      <div className={styles.footer__bottom}>
        2024&nbsp;&nbsp;&nbsp;&nbsp;Panda Records. Copyright&nbsp;&nbsp; &copy;
      </div>
    </div>
  );
};
