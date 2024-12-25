import { Formik, Form, Field } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { accessTokenService } from '../../../services/accessTokenService';
import { useState } from 'react';
import { TokensType } from './../../../types/Tokens';
import { authService } from '../../../services/authService';
import styles from './LoginPage.module.scss';
import { useTranslation } from 'react-i18next';

type LoginParams = {
  email: string;
  password: string;
};

function validateEmail(value: string) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

function validatePassword(value: string) {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 5) {
    return 'At least 5 characters';
  }
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [error, setError] = useState('');

  async function login({ email, password }: LoginParams): Promise<void> {
    const { access_token }: TokensType = await authService.login({
      email,
      password,
    });

    accessTokenService.save(access_token);
  }

  return (
    <div className={styles.login}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnMount={true}
        onSubmit={({ email, password }) => {
          return login({ email, password })
            .then(() => {
              navigate(location.state?.from?.pathname || '/admin');
            })
            .catch((error) => {
              console.log(`Error is ${error}`);

              setError(error.response?.data?.message);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <>
            <div className={styles.goHomeButton}>
              <Link className={styles.goHomeLink} to={'/'}>
                Return to Home Page
              </Link>
            </div>

            <Form className={styles.form}>
              <h1 className={styles.form__title}>Log in as Admin</h1>
              <div className={styles.form__element}>
                <label htmlFor='email' className={styles.form__lable}>
                  Email
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
                  Password
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
                  <p className='help'>At least 6 characters</p>
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
                  {t(isSubmitting ? 'form_button_sending' : 'form_button_send')}
                </button>
              </div>
              <div className={styles.form__resetPassword}>
                Forgot password?{' '}
                <Link to='/reset-password'>Reset password</Link>
              </div>
            </Form>
          </>
        )}
      </Formik>

      {error && <p className='notification is-danger is-light'>{error}</p>}
    </div>
  );
};
