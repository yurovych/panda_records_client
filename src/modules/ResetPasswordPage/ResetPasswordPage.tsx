import { Formik, Form, Field } from 'formik';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { authService } from '../../services/authService';
import { useState } from 'react';
import styles from './ResetPasswordPage.module.scss';
import { useTranslation } from 'react-i18next';

const validatePassword = (value?: string) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 5) {
    return 'At least 5 characters';
  }
};

export const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const [error, setError] = useState('');
  const [changed, setChanged] = useState(false);
  const { t } = useTranslation();

  if (changed) {
    return (
      <p className={styles.changed}>
        {t('reset_password_succes_text')}
        <br />
        <Link to={'/login'}>{t('log_in')}</Link>
      </p>
    );
  }

  return (
    <div className={styles.changePassword}>
      <Formik
        initialValues={{
          password: '',
          confirmation: '',
        }}
        validateOnMount={true}
        onSubmit={({ password, confirmation }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          if (password !== confirmation) {
            setError('Passwords should be equal');
            setTimeout(() => {
              setError('');
            }, 3000);
            formikHelpers.setSubmitting(false);
            return;
          } else {
            setError('');
          }

          resetToken &&
            authService
              .changePassword({ password, confirmation, resetToken })
              .then(() => {
                setChanged(true);
              })
              .catch((error) => {
                if (error.message) {
                  setError(error.message);
                }

                if (!error.response?.data) {
                  return;
                }

                const { errors, message } = error.response.data;

                formikHelpers.setFieldError('password', errors?.password);
                formikHelpers.setFieldError(
                  'confirmation',
                  errors?.confirmation
                );

                if (message) {
                  setError(message);
                }
              })
              .finally(() => {
                formikHelpers.setSubmitting(false);

                setTimeout(() => {
                  setError('');
                }, 3000);
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
              <h1 className={styles.form__title}>
                {t('reset_password_title')}
              </h1>
              <div className={styles.form__element}>
                <label htmlFor='new-password' className={styles.form__lable}>
                  {t('password_new')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    validate={validatePassword}
                    name='password'
                    type='password'
                    id='new-password'
                    placeholder='*******'
                    className={`${cn('input', {
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
                  <p className='help'>{t('password_hint')}</p>
                )}
              </div>

              <div className={styles.form__element}>
                <label
                  htmlFor='confirm-password'
                  className={styles.form__lable}
                >
                  {t('password_confirmation')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    validate={validatePassword}
                    name='confirmation'
                    type='password'
                    id='confirm-password'
                    placeholder='*******'
                    className={`${cn('input', {
                      'is-danger': touched.confirmation && errors.confirmation,
                    })} ${styles.form__field}`}
                  />

                  <span
                    className={`${styles.form__icoBlock} icon is-small is-left`}
                  >
                    <i className='fa fa-lock'></i>
                  </span>

                  {touched.confirmation && errors.confirmation && (
                    <span
                      className={`${styles.form__icoBlock} icon is-small is-right has-text-danger`}
                    >
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.confirmation && errors.confirmation ? (
                  <p className='help is-danger'>{errors.confirmation}</p>
                ) : (
                  <p className='help'>{t('password_hint')}</p>
                )}
              </div>

              <div className={styles.form__element}>
                <button
                  type='submit'
                  disabled={
                    isSubmitting || !!errors.password || !!errors.confirmation
                  }
                  className={`${styles.form__formikButton} ${
                    (isSubmitting ||
                      !!errors.password ||
                      !!errors.confirmation) &&
                    styles.disabled
                  }`}
                >
                  {t(isSubmitting ? 'form_button_sending' : 'form_button_send')}
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>

      {error && (
        <p
          className={`${styles.resetPasswordError} notification is-danger is-light`}
        >
          {error}
        </p>
      )}
    </div>
  );
};
