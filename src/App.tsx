import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';

export const App = () => {
  return (
    <>
      <header className={styles.header}>Header</header>

      <Outlet />

      <footer>Footer</footer>
    </>
  );
};
