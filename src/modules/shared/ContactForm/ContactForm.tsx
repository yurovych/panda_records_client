import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button } from '../Button';
import styles from './ContactForm.module.scss';
import { clientService } from '../../../services/clientService';
// import { FormDataType } from './../../../types/FormDataType';

export const ContactForm = () => {
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  function validateName(value: string) {
    if (!value) {
      return 'Name is required';
    }

    if (value.length < 2) {
      return 'At least 2 characters';
    }
  }

  function validateEmail(value: string) {
    if (!value) {
      return 'Email is required';
    }

    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    if (!emailPattern.test(value)) {
      return 'Email is not valid';
    }
  }

  function validatePhoneNumber(value: string) {
    if (!value) {
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(value)) {
      return 'Use correct format';
    }
  }

  function validateMessage(value: string) {
    if (!value) {
      return 'Message is required';
    }

    if (value.length < 10) {
      return 'At least 10 characters';
    }
  }

  // const requestObj = {
  //   name: '',
  //   email: '',
  //   phoneNumber: '',
  //   message: '',
  // };

  // const sendFormDemo = ({
  //   name,
  //   email,
  //   phoneNumber,
  //   message,
  // }: FormDataType) => {
  //   const formPromise = new Promise((resolve, reject) => {
  //     requestObj.name = name;
  //     requestObj.email = email;
  //     requestObj.phoneNumber = phoneNumber;
  //     requestObj.message = message;

  //     const success = false;

  //     setTimeout(() => {
  //       if (success) {
  //         resolve(requestObj);
  //       } else {
  //         reject('Помилка при отриманні даних.');
  //       }
  //     }, 2000);
  //   });

  //   return formPromise;
  // };

  const manageShowSuccess = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const manageShowError = (error: string) => {
    setError(error);

    setTimeout(() => {
      setError('');
    }, 10000);
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone_number: '',
          message: '',
        }}
        validateOnMount={true}
        onSubmit={({ name, email, phone_number, message }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          // sendFormDemo({ name, email, phone_number, message })
          //   .then(() => {
          //     formikHelpers.resetForm();
          //     manageShowSuccess();
          //     setError('');
          //   })

          clientService
            .sendForm({ name, email, phone_number, message })
            .then(() => {
              formikHelpers.resetForm();
              manageShowSuccess();
              setError('');
            })
            .catch((error) => {
              if (error.message) {
                manageShowError(error.message);
              }

              if (!error.response?.data) {
                manageShowError('Unnown error');
                return;
              }

              const { errors, message } = error.response.data;

              formikHelpers.setFieldError('name', errors?.name);
              formikHelpers.setFieldError('email', errors?.email);
              formikHelpers.setFieldError('phoneNumber', errors?.phoneNumber);
              formikHelpers.setFieldError('message', errors?.message);

              if (message) {
                manageShowError(message);
              }
            })
            .finally(() => {
              formikHelpers.setSubmitting(false);
            });
        }}
      >
        {({ touched, errors, isSubmitting, isValid }) => (
          <Form className={styles.form}>
            <div className={styles.form__element}>
              <label className={styles.form__label} htmlFor='name'>
                Name
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
                  placeholder='Name'
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
                Email
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
                Phone number
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
                Message
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
                  placeholder='Maximum 200 characters'
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

            <div className={styles.form__element}>
              <button
                className={`${styles.form__button} ${
                  (isSubmitting || !isValid) && styles.form__button_disabled
                } ${cn({
                  'is-loading': isSubmitting,
                })} `}
                type='submit'
                disabled={isSubmitting || !isValid}
              >
                <Button text={`${isSubmitting ? 'Sending' : 'Send'}`} />
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
                Successfully sent
              </p>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
