import { Swiper, SwiperSlide } from 'swiper/react';
// import { ServicesCard } from '../ServicesCard';
import styles from './ServicesSwiper.module.scss';
import 'swiper/css';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { ServiceCardType } from '../../../types/Service';
import { EquipmentCardType } from '../../../types/Equipment';
import { VideoFileType } from '../../../types/Video';
import { SongTrackType } from '../../../types/SongTrack';

type ServicesSwiperProps = {
  type: 'type1' | 'type2';
  equipmentCadrs?: EquipmentCardType[];
  servicesCards?: ServiceCardType[];
  servicesWideCards?: ServiceCardType[];
  videoCards?: VideoFileType[];
  songsCards?: SongTrackType[];
  ServiceToRender?: React.FC<{
    card: ServiceCardType;
    visual: 'brief' | 'wide';
  }>;
  EquipmentToRender?: React.FC<{ card: EquipmentCardType }>;
  VideoToRender?: React.FC<{ card: VideoFileType }>;
  SongToRender?: React.FC<{ track: SongTrackType; visual: 'card' | 'strip' }>;
};

export const ServicesSwiper = ({
  type,
  equipmentCadrs,
  servicesCards,
  servicesWideCards,
  videoCards,
  songsCards,
  ServiceToRender,
  EquipmentToRender,
  VideoToRender,
  SongToRender,
}: ServicesSwiperProps) => {
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        style={type === 'type2' ? { paddingInline: '32px' } : undefined}
        modules={[Navigation, Pagination, FreeMode]}
        pagination={{ clickable: true }}
        navigation
        spaceBetween={type === 'type2' ? 24 : 16}
        freeMode={type === 'type2' && true}
        slidesPerView={1}
        breakpoints={
          type === 'type1'
            ? {
                640: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 4,
                },
              }
            : { 340: { slidesPerView: 1.3 }, 1200: { slidesPerView: 3 } }
        }
      >
        {ServiceToRender &&
          servicesCards &&
          servicesCards.map((card) => (
            <SwiperSlide key={card.id}>
              <ServiceToRender card={card} visual='brief' />
            </SwiperSlide>
          ))}
        {ServiceToRender &&
          servicesWideCards &&
          servicesWideCards.map((card) => (
            <SwiperSlide key={card.id}>
              <ServiceToRender card={card} visual='wide' />
            </SwiperSlide>
          ))}
        {EquipmentToRender &&
          equipmentCadrs &&
          equipmentCadrs.map((card) => (
            <SwiperSlide key={card.id}>
              <EquipmentToRender card={card} />
            </SwiperSlide>
          ))}
        {VideoToRender &&
          videoCards &&
          videoCards.map((card) => (
            <SwiperSlide key={card.id}>
              <VideoToRender card={card} />
            </SwiperSlide>
          ))}
        {SongToRender &&
          songsCards &&
          songsCards.map((card) => (
            <SwiperSlide key={card.id}>
              <SongToRender track={card} visual='card' />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
