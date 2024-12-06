import { EquipmentList } from '../shared/EquipmentList';
import { useAppSelector } from '../../app/hooks';
import { ServicesList } from '../shared/ServicesList';
import { SongsList } from '../shared/SongsList';
import { Footer } from '../shared/Footer';
import styles from './Services.module.scss';
import { ServiceDetailedCard } from '../shared/ServiceDetailedCard';
import services from './../../data/servicesCards.json';
import { ServicesSwiper } from '../shared/ServicesSwiper';

export const Services = () => {
  const servicesList = useAppSelector((state) => state.sevrices.objects);
  const equipmentList = useAppSelector((state) => state.equipment.objects);
  const songsList = useAppSelector((state) => state.songs.objects);

  const topSongs = songsList.filter((song) => song.top);

  return (
    <div className={styles.services}>
      <section className={styles.variety}>
        <ServicesSwiper
          servicesCards={servicesList}
          ServiceToRender={ServiceDetailedCard}
        />
      </section>

      <Footer />
    </div>
  );
};
