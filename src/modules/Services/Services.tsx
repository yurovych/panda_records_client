import { EquipmentList } from '../shared/EquipmentList';
import { useAppSelector } from '../../app/hooks';
import { ServicesList } from '../shared/ServicesList';
import { SongsList } from '../shared/SongsList';
import { Footer } from '../shared/Footer';
import styles from './Services.module.scss';
import { ServiceDetailedCard } from '../shared/ServiceDetailedCard';
import services from './../../data/servicesCards.json';
import { ServicesSwiper } from '../shared/ServicesSwiper';
import videos from './../../data/videos.json';
import { ProcessVideoCard } from '../shared/ProcessVideoCard';

export const Services = () => {
  const servicesList = useAppSelector((state) => state.sevrices.objects);
  const equipmentList = useAppSelector((state) => state.equipment.objects);
  const songsList = useAppSelector((state) => state.songs.objects);
  const processVideosList = videos.slice(1);

  const topSongs = songsList.filter((song) => song.top);

  return (
    <div className={styles.services}>
      <section className={styles.variety}>
        <ServicesSwiper
          type='type1'
          servicesCards={servicesList}
          ServiceToRender={ServiceDetailedCard}
        />
      </section>

      <section className={styles.process}>
        <h2 className={styles.process__title}>How the process looks like?</h2>

        <div className={styles.process__swiperWrapper}>
          <ServicesSwiper
            type='type2'
            videoCards={processVideosList}
            VideoToRender={ProcessVideoCard}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};
