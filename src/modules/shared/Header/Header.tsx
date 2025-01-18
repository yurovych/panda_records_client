/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { scrollPageUp } from '../../../helpers/scrollPageUp';
import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setIsAdminPanel, setIsHidenMenu } from '../../../slices/booleanSlice';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setCurrentLanguage } from '../../../slices/current';
import { SongCard } from '../SongCard';
import { InstagramIcon } from '../../../iconsMove/instagram';
import { XIcon } from '../../../iconsMove/x';
import { MenuIcon } from '../../../iconsMove/menu';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const movedPlayer = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [languageDisabled, setLanguageDisabled] = useState(false);

  const currentSong = useAppSelector((state) => state.player.currentSong);
  const isHidenMenu = useAppSelector((state) => state.boolean.isHidenMenu);
  const currentLanguage = useAppSelector(
    (state) => state.current.currentLanguage
  );

  function handleLogoClick() {
    dispatch(setIsAdminPanel(false));
    dispatch(setIsHidenMenu(false));
    scrollPageUp();
  }

  function handleContactUsClick() {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('contactUs');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  const handleMenuButtonClick = () => {
    dispatch(setIsAdminPanel(false));
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
    setLanguageDisabled(true);

    setTimeout(() => {
      setLanguageDisabled(false);
    }, 3000);

    const newLang = currentLanguage === 'en' ? 'ua' : 'en';

    dispatch(setCurrentLanguage(newLang));

    localStorage.setItem('language', newLang);
  };

  const paddingInline = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--global-padding');

  const startDragging = (startX: number, startY: number) => {
    const rect = movedPlayer.current?.getBoundingClientRect();

    if (rect) {
      const offsetX = startX - rect.left;
      const offsetY = startY - rect.top;
      setOffset({ x: offsetX, y: offsetY });
      setIsDragging(true);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const startX = event.clientX;
    const startY = event.clientY;

    startDragging(startX, startY);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    startDragging(touch.clientX, touch.clientY);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const newX = event.clientX;
    const newY = event.clientY;

    if (movedPlayer.current) {
      movedPlayer.current.style.left = `${newX - offset.x + paddingInline}px`;
      movedPlayer.current.style.top = `${newY - offset.y}px`;
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const touch = event.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  const updatePosition = (x: number, y: number) => {
    if (movedPlayer.current) {
      movedPlayer.current.style.left = `${x - offset.x + paddingInline}px`;
      movedPlayer.current.style.top = `${y - offset.y}px`;
    }
  };

  const handleMouseUp = () => stopDragging();
  const handleTouchEnd = () => stopDragging();

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        {currentSong && (
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={movedPlayer}
            className={`${
              currentSong ? styles.showPlayer : styles.hidePlayer
            } ${styles.playerWrapper}`}
          >
            <SongCard visual='player' track={currentSong} />
          </div>
        )}
        <div title='Home' onClick={handleLogoClick}>
          <Logo />
        </div>
        <nav style={{ fontSize: '18px' }} className={styles.navigationWrapper}>
          <Navigation />
        </nav>
        <div className={styles.header__right}>
          <div
            onClick={handleLanguageChange}
            className={`${languageDisabled && styles.langButtonDisabled} ${
              styles.languageButton
            }`}
          >
            {currentLanguage === 'ua' ? (
              <img
                className={`${styles.languageButton__img} ${
                  currentLanguage === 'ua' && styles.languageChanging
                }`}
                src='/icons/ua-flag-ico.svg'
                alt='ua-flag'
              />
            ) : (
              <img
                title='Language'
                className={`${styles.languageButton__img} ${
                  currentLanguage === 'ua' && styles.languageChanging
                }`}
                src='/icons/en-flag-ico.svg'
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
              <InstagramIcon />
            </a>

            <a
              className={styles.header__socialIco}
              href='https://www.tiktok.com/@panda._.record?_t=8s3ITFWiSVK&_r=1'
              target='_blank'
              rel='noreferrer'
            >
              <img src='/icons/tiktok-white-ico.svg' alt='tiktok_ico' />
            </a>
          </div>

          <div
            onClick={handleMenuButtonClick}
            className={styles.header__burgerMenu}
          >
            {isHidenMenu ? <XIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>
    </div>
  );
};
