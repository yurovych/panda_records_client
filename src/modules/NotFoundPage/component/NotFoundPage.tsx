import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../shared/Button';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.notFoundPageWrapper}>
      <div className={styles.notFoundPage}>
        <div className={styles.notFoundPage__error}>
          <h1 className={styles.notFoundPage__4}>4</h1>
          <div className={styles.notFoundPage__imgBlock}>
            <img
              className={styles.notFoundPage__logo}
              src='/icons/logo_panda52x52.svg'
              alt='logo-ico'
            />

            <img
              className={styles.notFoundPage__oops}
              src='/icons/oops.png'
              alt='oops-ico'
            />
          </div>

          <h1 className={styles.notFoundPage__4}>4</h1>
        </div>

        <h2 className={styles.notFoundPage__text}>{t('not_found')}</h2>

        <div className={styles.notFoundPage__button}>
          <Link to={'/'}>
            <Button text={t('return_to_home_page')} />
          </Link>
        </div>
      </div>
    </div>
  );
};
