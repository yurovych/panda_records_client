import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { useState } from 'react';
import { authService } from './../../services/authService';
import styles from './ResetPasswordRequest.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export const ResetPasswordRequest = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const currentLanguage = useAppSelector(
    (state) => state.current.currentLanguage
  );

  if (emailSent) {
    return (
      <section className={styles.sent}>
        <h1 className='title'>{t('reset_password_request_check_email1')}</h1>
        <p>{t('reset_password_request_check_email2')}</p>
      </section>
    );
  }

  function validateEmail(value: string) {
    if (!value) {
      return `${t('validate_email_error1')}`;
    }

    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    if (!emailPattern.test(value)) {
      return `${t('validate_email_error2')}`;
    }
  }

  return (
    <div className={styles.requestPage}>
      <Formik
        initialValues={{
          email: '',
        }}
        validateOnMount={true}
        onSubmit={({ email }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          authService
            .resetPasswordRequest({ email, currentLanguage })
            .then(() => {
              setEmailSent(true);
            })
            .catch((error) => {
              if (error.message) {
                setError(error.message);
              }

              if (!error.response?.data) {
                return;
              }

              const { errors, detail } = error.response.data;

              formikHelpers.setFieldError('email', errors?.email);

              if (detail) {
                setError(detail);
              }
            })
            .finally(() => {
              setTimeout(() => {
                setError('');
              }, 5000);
              formikHelpers.setSubmitting(false);
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
                {t('reset_password_request_title')}
              </h1>
              <div className={styles.form__element}>
                <label htmlFor='email' className={styles.form__lable}>
                  {t('email')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    style={{ marginBottom: '10px' }}
                    validate={validateEmail}
                    name='email'
                    type='email'
                    id='email'
                    placeholder='e.g. Johnjohnson@gmail.com'
                    className={`${cn('input', {
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
                <button
                  type='submit'
                  disabled={isSubmitting || !!errors.email}
                  className={`${styles.form__formikButton} ${
                    (isSubmitting || !!errors.email) && styles.disabled
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
          className={`${styles.resetPasswordRequesError} notification is-danger is-light`}
        >
          {error}
        </p>
      )}
    </div>
  );
};
