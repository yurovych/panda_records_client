/* eslint-disable react-hooks/exhaustive-deps */
import { accessTokenService } from '../../../services/accessTokenService';
import { authService } from '../../../services/authService';
import styles from './AdminPage.module.scss';
import React, { useEffect } from 'react';
import { TokensType } from '../../../types/Tokens';
import { Outlet, useNavigate } from 'react-router-dom';
import { Loader } from '../../Loader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setIsAuthenticated } from '../../../slices/booleanSlice';
import { fetchMessagesAsync } from '../../../slices/fetchMessages';
import { AdminPanel } from '../../AdminPanel/component';
import { OpenedMessage } from '../OpenedMessage';

export const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(
    (state) => state.boolean.isAuthenticated
  );
  const isMessageOpened = useAppSelector(
    (state) => state.boolean.isMessageOpened
  );
  const messagesFetchError = useAppSelector((state) => state.messages.error);

  async function checkAuth() {
    try {
      const { access_token }: TokensType = await authService.refresh();
      accessTokenService.save(access_token);
      dispatch(setIsAuthenticated(true));
      dispatch(fetchMessagesAsync());
    } catch (error) {
      navigate('/login');
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className={styles.adminPageWrapper}>
          {isMessageOpened && <OpenedMessage />}
          <div id='AdminPage' className={styles.adminPage}>
            <div className={styles.adminPage__panel}>
              <AdminPanel />
            </div>

            <div className={styles.adminPage__contentWrapper}>{<Outlet />}</div>
          </div>
        </div>
      ) : messagesFetchError ? (
        <p className={`${styles.fetchError} notification is-danger is-light`}>
          {messagesFetchError}
        </p>
      ) : (
        <Loader />
      )}
    </>
  );
};
