import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h2 className={styles.notFoundPage__text}>Page not</h2>
      <img
        className={styles.notFoundPage__image}
        // src='./img/page-not-found.png'
        alt='error 404'
      />
      <Link className={styles.goHome} to='/'>
        Go home
      </Link>
    </div>
  );
};
