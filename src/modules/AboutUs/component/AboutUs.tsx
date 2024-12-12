import { ContactUs } from '../../shared/ContactUs';
import { Footer } from '../../shared/Footer';
import styles from './AboutUs.module.scss';

export const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <div className={styles.topWrapper}>
        <section className={styles.top}>
          <div className={styles.top__thornImg}>
            <img
              className={styles.top__thornImgItself}
              src='./icons/thorn-empty-ico.svg'
              alt='thorn_image'
            />
          </div>
          <h3 className={styles.top__greanTitle}>New sound available</h3>

          <div className={`${styles.top__photo} ${styles.top__photo_photo1}`}>
            <img
              className={styles.top__photoItself}
              src='./images/about-us-page/about-us-top2.jpg'
              alt='foto'
            />
          </div>

          <h1 className={styles.top__title}>
            Let us tell you more about us and our passion
          </h1>

          <div className={`${styles.top__photo} ${styles.top__photo_photo2}`}>
            <img
              className={styles.top__photoItself}
              src='./images/about-us-page/about-us-top1.jpg'
              alt='foto'
            />
          </div>

          <h5 className={styles.top__text}>
            Welcome to Panda Records, where we invite inspiration by creating
            the conditions for the best sound.
          </h5>
        </section>
      </div>

      <div className={styles.staffWrapper}>
        <section className={styles.staff}>
          <h2 className={styles.staff__title}>Studio founder</h2>

          <div className={styles.staff__media}>
            <img
              className={styles.staff__mediaItself}
              src='./images/about-us-page/founder-photo.jpg'
              alt='media-content'
            />
          </div>

          <p className={`${styles.staff__text} ${styles.staff__text_text1}`}>
            Hello! My name is Roman, and I am a passionate sound engineer at our
            studio. I’ve been creating music for over five years, but my love
            for it has been with me my entire life. Throughout my career, I’ve
            had the privilege of working regularly with talented artists such as
            Milan, Field, and Your Bunny Writes.
          </p>

          <p className={`${styles.staff__text} ${styles.staff__text_text2}`}>
            My journey began as a self-taught musician, fueled by curiosity and
            determination. In my third year, I decided to deepen my knowledge by
            studying in Kyiv with some of the best professionals in the
            industry. That experience helped me refine my skills and broaden my
            creative vision. Now based in Lviv, I dedicate myself to helping
            artists bring their musical ideas to life.
          </p>
        </section>
      </div>

      <div className={styles.historyWrapper}>
        <section className={styles.history}>
          <h2 className={styles.history__title}>History & Ideas </h2>

          <article className={styles.history__article1}>
            <p className={styles.history__art1Text}>
              I love music and I want to inspire and help musicians reach their
              true potential. I love music and I want to inspire
            </p>
          </article>

          <article className={styles.history__article2}>
            <div className={styles.history__art2Thorn}>
              <img
                className={styles.history__art2ThornItself}
                src='./icons/thorn-green-ico.svg'
                alt='thorn-image'
              />
            </div>

            <div className={styles.history__art2rectangel}>
              <p className={styles.history__art2RectangelText}>
                Idea and first steps
              </p>
            </div>

            <p
              className={`${styles.history__art2Text} ${styles.history__art2Text_text1}`}
            >
              The idea to open a studio came from my passion for music and a
              desire to help artists bring their ideas to life.
            </p>
            <p
              className={`${styles.history__art2Text} ${styles.history__art2Text_text2}`}
            ></p>
          </article>

          <article className={styles.history__article3}>
            <p className={styles.history__art3Text}>
              The ongoing war in Ukraine has created a difficult environment for
              many, and we are pleased to offer a recording studio that allows
              Ukrainian musicians to share their work with the world while
              making a positive impact.
            </p>
          </article>

          <article className={styles.history__article4}>
            <div className={styles.history__art4rectangel}>
              <p className={styles.history__art4RectangelText}>
                Idea and first steps
              </p>
            </div>

            <p className={styles.history__art4Text_text1}>
              The first steps were simple but crucial, starting with basic
              equipment and a small space. I spent countless hours learning, and
              experimenting.
            </p>
            <p className={styles.history__art4Text_text2}>
              As I gained experience, the studio slowly took shape, growing both
              in equipment and in the number of creative projects. It was a
              process of trial and error, but each step brought me closer to
              realizing the vision.
            </p>
          </article>

          <article className={styles.history__article5}>
            <div className={styles.history__art5Thorn}>
              <img
                className={styles.history__art2ThornItself}
                src='./icons/thorn-blue-ico.svg'
                alt='thorn-image'
              />
            </div>

            <p className={styles.history__art5Text}>
              I love music and I want to inspire and help musicians reach their
              true potential. I love music and I want to inspire
            </p>
          </article>
        </section>
      </div>

      <div className={styles.staffWrapper}>
        <section className={styles.staff}>
          <h2 className={styles.staff__title}>Guitar teacher</h2>

          <div className={styles.staff__media}>
            <img
              className={styles.staff__mediaItself}
              src='./images/about-us-page/teacher-photo.jpg'
              alt='media-content'
            />
          </div>

          <p className={`${styles.staff__text} ${styles.staff__text_text1}`}>
            Anton Poliovyi plays classical, acoustic, electric guitar, bass,
            ukulele, and drums. I have more than four years of teaching
            experience, more than 100 students.
          </p>

          <p className={`${styles.staff__text} ${styles.staff__text_text2}`}>
            I teach both from scratch, giving the basics of hand placement,
            sound production, the basics of musical literacy, and guitarists
            with experience, adjusting and improving their technical and
            theoretical skills.
          </p>
        </section>
      </div>

      <ContactUs />

      <Footer />
    </div>
  );
};
