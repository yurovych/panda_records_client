import { Button } from '../Button';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__content_left}>
          <p>New sound available</p>
          <h1>Make Sound that chsnges the world</h1>
          <p>
            Your recording studio is a modern space for creating music that
            combines professional equipment and a cozy atmosphere.
          </p>

          <Button text='Book a studio' />
        </div>
        <div className={styles.header__content_right}></div>
      </div>
    </header>
  );
};
