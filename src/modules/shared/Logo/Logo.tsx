import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link to='/' className={styles.logo}>
      <img src='/icons/logo_panda52x52.svg' alt='logo-ico' />

      <div className={styles.logo__text}>
        <p className={styles.logo__text_top}>PANDA</p>
        <p className={styles.logo__text_bottom}>RECORDS</p>
      </div>
    </Link>
  );
};
