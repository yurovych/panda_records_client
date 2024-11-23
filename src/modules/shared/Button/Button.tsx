import styles from './Button.module.scss';

type ButtonType = {
  text: string;
};

export const Button: React.FC<ButtonType> = ({ text }) => {
  return (
    <>
      <div className={styles.button}>
        <div>
          <p>{text}</p>
        </div>
        <div></div>
      </div>
    </>
  );
};
