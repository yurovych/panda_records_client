import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import { HidenMenu } from './modules/HidenMenu/components';
import { Header } from './modules/shared/Header';
import { scrollPageUp } from './helpers/scrollPageUp';
import { useEffect } from 'react';
import { fetchSongsAsync } from './slices/fetchSongs';
import { fetchServicesAsync } from './slices/fetchServices';
import { fetchEquipmentAsync } from './slices/fetchEquipment';
import { fetchVideosAsync } from './slices/fetchVideos';
import { useAppDispatch } from './app/hooks';
import { Player } from './modules/shared/Player';
import { VideoPlayer } from './modules/shared/VideoPlayer';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSongsAsync());
    dispatch(fetchServicesAsync());
    dispatch(fetchEquipmentAsync());
    dispatch(fetchVideosAsync());
  }, []);

  useEffect(() => {
    scrollPageUp();
  }, []);

  return (
    <div className={styles.app}>
      <Player />
      <HidenMenu />
      <Header />
      <Outlet />
    </div>
  );
};
