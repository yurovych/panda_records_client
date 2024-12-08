import { useAppSelector } from '../../app/hooks';
import { Footer } from '../shared/Footer';
import styles from './Services.module.scss';
import { ServiceDetailedCard } from '../shared/ServiceDetailedCard';
import servicesList from './../../data/servicesCards.json';
import { ServicesSwiper } from '../shared/ServicesSwiper';
import videos from './../../data/videos.json';
import { ProcessVideoCard } from '../shared/ProcessVideoCard';
import { Loader } from '../Loader';

export const Services = () => {
  // const servicesList = useAppSelector((state) => state.sevrices.objects);
  const processVideosList = videos.slice(1);

  return (
    <div className={styles.services}>
      <h1>Our services</h1>

      <section className={styles.variety}>
        {servicesList ? (
          <ServicesSwiper
            type='type1'
            servicesCards={servicesList}
            ServiceToRender={ServiceDetailedCard}
          />
        ) : (
          <Loader />
        )}
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
