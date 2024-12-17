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
import { useTranslation } from 'react-i18next';
import { setCurrentLanguage } from '../../../slices/current';
import { SongCard } from '../SongCard';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const currentSong = useAppSelector((state) => state.player.currentSong);
  const isHidenMenu = useAppSelector((state) => state.boolean.isHidenMenu);
  const currentLanguage = useAppSelector(
    (state) => state.current.currentLanguage
  );

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

  const handleLanguageChange = () => {
    const newLang = currentLanguage === 'en' ? 'ua' : 'en';

    dispatch(setCurrentLanguage(newLang));
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        {currentSong && <SongCard visual='player' track={currentSong} />}

        <div onClick={handleLogoClick}>
          <Logo />
        </div>

        <nav style={{ fontSize: '18px' }} className={styles.navigationWrapper}>
          <Navigation />
        </nav>

        <div className={styles.header__right}>
          <div onClick={handleLanguageChange} className={styles.languageButton}>
            {currentLanguage === 'ua' ? (
              <img
                className={`${styles.languageButton__img} ${
                  currentLanguage === 'ua' && styles.languageChanging
                }`}
                src='./icons/ua-flag-ico.svg'
                alt='ua-flag'
              />
            ) : (
              <img
                className={`${styles.languageButton__img} ${
                  currentLanguage === 'ua' && styles.languageChanging
                }`}
                src='./icons/en-flag-ico.svg'
                alt='en-flag'
              />
            )}
          </div>

          <div className={styles.header__right_desktop}>
            <h3 className={styles.header__link} onClick={handleContactUsClick}>
              {t('header_contact_us')}
            </h3>

            <a
              className={styles.header__socialIco}
              href='https://www.instagram.com/panda._.record?igsh=a2J0ajlmbXptNGd4'
              target='_blank'
              rel='noreferrer'
            >
              <img src='./icons/instagram-ico.svg' alt='instagram_ico' />
            </a>

            <a
              className={styles.header__socialIco}
              href='https://www.tiktok.com/@panda._.record?_t=8s3ITFWiSVK&_r=1'
              target='_blank'
              rel='noreferrer'
            >
              <img src='./icons/tiktok-white-ico.svg' alt='tiktok_ico' />
            </a>
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
    </div>
  );
};
