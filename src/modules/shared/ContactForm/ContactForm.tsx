import { Formik, Form, Field } from 'formik';
import { Button } from '../Button';
import cn from 'classnames';
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './ContactForm.module.scss';
import { clientService } from '../../../services/clientService';
import { Trans, useTranslation } from 'react-i18next';
import { useValidation } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { scrollPageUp } from '../../../helpers/scrollPageUp';

export const ContactForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { validateEmail, validateName, validatePhoneNumber, validateMessage } =
    useValidation();

  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const privatePolicy = `${t('form_private_policy')}`;

  function handlePolicyClick() {
    navigate('/policy');
    scrollPageUp();
  }

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone_number: '',
          message: '',
          termsAccepted: false,
        }}
        validateOnMount={true}
        onSubmit={({ name, email, phone_number, message }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          clientService
            .sendForm({ name, email, phone_number, message })
            .then(() => {
              formikHelpers.resetForm();
              formikHelpers.validateForm(false);
              setShowSuccess(true);
              setError('');
            })
            .catch((error) => {
              if (error.message) {
                setError(error.message);
              }

              if (!error.response?.data) {
                setError(`${t('unknown_error')}`);
                return;
              }

              const { errors, message } = error.response.data;

              formikHelpers.setFieldError('name', errors?.name);
              formikHelpers.setFieldError('email', errors?.email);
              formikHelpers.setFieldError('phoneNumber', errors?.phoneNumber);
              formikHelpers.setFieldError('message', errors?.message);

              if (message) {
                setError(message);
              }
            })
            .finally(() => {
              formikHelpers.setSubmitting(false);
              setTimeout(() => {
                setShowSuccess(false);
                setError('');
              }, 5000);
            });
        }}
      >
        {({ touched, errors, isSubmitting, isValid, values }) => (
          <Form className={styles.form}>
            <div className={styles.form__element}>
              <label className={styles.form__label} htmlFor='name'>
                {t('form_name')}
              </label>

              <div className='control has-icons-left has-icons-right'>
                <Field
                  disabled={isSubmitting}
                  validate={validateName}
                  maxLength={20}
                  required
                  name='name'
                  type='text'
                  id='name'
                  placeholder={t('form_name_placeholder')}
                  className={`${cn('input', {
                    'is-danger': touched.name && errors.name,
                  })} ${styles.form__field}`}
                />

                <span
                  className={`${styles.form__icoBlock} icon is-small is-left`}
                >
                  <i className='fa fa-user'></i>
                </span>

                {touched.name && errors.name && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.name && errors.name && (
                <p className='help is-danger'>{errors.name}</p>
              )}
            </div>

            <div className={styles.form__element}>
              <label className={styles.form__label} htmlFor='email'>
                {t('form_email')}
              </label>

              <div className='control has-icons-left has-icons-right'>
                <Field
                  disabled={isSubmitting}
                  validate={validateEmail}
                  maxLength={50}
                  required
                  name='email'
                  type='email'
                  id='email'
                  placeholder='johnjohnson@gmail.com'
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
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.email && errors.email && (
                <p className='help is-danger'>{errors.email}</p>
              )}
            </div>

            <div className={styles.form__element}>
              <label className={styles.form__label} htmlFor='phoneNumber'>
                {t('form_phone')}
              </label>

              <div className='control has-icons-left has-icons-right'>
                <Field
                  disabled={isSubmitting}
                  validate={validatePhoneNumber}
                  maxLength={10}
                  name='phone_number'
                  type='tel'
                  id='phone_number'
                  placeholder='0987654321'
                  className={`${cn('input', {
                    'is-danger': touched.phone_number && errors.phone_number,
                  })} ${styles.form__field}`}
                />

                <span
                  className={`${styles.form__icoBlock} icon is-small is-left`}
                >
                  <i className='fa fa-phone'></i>
                </span>

                {touched.phone_number && errors.phone_number && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.phone_number && errors.phone_number && (
                <p className='help is-danger'>{errors.phone_number}</p>
              )}
            </div>

            <div className={styles.form__element}>
              <label className={styles.form__label} htmlFor='message'>
                {t('form_message')}
              </label>

              <div className='control has-icons-left has-icons-right'>
                <Field
                  disabled={isSubmitting}
                  validate={validateMessage}
                  required
                  maxLength={200}
                  as='textarea'
                  name='message'
                  type='text'
                  id='message'
                  placeholder={t('form_message_placeholder')}
                  className={`${cn('textarea', {
                    'is-danger': touched.message && errors.message,
                  })} ${styles.form__field} `}
                />

                <span className='icon is-small is-left'>
                  <i className='fa fa-pencil'></i>
                </span>

                {touched.message && errors.message && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.message && errors.message && (
                <p className='help is-danger'>{errors.message}</p>
              )}
            </div>

            <div
              className={`${styles.form__element} ${styles.form__elementCheckbox}`}
            >
              <p className={styles.form__checkboxLabel}>
                <Trans
                  t={t}
                  values={{
                    privatePolicy,
                  }}
                  i18nKey='form_checkbox_private_policy'
                  defaults={
                    'Accept <underlined> {{privatePolicy}} </underlined> rules'
                  }
                  components={{
                    underlined: (
                      <span
                        onClick={handlePolicyClick}
                        style={{
                          textDecoration: 'underline',
                          marginInline: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        {privatePolicy}
                      </span>
                    ),
                  }}
                />
              </p>

              <div className='control has-icons-left has-icons-right'>
                <Field
                  disabled={isSubmitting}
                  name='termsAccepted'
                  type='checkbox'
                  id='termsAccepted'
                  required
                  className={styles.form__checkBox}
                />
              </div>
            </div>

            <div className={styles.form__element}>
              <button
                className={`${styles.form__button} ${
                  (isSubmitting || !isValid || !values.termsAccepted) &&
                  styles.form__button_disabled
                } ${cn({
                  'is-loading': isSubmitting,
                })} `}
                type='submit'
                disabled={isSubmitting || !isValid || !values.termsAccepted}
              >
                <Button
                  text={t(
                    isSubmitting ? 'form_button_sending' : 'form_button_send'
                  )}
                />
              </button>
            </div>

            {error && (
              <div
                className={`${styles.form__resultMessage} notification is-danger is-light`}
              >
                <p>{error}</p>
              </div>
            )}

            {showSuccess && (
              <p
                className={`${styles.form__resultMessage} notification is-success is-light`}
              >
                {t('form_success')}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
