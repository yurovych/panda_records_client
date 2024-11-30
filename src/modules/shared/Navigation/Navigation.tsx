import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const navPaths = {
    aboutUs: '/about',
    services: '/services',
    portfolio: '/portfolio',
  };

  const location = useLocation();

  return (
    <>
      <Link
        className={`${styles.link} ${
          navPaths.aboutUs === location.pathname && styles.linkIsActive
        }`}
        to={'/about'}
      >
        About us
      </Link>

      <Link
        className={`${styles.link} ${
          navPaths.services === location.pathname && styles.linkIsActive
        }`}
        to={'/services'}
      >
        Services
      </Link>

      <Link
        className={`${styles.link} ${
          navPaths.portfolio === location.pathname && styles.linkIsActive
        }`}
        to={'/portfolio'}
      >
        Portfolio
      </Link>
    </>
  );
};
