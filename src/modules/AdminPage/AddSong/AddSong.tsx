import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { adminServices } from '../../../services/adminService';
import styles from './AddSong.module.scss';
import { useValidation } from '../../../app/hooks';

export const AddSong: React.FC = () => {
  const { t } = useTranslation();
  const { validateSongData } = useValidation();

  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <div className={styles.addSong}>
        <Formik
          initialValues={{
            title: '',
            artist: '',
            photo: null as File | null,
            audio_file: null as File | null,
            top: false,
          }}
          validateOnMount={true}
          onSubmit={(
            { title, artist, photo, audio_file, top },
            formikHelpers
          ) => {
            formikHelpers.setSubmitting(true);

            const maxPhotoSize = 200 * 1024;
            const maxAudioSize = 9 * 1024 * 1024;

            if (photo && photo.size > maxPhotoSize) {
              setError(t('add_song_size_image_error'));
              formikHelpers.setSubmitting(false);
              return;
            }

            if (audio_file && audio_file.size > maxAudioSize) {
              setError(t('add_song_size_song_error'));
              formikHelpers.setSubmitting(false);
              return;
            }

            adminServices
              .addSong({ title, artist, top })
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

                formikHelpers.setFieldError('title', errors?.title);
                formikHelpers.setFieldError('artist', errors?.artist);
                formikHelpers.setFieldError('photo', errors?.photo);
                formikHelpers.setFieldError('audio_file', errors?.audio_file);
                formikHelpers.setFieldError('top', errors?.top);

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
          {({
            touched,
            errors,
            isSubmitting,
            isValid,
            resetForm,
            validateForm,
            setFieldValue,
          }) => (
            <Form className={styles.form}>
              <h2 className={styles.form__title}>{t('add_song_title')}</h2>
              <div className={styles.form__element}>
                <label className={styles.form__label} htmlFor='title'>
                  {t('add_song_title_field_label')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    disabled={isSubmitting}
                    validate={validateSongData}
                    maxLength={50}
                    required
                    name='title'
                    type='text'
                    id='title'
                    placeholder={t('add_song_title_field_placeholder')}
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
                <label className={styles.form__label} htmlFor='artist'>
                  {t('add_song_artist_field_label')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    disabled={isSubmitting}
                    validate={validateSongData}
                    maxLength={50}
                    required
                    name='artist'
                    type='text'
                    id='artist'
                    placeholder={t('add_song_artist_field_placeholder')}
                    className={`${cn('input', {
                      'is-danger': touched.artist && errors.artist,
                    })} ${styles.form__field}`}
                  />

                  {touched.artist && errors.artist && (
                    <span className='icon is-small is-right has-text-danger'>
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.artist && errors.artist && (
                  <p className='help is-danger'>{errors.artist}</p>
                )}
              </div>

              <div className={styles.form__element}>
                <label className={styles.form__label} htmlFor='photo'>
                  {t('add_song_image_field_label')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <input
                    disabled={isSubmitting}
                    required
                    name='photo'
                    type='file'
                    id='photo_file_id'
                    accept='image/*'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue('photo', file);
                    }}
                    className={`${cn({
                      'is-danger': touched.photo && errors.photo,
                    })}`}
                  />

                  {touched.photo && errors.photo && (
                    <span className='icon is-small is-right has-text-danger'>
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.photo && errors.photo && (
                  <p className='help is-danger'>{errors.photo}</p>
                )}
              </div>

              <div className={styles.form__element}>
                <label className={styles.form__label} htmlFor='audio_file'>
                  {t('add_song_audio_field_label')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <input
                    disabled={isSubmitting}
                    required
                    name='audio_file'
                    type='file'
                    id='audio_file_id'
                    accept='audio/*'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue('audio_file', file);
                    }}
                    className={`${cn({
                      'is-danger': touched.audio_file && errors.audio_file,
                    })}`}
                  />

                  {touched.audio_file && errors.audio_file && (
                    <span className='icon is-small is-right has-text-danger'>
                      <i className='fas fa-exclamation-triangle'></i>
                    </span>
                  )}
                </div>

                {touched.audio_file && errors.audio_file && (
                  <p className='help is-danger'>{errors.audio_file}</p>
                )}
              </div>

              <div
                className={`${styles.form__element} ${styles.form__elementCheckbox}`}
              >
                <label className={styles.form__label} htmlFor='top'>
                  {t('add_song_checkbox_label')}
                </label>

                <div className='control has-icons-left has-icons-right'>
                  <Field
                    disabled={isSubmitting}
                    name='top'
                    type='checkbox'
                    id='top'
                    className={styles.form__checkBox}
                  />
                </div>
              </div>

              <div className={styles.form__element}>
                <button
                  type='submit'
                  disabled={isSubmitting || !isValid}
                  className={`${styles.form__formikButton} ${
                    (isSubmitting ||
                      !isValid ||
                      !!errors.title ||
                      !!errors.artist ||
                      !!errors.photo ||
                      !!errors.audio_file ||
                      errors.top) &&
                    styles.disabled
                  }`}
                >
                  {isSubmitting
                    ? t('form_button_sending')
                    : t('form_button_send')}
                </button>
              </div>

              <div className={styles.form__element}>
                <button
                  type='button'
                  onClick={() => {
                    resetForm();
                    validateForm();
                  }}
                  disabled={isSubmitting}
                  className={`${styles.form__formikButton} ${
                    styles.buttonWhite
                  } ${isSubmitting && styles.disabled}`}
                >
                  {t('clean')}
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
                  {t('add_song_successfully_added')}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
