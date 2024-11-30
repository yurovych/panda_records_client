import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import { HidenMenu } from './modules/HidenMenu/components';
import { Header } from './modules/shared/Header';
import { scrollPageUp } from './helpers/scrollPageUp';
import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    scrollPageUp();
  }, []);

  return (
    <div className={styles.app}>
      {false && <HidenMenu />}

      <Header />

      <Outlet />
    </div>
  );
};
