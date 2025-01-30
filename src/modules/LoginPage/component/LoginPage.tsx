import { Formik, Form, Field } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { accessTokenService } from '../../../services/accessTokenService';
import { useState } from 'react';
import { authService } from '../../../services/authService';
import styles from './LoginPage.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useValidation } from '../../../app/hooks';

type LoginParams = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { validateEmail, validatePassword } = useValidation();

  const currentLanguage = useAppSelector(
    (state) => state.current.currentLanguage
  );

  const [error, setError] = useState('');

  async function login({ email, password }: LoginParams): Promise<void> {
    const { access_token, telegram_bot } = await authService.login({
      email,
      password,
      currentLanguage,
    });

    accessTokenService.save(access_token);
    localStorage.setItem('telegram_bot', telegram_bot);
  }

  return (
    <div className={styles.login}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnMount={true}
        onSubmit={({ email, password }, formikHelpers) => {
          return login({ email, password })
            .then(() => {
              navigate(location.state?.from?.pathname || '/admin');
            })
            .catch((error) => {
              if (error.message) {
                setError(error.message);
              }

              if (!error.response?.data) {
                return;
              }

              const { errors, detail } = error.response.data;

              formikHelpers.setFieldError('new_password', errors?.new_password);
              formikHelpers.setFieldError(
                'confirm_password',
                errors?.confirm_password
              );

              if (detail) {
                setError(detail);
              }
            })
            .finally(() => {
              setTimeout(() => {
                setError('');
              }, 5000);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <>
            <div className={styles.goHomeButton}>
              <Link className={styles.goHomeLink} to={'/'}>
                {t('return_to_home_page')}
              </Link>
            </div>

            <Form className={styles.form}>
              <h1 className={styles.form__title}>{t('login_title')}</h1>
              <div className={styles.form__element}>
                <label htmlFor='email' className={styles.form__label}>
                  {t('email')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    validate={validateEmail}
                    name='email'
                    type='email'
                    id='email'
                    placeholder='e.g. Johnjohnson@gmail.com'
                    className={`${cn({
                      'is-danger': touched.email && errors.email,
                    })} ${styles.form__field}`}
                  />

                  <span
                    className={`${styles.form__icoBlock} icon is-small is-left`}
                  >
                    <i className='fa fa-envelope'></i>
                  </span>

                  {touched.email && errors.email && (
                    <span
                      className={`${styles.form__icoBlock} icon is-small is-right has-text-danger`}
                    >
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.email && errors.email && (
                  <p className='help is-danger'>{errors.email}</p>
                )}
              </div>
              <div className={styles.form__element}>
                <label className={styles.form__label} htmlFor='password'>
                  {t('password')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    validate={validatePassword}
                    name='password'
                    type='password'
                    id='password'
                    placeholder='*******'
                    className={`${cn({
                      'is-danger': touched.password && errors.password,
                    })} ${styles.form__field}`}
                  />

                  <span
                    className={`${styles.form__icoBlock} icon is-small is-left`}
                  >
                    <i className='fa fa-lock'></i>
                  </span>

                  {touched.password && errors.password && (
                    <span
                      className={`${styles.form__icoBlock} icon is-small is-right has-text-danger`}
                    >
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.password && errors.password ? (
                  <p className='help is-danger'>{errors.password}</p>
                ) : (
                  <p className={`help ${styles.form__hint}`}>
                    {t('password_hint')}
                  </p>
                )}
              </div>
              <div className={styles.form__element}>
                <button
                  type='submit'
                  disabled={isSubmitting || !!errors.email || !!errors.password}
                  className={`${styles.form__formikButton} ${
                    (isSubmitting || !!errors.email || !!errors.password) &&
                    styles.disabled
                  }`}
                >
                  {t('log_in')}
                </button>
              </div>
              <div className={styles.form__forgotPassword}>
                {t('forgot_password')}
                &nbsp;&nbsp;&nbsp;
                <Link
                  className={styles.form__resetPassword}
                  to='/password-reset'
                >
                  {t('reset_password')}
                </Link>
              </div>
            </Form>
          </>
        )}
      </Formik>

      {error && (
        <p className={`${styles.loginError} notification is-danger is-light`}>
          {error}
        </p>
      )}
    </div>
  );
};
