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

export const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isAdminPanel = useAppSelector((state) => state.boolean.isAdminPanel);
  const currentTelegram = useAppSelector(
    (state) => state.current.currentTelegramLink
  );

  async function logout() {
    try {
      await adminServices.logout();
      dispatch(setIsAdminPanel(false));
      dispatch(setIsAuthenticated(false));
      accessTokenService.remove();
      navigate('./../login');
    } catch (error) {
      console.log('User is not authenticated');
    }
  }

  const handleAdminMenuButton = () => {
    dispatch(setIsAdminPanel(!isAdminPanel));
  };

  const navPaths = {
    messages: '/admin',
    email: '/admin/change-email',
    password: '/admin/change-password',
  };

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
              navPaths.messages === location.pathname && styles.linkIsActive
            }`}
            to='/admin'
          >
            {t('admin_panel_messages')}
          </Link>
          <Link
            onClick={handleAdminMenuButton}
            className={`${styles.adminPanel__element} ${
              styles.adminPanel__email
            } ${navPaths.email === location.pathname && styles.linkIsActive}`}
            to='/admin/change-email'
          >
            {t('admin_panel_email')}
          </Link>
          <Link
            onClick={handleAdminMenuButton}
            className={`${styles.adminPanel__element} ${
              styles.adminPanel__password
            } ${
              navPaths.password === location.pathname && styles.linkIsActive
            }`}
            to='/admin/change-password'
          >
            {t('admin_panel_password')}
          </Link>

          <div className={styles.adminPanel__links}>
            <a
              href='https://www.instagram.com/panda._.record?igsh=a2J0ajlmbXptNGd4'
              target='_blank'
              rel='noreferrer'
            >
              <img
                className={styles.adminPanel__linkIco}
                src='./icons/instagram-color-ico.svg'
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
                src='./icons/tiktok-color-ico.svg'
                alt='tiktok'
              />
            </a>
            <a href={currentTelegram} target='_blank' rel='noreferrer'>
              <img
                className={styles.adminPanel__linkIco}
                src='./icons/telegram-color-ico.svg'
                alt='telegram'
              />
            </a>
          </div>

          <div className={styles.adminPanel__logoutWrapper}>
            <button
              className={`${styles.adminPanel__logout} ${styles.adminPanel__element}`}
              onClick={logout}
            >
              {t('admin_panel_logout')}
            </button>
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
                ? './icons/admin-panel-close-button-ico.svg'
                : './icons/admin-panel-open-button-ico.svg'
            }
            alt='open'
          />
        </div>
      </div>
    </>
  );
};
