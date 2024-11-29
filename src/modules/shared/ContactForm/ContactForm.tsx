import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button } from '../Button';
import styles from './ContactForm.module.scss';

export const ContactForm = () => {
  const [error] = useState('');

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phoneNumber: '',
          message: '',
        }}
        validateOnMount={true}
        onSubmit={({ name, email, phoneNumber, message }) => {}}
      >
        {({ touched, errors }) => (
          <Form className={styles.form}>
            <div className={styles.form__element}>
              <label className={styles.form__label} htmlFor='name'>
                Name
              </label>

              <div
                className={`${styles.form__field} control has-icons-left has-icons-right`}
              >
                <Field
                  required
                  name='name'
                  type='text'
                  id='name'
                  placeholder='Name'
                  className={`${cn('input', {
                    'is-danger': touched.name && errors.name,
                  })} ${styles.form__field}`}
                />

                <span className='icon is-small is-left'>
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

              <div
                className={`${styles.form__field} control has-icons-left has-icons-right`}
              >
                <Field
                  required
                  name='email'
                  type='email'
                  id='email'
                  placeholder='e.g. Johnjohnson@gmail.com'
                  className={cn('input', {
                    'is-danger': touched.email && errors.email,
                  })}
                />
                <span className='icon is-small is-left'>
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
              <label className={styles.form__label} htmlFor='phone_number'>
                Phone number
              </label>

              <div
                className={`${styles.form__field} control has-icons-left has-icons-right`}
              >
                <Field
                  name='phone_number'
                  type='tel'
                  id='phone_number'
                  placeholder='0987654321'
                  className={cn('input', {
                    'is-danger': touched.phoneNumber && errors.phoneNumber,
                  })}
                />

                <span className='icon is-small is-left'>
                  <i className='fa fa-phone'></i>
                </span>

                {touched.phoneNumber && errors.phoneNumber && (
                  <span className='icon is-small is-right has-text-danger'>
                    <i className='fas fa-exclamation-triangle'></i>
                  </span>
                )}
              </div>

              {touched.phoneNumber && errors.phoneNumber && (
                <p className='help is-danger'>{errors.phoneNumber}</p>
              )}
            </div>

            <div className={styles.form__element}>
              <label className={styles.form__label} htmlFor='message'>
                Message
              </label>

              <div
                className={`${styles.form__field} control has-icons-left has-icons-right`}
              >
                <Field
                  as='textarea'
                  name='message'
                  type='text'
                  id='message'
                  placeholder='Your message here'
                  className={cn('input', {
                    'is-danger': touched.message && errors.message,
                  })}
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
              <button className={styles.form__button} type='submit'>
                <Button text='Submit' />
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {error && <p className='notification is-danger is-light'>{error}</p>}
    </>
  );
};
