import { Formik, Form, Field } from 'formik';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { authService } from './../../services/authService';
import { useState } from 'react';
import styles from './ChangePasswordPage.module.scss';
import { useTranslation } from 'react-i18next';

const validatePassword = (value?: string) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

export const ChangePasswordPage = () => {
  const { resetToken } = useParams();
  const [error, setError] = useState('');
  const [changed, setChanged] = useState(false);
  const { t } = useTranslation();

  if (changed) {
    return (
      <p className={styles.changed}>
        Success. Your password has been changed.
        <br />
        <Link to={'/login'}>Log in</Link>
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
              });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className={styles.form}>
            <h1 className={styles.form__title}>Change password</h1>
            <div className={styles.form__element}>
              <label htmlFor='new-password' className={styles.form__lable}>
                New password
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

                <span className='icon is-small is-left'>
                  <i className='fa fa-lock'></i>
                </span>

                {touched.password && errors.password && (
                  <span className='icon is-small is-right has-text-danger'>
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
              <label htmlFor='confirm-password' className={styles.form__lable}>
                Confirm password
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

                <span className='icon is-small is-left'>
                  <i className='fa fa-lock'></i>
                </span>

                {touched.confirmation && errors.confirmation && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.confirmation && errors.confirmation ? (
                <p className='help is-danger'>{errors.confirmation}</p>
              ) : (
                <p className='help'>At least 6 characters</p>
              )}
            </div>

            <div className={styles.form__element}>
              <button
                type='submit'
                disabled={
                  isSubmitting || !!errors.password || !!errors.confirmation
                }
                className={styles.form__formikButton}
              >
                {t(isSubmitting ? 'form_button_sending' : 'form_button_send')}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {error && <p className='notification is-danger is-light'>{error}</p>}
    </div>
  );
};
