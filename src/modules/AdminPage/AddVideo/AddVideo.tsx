import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { adminServices } from '../../../services/adminService';
import styles from './AddVideo.module.scss';
import { useValidation } from '../../../app/hooks';

export const AddVideo: React.FC = () => {
  const { t } = useTranslation();
  const { validateVideoData } = useValidation();

  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <div className={styles.addVideo}>
        <Formik
          initialValues={{
            video_file: null as File | null,
            title: '',
            poster: null as File | null,
          }}
          validateOnMount={true}
          onSubmit={({ title, video_file, poster }, formikHelpers) => {
            formikHelpers.setSubmitting(true);

            const maxPosterSize = 200 * 1024;
            const maxVideoSize = 30 * 1024 * 1024;

            if (poster && poster.size > maxPosterSize) {
              setError(t('add_video_size_poster_error'));
              formikHelpers.setSubmitting(false);
              return;
            }

            if (video_file && video_file.size > maxVideoSize) {
              setError(t('add_video_size_video_error'));
              formikHelpers.setSubmitting(false);
              return;
            }

            adminServices
              .addVideo({ title })
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

                formikHelpers.setFieldError('poster', errors?.poster);
                formikHelpers.setFieldError('video_file', errors?.video_file);

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
          {({ touched, errors, isSubmitting, isValid, setFieldValue }) => (
            <Form className={styles.form}>
              <h2 className={styles.form__title}>{t('add_video_title')}</h2>

              <div className={styles.form__element}>
                <label className={styles.form__label} htmlFor='title'>
                  {t('add_video_title_field_label')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    disabled={isSubmitting}
                    validate={validateVideoData}
                    maxLength={50}
                    required
                    name='title'
                    type='text'
                    id='title'
                    placeholder={t('add_video_title_field_placeholder')}
                    className={`${cn('input', {
                      'is-danger': touched.title && errors.title,
                    })} ${styles.form__field}`}
                  />

                  {touched.title && errors.title && (
                    <span className='icon is-small is-right has-text-danger'>
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.title && errors.title && (
                  <p className='help is-danger'>{errors.title}</p>
                )}
              </div>

              <div className={styles.form__element}>
                <label className={styles.form__label} htmlFor='photo'>
                  {t('add_video_poster_field_label')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <input
                    disabled={isSubmitting}
                    required
                    name='poster'
                    type='file'
                    id='poster_file_id'
                    accept='image/*'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue('poster', file);
                    }}
                    className={`${cn({
                      'is-danger': touched.poster && errors.poster,
                    })}`}
                  />

                  {touched.poster && errors.poster && (
                    <span className='icon is-small is-right has-text-danger'>
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.poster && errors.poster && (
                  <p className='help is-danger'>{errors.poster}</p>
                )}
              </div>

              <div className={styles.form__element}>
                <label className={styles.form__label} htmlFor='audio_file'>
                  {t('add_video_video_field_label')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <input
                    disabled={isSubmitting}
                    required
                    name='video_file'
                    type='file'
                    id='video_file_id'
                    accept='video/*'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue('video_file', file);
                    }}
                    className={`${cn({
                      'is-danger': touched.video_file && errors.video_file,
                    })}`}
                  />

                  {touched.video_file && errors.video_file && (
                    <span className='icon is-small is-right has-text-danger'>
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.video_file && errors.video_file && (
                  <p className='help is-danger'>{errors.video_file}</p>
                )}
              </div>

              <div className={styles.form__element}>
                <button
                  type='submit'
                  disabled={isSubmitting || !isValid}
                  className={`${styles.form__formikButton} ${
                    (isSubmitting ||
                      !isValid ||
                      !!errors.poster ||
                      !!errors.video_file) &&
                    styles.disabled
                  }`}
                >
                  {isSubmitting
                    ? t('form_button_sending')
                    : t('form_button_send')}
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
                  {t('add_video_successfully_added')}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
