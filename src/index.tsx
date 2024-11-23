import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { HomePage } from './modules/HomePage/component/HomePage';
import { AdminPage } from './modules/AdminPage/component/AdminPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { NotFoundPage } from './modules/NotFoundPage/component/NotFoundPage';
import { LoginPage } from './modules/LoginPage/component';
import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
