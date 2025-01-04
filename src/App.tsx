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
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Player } from './modules/shared/Player';
import { TokensType } from './types/Tokens';
import { authService } from './services/authService';
import { accessTokenService } from './services/accessTokenService';
import { setIsAuthenticated } from './slices/booleanSlice';
import { setCurrentLanguage } from './slices/current';
import { useTranslation } from 'react-i18next';

export const App = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const currenLanguage = useAppSelector(
    (state) => state.current.currentLanguage
  );

  async function checkAuth() {
    try {
      const { access_token }: TokensType = await authService.refresh();
      accessTokenService.save(access_token);
      dispatch(setIsAuthenticated(true));
    } catch (error) {
      dispatch(setIsAuthenticated(false));
    }
  }

  useEffect(() => {
    dispatch(fetchSongsAsync());
    dispatch(fetchServicesAsync(currenLanguage));
    dispatch(fetchEquipmentAsync(currenLanguage));
    dispatch(fetchVideosAsync(currenLanguage));
    i18n.changeLanguage(currenLanguage);
  }, [currenLanguage, dispatch, i18n]);

  useEffect(() => {
    scrollPageUp();
    checkAuth();

    const customerLanguage = localStorage.getItem('language');

    if (customerLanguage) {
      dispatch(setCurrentLanguage(customerLanguage));
    } else {
      dispatch(setCurrentLanguage('ua'));
    }
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
