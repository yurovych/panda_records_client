import { Swiper, SwiperSlide } from 'swiper/react';
import { EquipmentCardType } from './../../../types/Equipment';
import styles from './EquipmentSwiper.module.scss';
import 'swiper/css';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { EquipmentCard } from '../EquipmentCard';

type EquipmentSwoperProps = {
  cards: EquipmentCardType[];
};

export const EquipmentSwiper: React.FC<EquipmentSwoperProps> = ({ cards }) => {
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        style={{ paddingInline: '32px' }}
        modules={[Navigation, Pagination, FreeMode]}
        pagination={{
          clickable: true,
        }}
        navigation
        slidesPerView={1.3}
        freeMode={true}
        spaceBetween={24}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <EquipmentCard card={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
