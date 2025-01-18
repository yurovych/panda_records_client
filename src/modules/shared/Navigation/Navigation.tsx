import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useTranslation } from 'react-i18next';
import { scrollPageUp } from './../../../helpers/scrollPageUp';
import { useAppSelector } from '../../../app/hooks';

export const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isAuthenticated = useAppSelector(
    (state) => state.boolean.isAuthenticated
  );

  enum NavPaths {
    ABOUTUS = '/about',
    SERVICES = '/services',
    PORTFOLIO = '/portfolio',
    ADMIN = '/admin',
  }

  return (
    <>
      <Link
        onClick={scrollPageUp}
        className={`${styles.link} ${
          NavPaths.ABOUTUS === location.pathname && styles.linkIsActive
        }`}
        to={'/about'}
      >
        {t('nav.about_us')}
      </Link>

      <Link
        onClick={scrollPageUp}
        className={`${styles.link} ${
          NavPaths.SERVICES === location.pathname && styles.linkIsActive
        }`}
        to={'/services'}
      >
        {t('nav.services')}
      </Link>

      <Link
        onClick={scrollPageUp}
        className={`${styles.link} ${
          NavPaths.PORTFOLIO === location.pathname && styles.linkIsActive
        }`}
        to={'/portfolio'}
      >
        {t('nav.portfolio')}
      </Link>

      {isAuthenticated && (
        <Link
          onClick={scrollPageUp}
          className={`${styles.link} ${
            NavPaths.ADMIN === location.pathname && styles.linkIsActive
          }`}
          to={'/admin'}
        >
          {t('nav.admin')}
        </Link>
      )}
    </>
  );
};
