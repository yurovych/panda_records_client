import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './AdminPanel.module.scss';
import { adminServices } from '../../../services/adminService';
import { accessTokenService } from '../../../services/accessTokenService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setIsAdminPanel } from '../../../slices/booleanSlice';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isAdminPanel = useAppSelector((state) => state.boolean.isAdminPanel);

  async function logout() {
    try {
      await adminServices.logout();
      dispatch(setIsAdminPanel(false));
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
            Messages
          </Link>
          <Link
            onClick={handleAdminMenuButton}
            className={`${styles.adminPanel__element} ${
              styles.adminPanel__email
            } ${navPaths.email === location.pathname && styles.linkIsActive}`}
            to='/admin/change-email'
          >
            Change Email
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
            Change Password
          </Link>
          <div className={styles.adminPanel__logoutWrapper}>
            <button
              className={`${styles.adminPanel__logout} ${styles.adminPanel__element}`}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </nav>

        <img
          onClick={handleAdminMenuButton}
          className={`${styles.adminPanel__openButton} ${
            isAdminPanel ? styles.moveButton : ''
          }`}
          src={
            isAdminPanel
              ? './icons/admin-panel-close-button-ico.svg'
              : './icons/admin-panel-open-button-ico.svg'
          }
          alt='open'
        />
      </div>
    </>
  );
};
