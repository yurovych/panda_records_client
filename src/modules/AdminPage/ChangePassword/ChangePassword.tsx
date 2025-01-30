import styles from './ChangePassword.module.scss';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { adminServices } from '../../../services/adminService';
import { useAppDispatch, useValidation } from '../../../app/hooks';
import { setIsAuthenticated } from '../../../slices/booleanSlice';

export const ChangePassword = () => {
  const { t } = useTranslation();
  const { validatePassword } = useValidation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState('');

  async function onSuccessfullyChanged() {
    await adminServices.logout();
    dispatch(setIsAuthenticated(false));
    navigate('/login');
    alert(`${t('reset_password_success_text')}`);
  }

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

          adminServices
            .changePassword(new_password)
            .then(() => {
              onSuccessfullyChanged();
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
              formikHelpers.setSubmitting(false);

              setTimeout(() => {
                setError('');
              }, 5000);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <>
            <Form className={styles.form}>
              <h1 className={styles.form__title}>{t('change_password')}</h1>
              <div className={styles.form__element}>
                <label htmlFor='new-password' className={styles.form__label}>
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
                  <p className={`${styles.form__hint} help`}>
                    {t('password_hint')}
                  </p>
                )}
              </div>

              <div className={styles.form__element}>
                <label
                  htmlFor='confirm-password'
                  className={styles.form__label}
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
                  <p className={`${styles.form__hint} help`}>
                    {t('password_hint')}
                  </p>
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
          className={`${styles.changePasswordError} notification is-danger is-light`}
        >
          {error}
        </p>
      )}
    </div>
  );
};
