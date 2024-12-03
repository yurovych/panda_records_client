/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { scrollPageUp } from '../../../helpers/scrollPageUp';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setIsHidenMenu } from '../../../slices/booleanSlice';
import { useEffect } from 'react';
import './../_main.scss';

export const Header = () => {
  const isHidenMenu = useAppSelector((state) => state.boolean.isHidenMenu);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleLogoClick() {
    dispatch(setIsHidenMenu(false));
    scrollPageUp();
  }

  async function handleContactUsClick() {
    await navigate('/');
    const element = document.getElementById('contactUs');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleMenuButtonClick = () => {
    dispatch(setIsHidenMenu(isHidenMenu ? false : true));
  };

  window.addEventListener('resize', () => dispatch(setIsHidenMenu(false)));

  useEffect(() => {
    if (isHidenMenu) {
      document.body.classList.add('hidenMenuHeightNoScroll');
    } else {
      document.body.classList.remove('hidenMenuHeightNoScroll');
    }

    return () => {
      document.body.classList.remove('hidenMenuHeightNoScroll');
    };
  }, [isHidenMenu]);

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <div onClick={handleLogoClick}>
          <Logo />
        </div>

        <nav style={{ fontSize: '18px' }} className={styles.navigationWrapper}>
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

        <div
          onClick={handleMenuButtonClick}
          className={styles.header__burgerMenu}
        >
          <img
            src={
              isHidenMenu
                ? './icons/close-ico.svg'
                : './icons/burger-menu-ico.svg'
            }
            alt='menu'
          />
        </div>
      </div>
    </div>
  );
};
