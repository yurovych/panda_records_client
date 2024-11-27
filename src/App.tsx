import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import { HidenMenu } from './modules/HidenMenu/components';
import { Header } from './modules/shared/Header';

export const App = () => {
  return (
    <div className={styles.app}>
      {false && <HidenMenu />}

      <Header />

      <Outlet />
    </div>
  );
};
