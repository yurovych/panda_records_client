import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { HomePage } from './modules/HomePage/component/HomePage';
import { AdminPage } from './modules/AdminPage/component/AdminPage';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { NotFoundPage } from './modules/NotFoundPage/component/NotFoundPage';
import { LoginPage } from './modules/LoginPage/component';
import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { AboutUs } from './modules/AboutUs/component';
import { Services } from './modules/Services';
import { Portfolio } from './modules/Portfolio';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ResetPasswordRequest } from './modules/ResetPasswordRequest';
import { ResetPasswordPage } from './modules/ResetPasswordPage';
import { MessagesList } from './modules/AdminPage/MessagesList';
import { ChangeEmail } from './modules/AdminPage/ChangeEmail';
import { ChangePassword } from './modules/AdminPage/ChangePassword';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<App />}>
              <Route index element={<HomePage />} />
              <Route path='about' element={<AboutUs />} />
              <Route path='services' element={<Services />} />
              <Route path='portfolio' element={<Portfolio />} />
              <Route path='admin' element={<AdminPage />}>
                <Route index element={<MessagesList />} />
                <Route path='change-email' element={<ChangeEmail />} />
                <Route path='change-password' element={<ChangePassword />} />
              </Route>
              <Route path='login' element={<LoginPage />} />
              <Route path='password-reset' element={<ResetPasswordRequest />} />
              <Route
                path='password-reset/:reset_token'
                element={<ResetPasswordPage />}
              />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
