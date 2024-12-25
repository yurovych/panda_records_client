import { accessTokenService } from '../../../services/accessTokenService';
import { authService } from '../../../services/authService';
import styles from './AdminPage.module.scss';
import React, { useEffect } from 'react';
import { TokensType } from './../../../types/Tokens';
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

  // const messages = useAppSelector((state) => state.messages.objects);

  async function checkAuth() {
    try {
      const { access_token }: TokensType = await authService.refresh();
      accessTokenService.save(access_token);
      dispatch(setIsAuthenticated(true));
      dispatch(fetchMessagesAsync());
    } catch (error) {
      console.log('User is not authenticated');
      navigate('./../login');
    }
  }

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  return (
    <div className={styles.adminPageWrapper}>
      {isMessageOpened && <OpenedMessage />}

      <div id='AdminPage' className={styles.adminPage}>
        <div className={styles.adminPage__panel}>
          <AdminPanel />
        </div>

        <div className={styles.adminPage__listWrapper}>{<Outlet />}</div>
      </div>
    </div>
  );
};

// <>
//   {!isAuthenticated ? (
//     <Loader />
//   ) : (
//     <div id='AdminPage' className={styles.adminPage}>
//       {messages ? (
//         messages.map((message) => <p>{message.name}</p>)
//       ) : (
//         <p> List is empty </p>
//       )}

//       <button onClick={logout}>Logout</button>
//     </div>
//   )}
// </>
