import { Outlet, useNavigate } from 'react-router-dom';
import styles from './App.module.scss';
import { HidenMenu } from './modules/HidenMenu/components';

export const App = () => {
  const navigate = useNavigate();

  const handleLogInButton = () => {
    navigate('./login');
  };

  return (
    <div className={styles.app}>
      {false && <HidenMenu />}

      <div>
        <Outlet />
      </div>
    </div>
  );
};
