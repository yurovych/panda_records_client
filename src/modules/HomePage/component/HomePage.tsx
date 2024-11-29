import styles from './HomePage.module.scss';

import { Footer } from '../../shared/Footer';
import { Button } from '../../shared/Button';
import { ServicesList } from '../../shared/ServicesList';
import equipment from './../../../data/equipmentCards.json';
import services from './../../../data/servicesCards.json';
import tracks from './../../../data/songsTracks.json';
import videos from './../../../data/videos.json';
import { SongsList } from '../../shared/SongsList';
import { ServicesSwiper } from '../../shared/ServicesSwiper';
import { Link } from 'react-router-dom';
import { EquipmentList } from '../../shared/EquipmentList';
import { EquipmentSwiper } from '../../shared/EquipmentSwiper/EquipmentSwiper';
import { ContactForm } from '../../shared/ContactForm';

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
            <ServicesSwiper cards={services} />
          </div>

          <div className={styles.services__cardsTablet}>
            <ServicesList cards={services.slice(0, 4)} />
          </div>

          <div className={styles.services__cardsDesktop}>
            <ServicesList cards={services} />
          </div>

          <div className={styles.services__viewAll}>
            <Link className={styles.services__viewAll_link} to='./services'>
              View all services
            </Link>
          </div>
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
            to play the guitar?
          </h2>
          <h2 className={`${styles.banner__text} ${styles.banner__text_3}`}>
            Today is the best day
          </h2>
          <h2 className={`${styles.banner__text} ${styles.banner__text_4}`}>
            to start.
          </h2>
        </section>

        <section className={styles.lessons}>
          <h2 className={styles.lessons__title}>{videos[0].title}</h2>

          <video className={styles.lessons__video} controls>
            <source src={videos[0].video_file} type='video/mp4' />
            Your browser does not support the video tag.
          </video>

          <h5
            className={`${styles.lessons__desctiption} ${styles.lessons__desctiption_block1}`}
          >
            {videos[0].description_blok1}
          </h5>

          <h5
            className={`${styles.lessons__desctiption} ${styles.lessons__desctiption_block2}`}
          >
            {videos[0].description_blok2}
          </h5>

          <div className={styles.lessons__button}>
            <Button text='Contact the teacher' />
          </div>
        </section>

        <section className={styles.equipment}>
          <img
            className={`${styles.equipment__star} ${styles.equipment__star_star1}`}
            src='./images/equipment-white-star.png'
            alt='image-star'
          />

          <img
            className={`${styles.equipment__star} ${styles.equipment__star_star2}`}
            src='./images/equipment-white-star.png'
            alt='image-star'
          />

          <h2 className={styles.equipment__title}>Our equipment</h2>

          <div className={styles.equipment__cardsPhone}>
            <EquipmentList cards={equipment.slice(0, 2)} />
          </div>

          <div className={styles.equipment__cardsTablet}>
            <EquipmentSwiper cards={equipment} />
          </div>

          <div className={styles.equipment__cardsDesktop}>
            <EquipmentList cards={equipment.slice(0, 4)} />
          </div>

          <div className={styles.equipment__viewAllWrapper}>
            <Link to='./services' className={styles.equipment__viewAll}>
              View All Equipment
            </Link>
          </div>
        </section>

        <section className={styles.testimonials}>
          <h2 className={styles.testimonials__title}>Testimonials</h2>

          <div className={styles.testimonials__blocksWrapper}>
            <div
              className={`${styles.testimonials__block} ${styles.testimonials__block_block1}`}
            >
              <img
                className={`${styles.testimonials__imageQuotes} ${styles.testimonials__imageQuotes_block1}`}
                src='./icons/white-quotes-ico.svg'
                alt='image-quotes'
              />

              <div className={styles.testimonials__textContent}>
                <h4
                  className={`${styles.testimonials__message} ${styles.testimonials__message_block1}`}
                >
                  Panda Records - modern equipment, good recording quality,
                  friendly staff.
                </h4>

                <div>
                  <h4
                    className={`${styles.testimonials__name} ${styles.testimonials__name_block1}`}
                  >
                    Vlad Boichuk
                  </h4>

                  <h5
                    className={`${styles.testimonials__activitie} ${styles.testimonials__activitie_block1}`}
                  >
                    guitar player
                  </h5>
                </div>
              </div>

              <img
                className={`${styles.testimonials__personPhoto} ${styles.testimonials__personPhoto_block1}`}
                src='./images/section-testimonials/photo-block1.png'
                alt='photo-persone'
              />
            </div>

            <div
              className={`${styles.testimonials__block} ${styles.testimonials__block_block2}`}
            >
              <img
                className={`${styles.testimonials__imageQuotes} ${styles.testimonials__imageQuotes_block2}`}
                src='./icons/pink-quotes-ico.svg'
                alt='image-quotes'
              />

              <div className={styles.testimonials__textContent}>
                <h4
                  className={`${styles.testimonials__message} ${styles.testimonials__message_block2}`}
                >
                  I am very pleased with the recording! The sound is clear,
                  without noise, and the mix sounds professional.
                </h4>

                <div>
                  <h4
                    className={`${styles.testimonials__name} ${styles.testimonials__name_block2}`}
                  >
                    Vlad Boichuk
                  </h4>

                  <h5
                    className={`${styles.testimonials__activitie} ${styles.testimonials__activitie_block2}`}
                  >
                    guitar player
                  </h5>
                </div>
              </div>

              <img
                className={`${styles.testimonials__personPhoto} ${styles.testimonials__personPhoto_block2}`}
                src='./images/section-testimonials/photo-block2.png'
                alt='photo-persone'
              />
            </div>

            <div
              className={`${styles.testimonials__block} ${styles.testimonials__block_block3}`}
            >
              <img
                className={`${styles.testimonials__imageQuotes} ${styles.testimonials__imageQuotes_block3}`}
                src='./icons/black-quotes-ico.svg'
                alt='image-quotes'
              />

              <div className={styles.testimonials__textContent}>
                <h4
                  className={`${styles.testimonials__message} ${styles.testimonials__message_block3}`}
                >
                  The studio team is very attentive to details. They helped to
                  adapt the sound to my style!
                </h4>

                <div>
                  <h4
                    className={`${styles.testimonials__name} ${styles.testimonials__name_block3}`}
                  >
                    Vlad Boichuk
                  </h4>

                  <h5
                    className={`${styles.testimonials__activitie} ${styles.testimonials__activitie_block3}`}
                  >
                    guitar player
                  </h5>
                </div>
              </div>

              <img
                className={`${styles.testimonials__personPhoto} ${styles.testimonials__personPhoto_block3}`}
                src='./images/section-testimonials/photo-block3.png'
                alt='photo-persone'
              />
            </div>
          </div>
        </section>

        <section id='contactUs' className={styles.contactUs}>
          <h2 className={styles.contactUs__title}>Contact us</h2>

          <img
            className={styles.contactUs__image}
            src='./images/section-contactUs/contactUs_image.png'
            alt='contactUs-image'
          />

          <div
            className={`${styles.contactUs__inTouch} ${styles.contactUs__infoBlock}`}
          >
            <h3 className={styles.contactUs__infoBlock_title}>
              Get in touch via
            </h3>

            <h5
              className={`${styles.contactUs__inTouch_email} ${styles.contactUs__infoBlock_text}`}
            >
              hello@gmail.com
            </h5>

            <h5 className={styles.contactUs__infoBlock_text}>+380687166092</h5>
          </div>

          <div
            className={`${styles.contactUs__visit} ${styles.contactUs__infoBlock}`}
          >
            <h3 className={styles.contactUs__infoBlock_title}>Visit Studio</h3>

            <h5 className={styles.contactUs__infoBlock_text}>
              79000 Ukraine <br /> Lviv, str. Kozelnytska 17
            </h5>
          </div>

          <div
            className={`${styles.contactUs__follow} ${styles.contactUs__infoBlock}`}
          >
            <h3
              className={`${styles.contactUs__infoBlock_title} ${styles.contactUs__follow_title}`}
            >
              Follow Us
            </h3>

            <div className={styles.contactUs__icons}>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://www.instagram.com/panda._.record?igsh=a2J0ajlmbXptNGd4'
              >
                <img
                  src='./icons/instagram-color-ico.svg'
                  alt='instagram-ico'
                />
              </a>

              <a target='_blank' rel='noreferrer' href='http://youtube.com'>
                <img src='./icons/youtube-color-ico.svg' alt='youtube-ico' />
              </a>

              <a target='_blank' rel='noreferrer' href='http://spotify.com'>
                <img src='./icons/spotify-color-ico.svg' alt='spotify-ico' />
              </a>
            </div>
          </div>

          <h3 className={styles.contactUs__formTitle}>
            Do you have any questions?
            <br />
            Write to us!
          </h3>

          <div className={styles.contactUs__form}>
            <ContactForm />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};
