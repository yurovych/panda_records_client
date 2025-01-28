import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import styles from './Footer.module.scss';
import { scrollPageUp } from '../../../helpers/scrollPageUp';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UserIcon } from '../../../iconsMove/user';
import { MapPinIcon } from '../../../iconsMove/map-pin';

export const Footer = () => {
  const { t } = useTranslation();

  const PHONE_NUMBER = '+380687166092';

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footer}>
        <div className={styles.footer__main}>
          <div onClick={scrollPageUp} className={styles.footer__logo}>
            <Logo />
          </div>

          <div className={styles.footer__navigationWrapper}>
            <Navigation />
          </div>
        </div>

        <div className={styles.footer__contacts}>
          <a
            target='_blank'
            href={`https://www.google.com/maps/place/Kozelnytska+St,+17,+L'viv,+L'vivs'ka+oblast,+Ukraine,+79000/@49.811592,24.02527,487m/data=!3m2!1e3!4b1!4m6!3m5!1s0x473ae7edcefb9f0f:0x583f612b2e5fa5d0!8m2!3d49.811592!4d24.02527!16s%2Fg%2F11hbr7jmxw?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D`}
            className={styles.footer__location}
            rel='noreferrer'
          >
            <div className={styles.footer__locationIco}>
              <MapPinIcon />
            </div>

            <p className={styles.footer__addressPhone} rel='noreferrer'>
              {t('address_1')}
              <br />
              {t('address_2')}
            </p>

            <p className={styles.footer__addressTabletDesktop} rel='noreferrer'>
              {t('address_1')}
              ,&nbsp;&nbsp;
              {t('address_2')}
            </p>
          </a>
          <a href={`tel:${PHONE_NUMBER}`} className={styles.footer__phone}>
            <img
              className={styles.footer__phoneIco}
              src='/icons/phone-ico.svg'
              alt='phone_ico'
            />

            <p className={styles.footer__number}>{PHONE_NUMBER}</p>
          </a>
        </div>

        <div className={styles.footer__line}></div>

        <div className={styles.footer__underline}>
          <Link to='/admin' className={styles.footer__login}>
            <UserIcon />
          </Link>

          <p className={styles.footer__copyRigths}>
            2024&nbsp;&nbsp;&nbsp;&nbsp;Panda Records. Copyright&nbsp;&nbsp;
            &copy;
          </p>

          <Link
            onClick={scrollPageUp}
            className={styles.footer__policy}
            to='/policy'
          >
            {t('policy_title')}
          </Link>
        </div>
      </div>
    </div>
  );
};
