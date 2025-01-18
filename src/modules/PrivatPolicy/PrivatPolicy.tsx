import { useTranslation } from 'react-i18next';
import { Footer } from '../shared/Footer';
import styles from './PrivatPolicy.module.scss';

export const PrivatPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.policy}>
      <div className={styles.policy__top}>
        <h1 className={styles.policy__title}> {t('policy_title')} </h1>
      </div>

      <div className={styles.policy__content}>
        <img
          className={styles.policy__star}
          src='/images/policy-white-star.png'
          alt='star-image'
        />

        <h2 className={styles.policy__blockTitle}>
          {t('policy_block1_title')}
        </h2>

        <h3 className={styles.policy__greeting}>
          {t('policy_block1_greeting')}
        </h3>

        <p className={styles.policy__text}>{t('policy_block1_text1')}</p>

        <h2 className={styles.policy__blockTitle}>
          {t('policy_block2_title')}
        </h2>

        <div>
          <p className={styles.policy__text}>{t('policy_block2_text1')}</p>

          <ul className={styles.policy__list}>
            <li className={styles.policy__text}>{t('policy_block2_text2')}</li>
            <li className={styles.policy__text}>{t('policy_block2_text3')}</li>
            <li className={styles.policy__text}>{t('policy_block2_text4')}</li>
          </ul>
        </div>

        <h2 className={styles.policy__blockTitle}>
          {t('policy_block3_title')}
        </h2>

        <div>
          <p className={styles.policy__text}>{t('policy_block3_text1')}</p>

          <ul className={styles.policy__list}>
            <li className={styles.policy__text}>{t('policy_block3_text2')}</li>
            <li className={styles.policy__text}>{t('policy_block3_text3')}</li>
            <li className={styles.policy__text}>{t('policy_block3_text4')}</li>
            <li className={styles.policy__text}>{t('policy_block3_text5')}</li>
          </ul>
        </div>

        <h2 className={styles.policy__blockTitle}>
          {t('policy_block4_title')}
        </h2>

        <div>
          <p className={styles.policy__text}>{t('policy_block4_text1')}</p>

          <ul className={styles.policy__list}>
            <li className={styles.policy__text}>{t('policy_block4_text2')}</li>
            <li className={styles.policy__text}>{t('policy_block4_text3')}</li>
            <li className={styles.policy__text}>{t('policy_block4_text4')}</li>
          </ul>
        </div>

        <h2 className={styles.policy__blockTitle}>
          {t('policy_block5_title')}
        </h2>

        <div>
          <p className={styles.policy__text}>{t('policy_block5_text1')}</p>

          <ul className={styles.policy__list}>
            <li className={styles.policy__text}>{t('policy_block5_text2')}</li>
            <li className={styles.policy__text}>{t('policy_block5_text3')}</li>
            <li className={styles.policy__text}>{t('policy_block5_text4')}</li>
            <li className={styles.policy__text}>{t('policy_block5_text5')}</li>
          </ul>

          <p className={styles.policy__text}>{t('policy_block5_text6')}</p>
        </div>

        <h2 className={styles.policy__blockTitle}>
          {t('policy_block6_title')}
        </h2>

        <p className={styles.policy__text}>{t('policy_block6_text1')}</p>

        <h2 className={styles.policy__blockTitle}>
          {t('policy_block7_title')}
        </h2>

        <p className={styles.policy__text}>{t('policy_block7_text1')}</p>
      </div>

      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
};
