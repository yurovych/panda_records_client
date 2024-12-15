import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Navigation } from '../../shared/Navigation';
import styles from './HidenMenu.module.scss';
import React from 'react';
import { setIsHidenMenu } from '../../../slices/booleanSlice';
import { useTranslation } from 'react-i18next';

export const HidenMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isHidenMenu = useAppSelector((state) => state.boolean.isHidenMenu);

  async function handleContactUsClick() {
    dispatch(setIsHidenMenu(false));
    await navigate('/');
    const element = document.getElementById('contactUs');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div
      id='hidenMenu'
      className={`${styles.hidenMenu} ${
        isHidenMenu ? styles.showHidenMenu : styles.hideHidenMenu
      }`}
    >
      <div
        onClick={() => dispatch(setIsHidenMenu(false))}
        style={{ fontSize: '24px' }}
        className={styles.hidenMenu__nav}
      >
        <Navigation />
      </div>

      <div className={styles.hidenMenu__contacts}>
        <h3 className={styles.hidenMenu__contacts_title}>
          {t('header_contact_us')}
        </h3>

        <div className={styles.hidenMenu__contacts_contactWrapper}>
          <img
            className={styles.hidenMenu__contacts_ico}
            src='./icons/phone-ico.svg'
            alt='phone'
          />

          <a
            className={styles.hidenMenu__contacts_number}
            href='tel:+380687166092'
          >
            +380687166092
          </a>
        </div>

        <div className={styles.hidenMenu__contacts_contactWrapper}>
          <img
            className={styles.hidenMenu__contacts_ico}
            src='./icons/location-ico.svg'
            alt='location_ico'
          />

          <a
            target='_blank'
            href={`https://www.google.com/maps/place/Kozelnytska+St,+17,+L'viv,+L'vivs'ka+oblast,+Ukraine,+79000/@49.811592,24.02527,487m/data=!3m2!1e3!4b1!4m6!3m5!1s0x473ae7edcefb9f0f:0x583f612b2e5fa5d0!8m2!3d49.811592!4d24.02527!16s%2Fg%2F11hbr7jmxw?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D`}
            className={styles.hidenMenu__contacts_adress}
            rel='noreferrer'
          >
            {t('adress_1')}
            <br />
            {t('adress_2')}
          </a>
        </div>
      </div>

      <div className={styles.hidenMenu__icons}>
        <a className={styles.hidenMenu__icons_icon} href='tel:+380687166092'>
          <img src='./icons/phone-ico.svg' alt='phone-ico' />
        </a>

        <img
          className={styles.hidenMenu__icons_icon}
          onClick={handleContactUsClick}
          src='./icons/envelope-ico.svg'
          alt='envelop_ico'
        />

        <a
          className={styles.hidenMenu__icons_icon}
          href='https://www.instagram.com/panda._.record?igsh=a2J0ajlmbXptNGd4'
          target='_blank'
          rel='noreferrer'
        >
          <img
            className={styles.hidenMenu__icons_icon}
            src='./icons/instagram-ico.svg'
            alt='instagram_ico'
          />
        </a>

        <a
          className={styles.hidenMenu__icons_icon}
          href='https://www.tiktok.com/@panda._.record?_t=8s3ITFWiSVK&_r=1'
          target='_blank'
          rel='noreferrer'
        >
          <img
            className={styles.hidenMenu__icons_icon}
            src='./icons/tiktok-white-ico.svg'
            alt='tiktok_ico'
          />
        </a>
      </div>
    </div>
  );
};
