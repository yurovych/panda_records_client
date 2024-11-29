/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { scrollPageUpSmooth } from '../../../helpers/scrollPageUp';

export const Header = () => {
  const navPaths = {
    aboutUs: '/about',
    services: '/services',
    portfolio: '/portfolio',
  };

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogoClick = () => {
    scrollPageUpSmooth();
  };

  const handleContactUsClick = async () => {
    await navigate('/');
    const element = document.getElementById('contactUs');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <Link onClick={handleLogoClick} to='/' className={styles.logo}>
          <img src='./icons/logo_panda52x52.svg' alt='logo-ico' />

          <div className={styles.logo__text}>
            <p className={styles.logo__text_top}>PANDA</p>
            <p className={styles.logo__text_bottom}>RECORDS</p>
          </div>
        </Link>

        <nav className={styles.navigation}>
          <Link
            className={`${styles.navigation__link} ${
              navPaths.aboutUs === location.pathname && styles.linkIsActive
            }`}
            to={'/about'}
          >
            About us
          </Link>

          <Link
            className={`${styles.navigation__link} ${
              navPaths.services === location.pathname && styles.linkIsActive
            }`}
            to={'/services'}
          >
            Services
          </Link>

          <Link
            className={`${styles.navigation__link} ${
              navPaths.portfolio === location.pathname && styles.linkIsActive
            }`}
            to={'/portfolio'}
          >
            Portfolio
          </Link>
        </nav>

        <div className={styles.header__right}>
          <a
            className={styles.header__inst}
            href='https://www.instagram.com/panda._.record?igsh=a2J0ajlmbXptNGd4'
            target='_blank'
            rel='noreferrer'
          >
            <img src='./icons/instagram-ico.svg' alt='instagram_ico' />
          </a>

          <h3
            onClick={handleContactUsClick}
            className={`${styles.navigation__link} ${styles.navigation__link_contactUs}`}
          >
            Contact Us
          </h3>
        </div>

        <div className={styles.header__burgerMenu}>
          <img src='./icons/burger-menu-ico.svg' alt='menu' />
        </div>
      </div>
    </div>
  );
};
