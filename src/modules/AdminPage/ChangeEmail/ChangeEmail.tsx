import styles from './ChangeEmail.module.scss';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { useState} from 'react';
import { useTranslation } from 'react-i18next';
import { adminServices } from '../../../services/adminService';
import { useValidation} from '../../../app/hooks';


export const ChangeEmail = () => {
  const { t } = useTranslation();
  const { validateEmail } = useValidation();
  const [error, setError] = useState('');
  const [changed, setChanged] = useState(false);


  if (changed) {
    return (
      <p className={styles.changed}>
        {t('email_change_request_sent')}
      </p>
    );
  }

  return (
    <div className={styles.changeEmail}>
      <Formik
        initialValues={{
          new_email: '',
          confirm_email: '',
        }}
        validateOnMount={true}
        onSubmit={({ new_email, confirm_email }, formikHelpers) => {
          if (new_email !== confirm_email) {
            setError(`${t('emails_are_different')}`);
            setTimeout(() => {
              setError('');
            }, 3000);
            formikHelpers.setSubmitting(false);
            return;
          } else {
            setError('');
          }

          adminServices
            .changeEmail(new_email)
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
              <h1 className={styles.form__title}>{t('change_email')}</h1>

              <div className={styles.form__element}>
                <label htmlFor='new_email' className={styles.form__label}>
                  {t('email_new')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    validate={validateEmail}
                    name='new_email'
                    type='email'
                    id='new_email'
                    placeholder='e.g. Johnjohnson@gmail.com'
                    className={`${cn({
                      'is-danger': touched.new_email && errors.new_email,
                    })} ${styles.form__field}`}
                  />

                  <span
                    className={`${styles.form__icoBlock} icon is-small is-left`}
                  >
                    <i className='fa fa-envelope'></i>
                  </span>

                  {touched.new_email && errors.new_email && (
                    <span
                      className={`${styles.form__icoBlock} icon is-small is-right has-text-danger`}
                    >
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.new_email && errors.new_email && (
                  <p className='help is-danger'>{errors.new_email}</p>
                )}
              </div>

              <div className={styles.form__element}>
                <label htmlFor='confirm_email' className={styles.form__label}>
                  {t('email_confirmation')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    validate={validateEmail}
                    name='confirm_email'
                    type='email'
                    id='confirm_email'
                    placeholder='e.g. Johnjohnson@gmail.com'
                    className={`${cn({
                      'is-danger':
                        touched.confirm_email && errors.confirm_email,
                    })} ${styles.form__field}`}
                  />

                  <span
                    className={`${styles.form__icoBlock} icon is-small is-left`}
                  >
                    <i className='fa fa-envelope'></i>
                  </span>

                  {touched.confirm_email && errors.confirm_email && (
                    <span
                      className={`${styles.form__icoBlock} icon is-small is-right has-text-danger`}
                    >
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.confirm_email && errors.confirm_email && (
                  <p className='help is-danger'>{errors.confirm_email}</p>
                )}
              </div>

              <div className={styles.form__element}>
                <button
                  type='submit'
                  disabled={
                    isSubmitting || !!errors.new_email || !!errors.confirm_email
                  }
                  className={`${styles.form__formikButton} ${
                    (isSubmitting ||
                      !!errors.new_email ||
                      !!errors.confirm_email) &&
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
        <p className={`${styles.loginError} notification is-danger is-light`}>
          {error}
        </p>
      )}
    </div>
  );
};
