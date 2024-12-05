import styles from './AboutUs.module.scss';

export const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <section className={styles.top}>
        <h3 className={styles.top__greanTitle}>New sound available</h3>

        <div className={`${styles.top__photoq} ${styles.top__photo_photo1}`}>
          <img
            className={styles.top__photoItself}
            src='./images/about-us-top2.png'
            alt='foto'
          />
        </div>

        <h1 className={styles.top__title}>
          Let's get acquainted with our studio closer
        </h1>

        <div className={`${styles.top__photo} ${styles.top__photo_photo2}`}>
          <img
            className={styles.top__photoItself}
            src='./images/about-us-top1.png'
            alt='foto'
          />
        </div>

        <h5 className={styles.top__text}>
          Welcome to Panda Records, where we invite inspiration by creating the
          conditions for the best sound.
        </h5>
      </section>
    </div>
  );
};
