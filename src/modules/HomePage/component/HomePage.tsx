import styles from './HomePage.module.scss';

import { Footer } from '../../shared/Footer';
import { Button } from '../../shared/Button';
import { ServicesList } from '../../shared/ServicesList';
import cards from './../../../data/servicesCards.json';
import tracks from './../../../data/songsTracks.json';
import { SongsList } from '../../shared/SongsList';
import { ServicesSwiper } from '../../shared/ServicesSwiper';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <>
      <div className={styles.home}>
        <section className={styles.top}>
          <h3 className={styles.top__newSong}>New sound available</h3>

          <img
            className={styles.top__photo}
            src='./images/top-photo.png'
            alt='foto'
          />

          <h1 className={styles.top__title}>
            Make Sound that changes the world
          </h1>

          <h3 className={styles.top__text}>
            Your recording studio is a modern space for creating music that
            combines professional equipment and a cozy atmosphere.
          </h3>

          <div className={styles.top__button}>
            <Button text='Book a studio' />
          </div>
        </section>

        <section className={styles.aboutUs}>
          <h2 className={styles.aboutUs__title}>
            Place where sound becomes art.
          </h2>

          <img
            className={styles.aboutUs__photo}
            src='./images/about-us-photo.png'
            alt='foto'
          />

          <p className={styles.aboutUs__text}>
            We are a team of professionals in love with sound. Our studio brings
            together talented engineers, producers and musicians who turn ideas
            into masterpieces.
          </p>

          <div
            className={`${styles.aboutUs__advantages} ${styles.aboutUs__advantages_block1}`}
          >
            <div className={styles.aboutUs__advantage}>
              <img src='./icons/checkmark-filled-ico.svg' alt='checkmark' />
              <p>High-Quality recording</p>
            </div>

            <div className={styles.aboutUs__advantage}>
              <img src='./icons/checkmark-filled-ico.svg' alt='checkmark' />{' '}
              <p>Professional approach</p>
            </div>
          </div>

          <div
            className={`${styles.aboutUs__advantages} ${styles.aboutUs__advantages_block2}`}
          >
            <div className={styles.aboutUs__advantage}>
              <img src='./icons/checkmark-filled-ico.svg' alt='checkmark' />{' '}
              <p>Acoustically prepared space</p>
            </div>

            <div className={styles.aboutUs__advantage}>
              <img src='./icons/checkmark-filled-ico.svg' alt='checkmark' />{' '}
              <p>Access to modern technologies</p>
            </div>
          </div>

          <Link to='./about' className={styles.aboutUs__button}>
            <Button text='More About Us' />
          </Link>
        </section>

        <section className={styles.services}>
          <h2 className={styles.services__title}>Our studio services</h2>

          <div className={styles.services__cardsPhone}>
            <ServicesSwiper cards={cards} />
          </div>

          <div className={styles.services__cardsTablet}>
            <ServicesList cards={cards.slice(0, 4)} />
          </div>

          <div className={styles.services__cardsDesktop}>
            <ServicesList cards={cards} />
          </div>

          <Link to='./services' className={styles.services__viewAll}>
            View all services
          </Link>
        </section>

        <section className={styles.ourWorks}>
          <h2 className={styles.ourWorks__title}>Our most popular works</h2>

          <img
            className={styles.ourWorks__photo}
            src='./images/songs-photo.png'
            alt='foto'
          />

          <div className={styles.ourWorks__list}>
            <SongsList tracks={tracks} />
          </div>

          <Link to='./portfolio' className={styles.ourWorks__button}>
            <Button text='View Portfolio' />
          </Link>
        </section>

        <section className={styles.banner}>
          <img
            className={styles.banner__star}
            src='./images/baner-star.png'
            alt='image-star'
          />

          <h2 className={`${styles.banner__text} ${styles.banner__text_1}`}>
            Thinking of learning
          </h2>
          <h2 className={`${styles.banner__text} ${styles.banner__text_2}`}>
            to play guitar?
          </h2>
          <h2 className={`${styles.banner__text} ${styles.banner__text_3}`}>
            Today is the best day
          </h2>
          <h2 className={`${styles.banner__text} ${styles.banner__text_4}`}>
            to start.
          </h2>
        </section>

        <Footer />
      </div>
    </>
  );
};
