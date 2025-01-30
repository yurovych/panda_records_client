/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminPanel.module.scss';
import { adminServices } from '../../../services/adminService';
import { accessTokenService } from '../../../services/accessTokenService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setIsAdminPanel,
  setIsAuthenticated,
} from '../../../slices/booleanSlice';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { setCurrentTelegramLink } from '../../../slices/current';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  const isAdminPanel = useAppSelector((state) => state.boolean.isAdminPanel);
  const currentTelegram = useAppSelector(
    (state) => state.current.currentTelegramLink
  );

  const [disableLogout, setDisableLogout] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  useEffect(() => {
    const telegramLink = localStorage.getItem('telegram_bot');
    telegramLink && dispatch(setCurrentTelegramLink(telegramLink));
  }, []);

  function logout() {
    setDisableLogout(true);

    adminServices
      .logout()
      .then(() => {
        dispatch(setIsAdminPanel(false));
        dispatch(setIsAuthenticated(false));
        accessTokenService.remove();
        localStorage.removeItem('telegram_bot');
        navigate('/login');
      })
      .catch((error) => {
        if (error.message) {
          setLogoutError(error.message);
          return;
        }

        if (!error.response?.date) {
          setLogoutError(`${t('unknown_error')}`);
          return;
        }

        const { message } = error.response.data;

        setLogoutError(message);
      })
      .finally(() => {
        setDisableLogout(false);
        setTimeout(() => {
          setLogoutError('');
        }, 5000);
      });
  }

  const handleAdminMenuButton = () => {
    dispatch(setIsAdminPanel(!isAdminPanel));
  };

  enum NavPaths {
    MESSAGES = '/admin',
    EMAIL = '/admin/change-email',
    PASSWORD = '/admin/change-password',
    ADD_SONG = '/admin/add-song',
  }

  return (
    <>
      <div
        onClick={handleAdminMenuButton}
        className={`${styles.overlay} ${
          isAdminPanel ? styles.showAdminPanel : styles.hideAdminPanel
        }`}
      ></div>

      <div
        className={`${styles.adminPanel} ${
          isAdminPanel ? styles.showAdminPanel : styles.hideAdminPanel
        }`}
      >
        <nav className={styles.adminPanel__navigation}>
          <Link
            onClick={handleAdminMenuButton}
            className={`${styles.adminPanel__element} ${
              styles.adminPanel__message
            } ${
              NavPaths.MESSAGES === location.pathname && styles.linkIsActive
            }`}
            to='/admin'
          >
            {t('admin_panel_messages')}
          </Link>

          <Link
            onClick={handleAdminMenuButton}
            className={`${styles.adminPanel__element} ${
              styles.adminPanel__email
            } ${NavPaths.EMAIL === location.pathname && styles.linkIsActive}`}
            to='/admin/change-email'
          >
            {t('admin_panel_email')}
          </Link>

          <Link
            onClick={handleAdminMenuButton}
            className={`${styles.adminPanel__element} ${
              styles.adminPanel__password
            } ${
              NavPaths.PASSWORD === location.pathname && styles.linkIsActive
            }`}
            to='/admin/change-password'
          >
            {t('admin_panel_password')}
          </Link>

          <Link
            onClick={handleAdminMenuButton}
            className={`${styles.adminPanel__element} ${
              styles.adminPanel__addSong
            } ${
              NavPaths.ADD_SONG === location.pathname && styles.linkIsActive
            }`}
            to='/admin/add-song'
          >
            {t('admin_panel_add_song')}
          </Link>

          <div className={styles.adminPanel__links}>
            <a
              href='https://www.instagram.com/panda._.record?igsh=a2J0ajlmbXptNGd4'
              target='_blank'
              rel='noreferrer'
            >
              <img
                className={styles.adminPanel__linkIco}
                src='/icons/instagram-color-ico.svg'
                alt='instagram'
              />
            </a>
            <a
              href='https://www.tiktok.com/@panda._.record?_t=8s3ITFWiSVK&_r=1'
              target='_blank'
              rel='noreferrer'
            >
              <img
                className={styles.adminPanel__linkIco}
                src='/icons/tiktok-color-ico.svg'
                alt='tiktok'
              />
            </a>
            <a href={currentTelegram} target='_blank' rel='noreferrer'>
              <img
                className={styles.adminPanel__linkIco}
                src='/icons/telegram-color-ico.svg'
                alt='telegram'
              />
            </a>
          </div>

          <div className={styles.adminPanel__logoutWrapper}>
            <button
              className={`
                ${styles.adminPanel__logout} 
                ${styles.adminPanel__element} 
                ${disableLogout && styles.disableLogout}
              `}
              onClick={logout}
            >
              {t('admin_panel_logout')}
            </button>

            {logoutError && (
              <p
                className={`${styles.logoutError} notification is-danger is-light`}
              >
                {logoutError}
              </p>
            )}
          </div>
        </nav>

        <div
          onClick={handleAdminMenuButton}
          className={`${styles.adminPanel__openButton} ${
            isAdminPanel ? styles.moveButton : ''
          }`}
        >
          <img
            src={
              isAdminPanel
                ? '/icons/admin-panel-close-button-ico.svg'
                : '/icons/admin-panel-open-button-ico.svg'
            }
            alt='open'
          />
        </div>
      </div>
    </>
  );
};
