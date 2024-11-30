/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { scrollPageUp } from '../../../helpers/scrollPageUp';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation';

export const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    scrollPageUp();
  };

  const handleContactUsClick = async () => {
    await navigate('/');
    const element = document.getElementById('contactUs');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div onClick={handleLogoClick}>
          <Logo />
        </div>

        <nav className={styles.navigationWrapper}>
          <Navigation />
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

          <h3 onClick={handleContactUsClick} className={styles.header__link}>
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
