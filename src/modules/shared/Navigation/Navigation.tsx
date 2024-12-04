import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useTranslation } from 'react-i18next';

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
        className={`${styles.link} ${
          navPaths.aboutUs === location.pathname && styles.linkIsActive
        }`}
        to={'/about'}
      >
        {t('about_us')}
      </Link>

      <Link
        className={`${styles.link} ${
          navPaths.services === location.pathname && styles.linkIsActive
        }`}
        to={'/services'}
      >
        {t('services')}
      </Link>

      <Link
        className={`${styles.link} ${
          navPaths.portfolio === location.pathname && styles.linkIsActive
        }`}
        to={'/portfolio'}
      >
        {t('portfolio')}
      </Link>
    </>
  );
};
