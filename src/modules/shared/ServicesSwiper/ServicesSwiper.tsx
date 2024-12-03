import { Swiper, SwiperSlide } from 'swiper/react';
import { ServiceCardType } from '../../../types/Service';
import { ServicesCard } from '../ServicesCard';
import styles from './ServicesSwiper.module.scss';
import 'swiper/css';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import { Navigation, Pagination } from 'swiper/modules';

type ServicesSwoperProps = {
  cards: ServiceCardType[];
};

export const ServicesSwiper = ({ cards }: ServicesSwoperProps) => {
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
        }}
        navigation
        spaceBetween={16}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <ServicesCard card={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
