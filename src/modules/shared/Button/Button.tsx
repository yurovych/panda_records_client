import styles from './Button.module.scss';

type ButtonType = {
  text: string;
};

export const Button: React.FC<ButtonType> = ({ text }) => {
  return (
    <div className={styles.button}>
      <div className={styles.button__whiteField}>{text}</div>

      <div className={styles.button__arrowWrapper}>
        <img
          className={styles.button__arrow}
          src='/icons/arrows-corner-up-right-ico.svg'
          alt='arrow'
        />

        <img
          className={styles.button__hidenArrow}
          src='/icons/arrows-corner-up-right-ico.svg'
          alt='arrow'
        />
      </div>
    </div>
  );
};
