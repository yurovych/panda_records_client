import { accessTokenService } from '../../../services/accessTokenService';
import { authService } from '../../../services/authService';
import styles from './AdminPage.module.scss';
import React, { useEffect, useState } from 'react';
import { TokensType } from './../../../types/Tokens';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../Loader';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkAuth() {
    try {
      const { access_token }: TokensType = await authService.refresh();
      accessTokenService.save(access_token);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('User is not authenticated');
      navigate('./../login');
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <Loader />
      ) : (
        <div id='AdminPage' className={styles.adminPage}>
          This is AdminPage
        </div>
      )}
    </>
  );

  // return (
  //   <>
  //     {false ? (
  //       <Loader />
  //     ) : (
  //       <div id='AdminPage' className={styles.adminPage}>
  //         This is AdminPage
  //       </div>
  //     )}
  //   </>
  // );
};
