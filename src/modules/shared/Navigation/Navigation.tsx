import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useTranslation } from 'react-i18next';
import { scrollPageUp } from './../../../helpers/scrollPageUp';

export const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navPaths = {
    aboutUs: '/about',
    services: '/services',
    portfolio: '/portfolio',
  };

  return (
    <>
      <Link
        onClick={scrollPageUp}
        className={`${styles.link} ${
          navPaths.aboutUs === location.pathname && styles.linkIsActive
        }`}
        to={'/about'}
      >
        {t('nav_about_us')}
      </Link>

      <Link
        onClick={scrollPageUp}
        className={`${styles.link} ${
          navPaths.services === location.pathname && styles.linkIsActive
        }`}
        to={'/services'}
      >
        {t('nav_services')}
      </Link>

      <Link
        onClick={scrollPageUp}
        className={`${styles.link} ${
          navPaths.portfolio === location.pathname && styles.linkIsActive
        }`}
        to={'/portfolio'}
      >
        {t('nav_portfolio')}
      </Link>
    </>
  );
};
