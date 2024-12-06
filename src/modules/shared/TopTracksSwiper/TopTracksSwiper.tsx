import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './TopTracksSwiper.module.scss';
import 'swiper/css';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { SongTrackType } from '../../../types/SongTrack';
import { SongCard } from '../SongCard';

type ServicesSwoperProps = {
  tracks: SongTrackType[];
};

export const TopTracksSwiper = ({ tracks }: ServicesSwoperProps) => {
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        navigation
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {tracks.map((track) => (
          <SwiperSlide key={track.id}>
            <SongCard track={track} visual='card' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
