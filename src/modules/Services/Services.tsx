import { Footer } from '../shared/Footer';
import styles from './Services.module.scss';
import servicesList from './../../data/servicesCards.json';
import { ServicesSwiper } from '../shared/ServicesSwiper';
import videos from './../../data/videos.json';
import { ProcessVideoCard } from '../shared/ProcessVideoCard';
import { Loader } from '../Loader';
import { ServicesCard } from './../shared/ServicesCard/ServicesCard';
import { ServicesList } from '../shared/ServicesList';

export const Services = () => {
  const processVideosList = videos.filter((video) => video);

  return (
    <div className={styles.services}>
      <h1>Our services</h1>

      <section className={styles.variety}>
        <div className={styles.variety__photeTablet}>
          {servicesList ? (
            <ServicesSwiper
              type='type1'
              servicesWideCards={servicesList}
              ServiceToRender={ServicesCard}
            />
          ) : (
            <Loader />
          )}
        </div>

        <div className={styles.variety__desktop}>
          {servicesList ? (
            <ServicesList cards={servicesList} visual='wide' />
          ) : (
            <Loader />
          )}
        </div>
      </section>

      <section className={styles.process}>
        <h2 className={styles.process__title}>How the process looks like?</h2>

        <div className={styles.process__swiperWrapper}>
          {processVideosList ? (
            <ServicesSwiper
              type='type2'
              videoCards={processVideosList}
              VideoToRender={ProcessVideoCard}
            />
          ) : (
            <Loader />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
