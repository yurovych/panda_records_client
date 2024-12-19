import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h2 className={styles.notFoundPage__text}>Error 404</h2>
      <h2 className={styles.notFoundPage__text}>
        Sowwy... <br /> Page not found {`:(`}
      </h2>

      <Link className={styles.notFoundPage__goToStudio} to='/'>
        Go to Studio
      </Link>
    </div>
  );
};
