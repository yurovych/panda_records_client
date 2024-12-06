import { Swiper, SwiperSlide } from 'swiper/react';
import { ServiceCardType } from '../../../types/Service';
// import { ServicesCard } from '../ServicesCard';
import styles from './ServicesSwiper.module.scss';
import 'swiper/css';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { EquipmentCardType } from '../../../types/Equipment';

type ServicesSwiperProps = {
  equipmentCadrs?: EquipmentCardType[];
  servicesCards?: ServiceCardType[];
  ServiceToRender?: React.FC<{ card: ServiceCardType }>;
  EquipmentToRender?: React.FC<{ card: EquipmentCardType }>;
};

export const ServicesSwiper = ({
  equipmentCadrs,
  servicesCards,
  ServiceToRender,
  EquipmentToRender,
}: ServicesSwiperProps) => {
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        style={EquipmentToRender && { paddingInline: '32px' }}
        slidesPerView={EquipmentToRender ? 1.3 : 1}
        modules={[Navigation, Pagination, FreeMode]}
        pagination={{
          clickable: true,
        }}
        navigation
        spaceBetween={EquipmentToRender ? 24 : 16}
        freeMode={EquipmentToRender && true}
      >
        {ServiceToRender &&
          servicesCards &&
          servicesCards.map((card) => (
            <SwiperSlide key={card.id}>
              <ServiceToRender card={card} />
            </SwiperSlide>
          ))}
        {EquipmentToRender &&
          equipmentCadrs &&
          equipmentCadrs.map((card) => (
            <SwiperSlide key={card.id}>
              <EquipmentToRender card={card} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
