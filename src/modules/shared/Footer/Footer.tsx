import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import styles from './Footer.module.scss';
import { scrollPageUp } from '../../../helpers/scrollPageUp';

export const Footer = () => {
  const handleLogoClick = () => {
    scrollPageUp();
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer__main}>
        <div onClick={handleLogoClick} className={styles.footer__logo}>
          <Logo />
        </div>

        <div className={styles.footer__navigationWrapper}>
          <Navigation />
        </div>
      </div>
      <div className={styles.footer__line}></div>
      <div className={styles.footer__bottom}>
        2024&nbsp;&nbsp;&nbsp;&nbsp;Panda Records. Copyright&nbsp;&nbsp; &copy;
      </div>
    </div>
  );
};
