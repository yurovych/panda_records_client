import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.notFoundPage}>
      <h2 className={styles.notFoundPage__text}>{t('not_found_error')}</h2>
      <h2 className={styles.notFoundPage__text}>
        {t('not_found_sorry')} <br /> {t('not_found_text')}
      </h2>

      <div className={styles.goHomeButton}>
        <Link className={styles.goHomeLink} to={'/'}>
          {t('return_to_home_page')}
        </Link>
      </div>
    </div>
  );
};
