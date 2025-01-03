import { Formik, Form, Field } from 'formik';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { authService } from '../../services/authService';
import { useState } from 'react';
import styles from './ResetPasswordPage.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../app/hooks';

export const ResetPasswordPage = () => {
  const { reset_token } = useParams();
  const [error, setError] = useState('');
  const [changed, setChanged] = useState(false);
  const { t } = useTranslation();

  const currentLanguage = useAppSelector(
    (state) => state.current.currentLanguage
  );

  if (changed) {
    return (
      <p className={styles.changed}>
        {t('reset_password_succes_text')}
        <br />
        <Link to={'/login'}>{t('log_in')}</Link>
      </p>
    );
  }

  const validatePassword = (value?: string) => {
    if (!value) {
      return `${t('validate_password_error1')}`;
    }

    if (value.length < 8) {
      return `${t('validate_password_error2')}`;
    }

    const hasNumber = /\d/;
    if (!hasNumber.test(value)) {
      return `${t('validate_password_error3')}`;
    }
  };

  return (
    <div className={styles.changePassword}>
      <Formik
        initialValues={{
          new_password: '',
          confirm_password: '',
        }}
        validateOnMount={true}
        onSubmit={({ new_password, confirm_password }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          if (new_password !== confirm_password) {
            setError(`${t('passwords_equality')}`);
            setTimeout(() => {
              setError('');
            }, 3000);
            formikHelpers.setSubmitting(false);
            return;
          } else {
            setError('');
          }

          if (reset_token) {
            authService
              .resetPassword({
                new_password,
                confirm_password,
                reset_token,
                currentLanguage,
              })
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

                const { errors, detail } = error.response.data;

                formikHelpers.setFieldError(
                  'new_password',
                  errors?.new_password
                );
                formikHelpers.setFieldError(
                  'confirm_password',
                  errors?.confirm_password
                );

                if (detail) {
                  setError(detail);
                }
              })
              .finally(() => {
                formikHelpers.setSubmitting(false);

                setTimeout(() => {
                  setError('');
                }, 5000);
              });
          }
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
                    name='new_password'
                    type='password'
                    id='new-password'
                    placeholder='*******'
                    className={`${cn('input', {
                      'is-danger': touched.new_password && errors.new_password,
                    })} ${styles.form__field}`}
                  />

                  <span
                    className={`${styles.form__icoBlock} icon is-small is-left`}
                  >
                    <i className='fa fa-lock'></i>
                  </span>

                  {touched.new_password && errors.new_password && (
                    <span
                      className={`${styles.form__icoBlock} icon is-small is-right has-text-danger`}
                    >
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.new_password && errors.new_password ? (
                  <p className='help is-danger'>{errors.new_password}</p>
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
                    name='confirm_password'
                    type='password'
                    id='confirm-password'
                    placeholder='*******'
                    className={`${cn('input', {
                      'is-danger':
                        touched.confirm_password && errors.confirm_password,
                    })} ${styles.form__field}`}
                  />

                  <span
                    className={`${styles.form__icoBlock} icon is-small is-left`}
                  >
                    <i className='fa fa-lock'></i>
                  </span>

                  {touched.confirm_password && errors.confirm_password && (
                    <span
                      className={`${styles.form__icoBlock} icon is-small is-right has-text-danger`}
                    >
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.confirm_password && errors.confirm_password ? (
                  <p className='help is-danger'>{errors.confirm_password}</p>
                ) : (
                  <p className='help'>{t('password_hint')}</p>
                )}
              </div>

              <div className={styles.form__element}>
                <button
                  type='submit'
                  disabled={
                    isSubmitting ||
                    !!errors.new_password ||
                    !!errors.confirm_password
                  }
                  className={`${styles.form__formikButton} ${
                    (isSubmitting ||
                      !!errors.new_password ||
                      !!errors.confirm_password) &&
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
