import styles from './MessagesList.module.scss';
import { Field, Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setIsMessageOpened } from '../../../slices/booleanSlice';
import { setCurrentMessage } from '../../../slices/current';
import { UserMessageType } from '../../../types/UserMessage';
import { Loader } from '../../Loader';
import { getTime } from './../../../helpers/getTime';
import { updateMessageStatusAsync } from '../../../slices/fetchMessages';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MyTablePagination } from './MessagesStyles';

export const MessagesList = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const currentMessage = useAppSelector(
    (state) => state.current.currentMessage
  );
  const messages = useAppSelector((state) => state.messages.objects);
  const messagesLoading = useAppSelector((state) => state.messages.loading);
  const messagesError = useAppSelector((state) => state.messages.error);
  const statusError = useAppSelector((state) => state.messages.statusError);

  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleClickOnMessage(message: UserMessageType) {
    dispatch(setIsMessageOpened(true));
    dispatch(setCurrentMessage(message));
    setError('');
  }

  function getBg(status: string) {
    switch (status) {
      case 'processing':
        return '#c26f0f99';
      case 'completed':
        return '#0e31ad60';
      default:
        return '#0ead61cc';
    }
  }

  function getStatus(message: UserMessageType) {
    return (
      <>
        <Formik
          initialValues={{
            status: message.status,
          }}
          onSubmit={(values, formikHelpers) => {
            formikHelpers.setSubmitting(true);

            dispatch(
              updateMessageStatusAsync({
                status: values.status,
                id: message.id,
              })
            )
              .then(() => {
                setError(statusError);
                setTimeout(() => {
                  setError('');
                }, 3000);
              })
              .finally(() => {
                formikHelpers.setSubmitting(false);
                dispatch(setCurrentMessage(message));
              });
          }}
        >
          {({ isSubmitting, handleSubmit, setFieldValue }) => (
            <Form className={styles.form}>
              <Field
                disabled={isSubmitting}
                className={`${styles.form__select} ${styles.list__text}`}
                as='select'
                name='status'
                id='status'
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedValue = event.target.value;
                  setFieldValue('status', selectedValue);
                  handleSubmit();
                }}
                onClick={(event: React.MouseEvent<HTMLSelectElement>) => {
                  event.stopPropagation();
                }}
              >
                <option
                  className={`${styles.form__option} ${styles.form__pending}`}
                  value='pending'
                >
                  {t('admin_page_status_pending')}
                </option>
                <option
                  className={`${styles.form__option} ${styles.form__processing}`}
                  value='processing'
                >
                  {t('admin_page_status_processing')}
                </option>
                <option
                  className={`${styles.form__option} ${styles.form__completed}`}
                  value='completed'
                >
                  {t('admin_page_status_completed')}
                </option>
              </Field>
            </Form>
          )}
        </Formik>
      </>
    );
  }

  return (
    <>
      <div className={styles.list}>
        {messages.length > 0 ? (
          <div className={styles.stars}>
            <img
              className={`${styles.stars__star} ${styles.stars__star_star1}`}
              src='/images/songs-star-big.png'
              alt='star_ico'
            />
            <img
              className={`${styles.stars__star} ${styles.stars__star_star2}`}
              src='/images/songs-star-avarage.png'
              alt='star_ico'
            />
            <img
              className={`${styles.stars__star} ${styles.stars__star_star3}`}
              src='/images/songs-star-small.png'
              alt='star_ico'
            />
          </div>
        ) : (
          ''
        )}

        <>
          <div className={styles.isDesktop}>
            <div className={styles.list__header}>
              <h3 className={styles.list__headerTitle}>N</h3>
              <h3 className={styles.list__headerTitle}>
                {t('admin_page_header_name')}
              </h3>
              <h3 className={styles.list__headerTitle}>
                {t('admin_page_header_email')}
              </h3>
              <h3 className={styles.list__headerTitle}>
                {t('admin_page_header_phone')}
              </h3>
              <h3 className={styles.list__headerTitle}>
                {t('admin_page_header_date')}
              </h3>
              <h3 className={styles.list__headerTitle}>
                {t('admin_page_header_status')}
              </h3>
            </div>

            {messagesLoading ? (
              <Loader />
            ) : (
              <>
                {messagesError ? (
                  <p>{messagesError}</p>
                ) : (
                  <>
                    {messages.length > 0 ? (
                      <>
                        {messages
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((message: UserMessageType, index: number) => (
                            <div
                              onClick={() => handleClickOnMessage(message)}
                              className={styles.list__strip}
                              style={{
                                borderLeft: `10px solid ${getBg(
                                  message.status
                                )}`,
                              }}
                            >
                              {error && currentMessage?.id === message.id && (
                                <p
                                  className={`${styles.statusError} notification is-danger is-light`}
                                >
                                  {error}
                                </p>
                              )}
                              <p
                                className={`${styles.list__text} ${styles.list__messageNumber}`}
                              >
                                {index + 1}
                              </p>
                              <p className={styles.list__text}>
                                {message.name}
                              </p>
                              <p className={styles.list__text}>
                                {message.email}
                              </p>
                              <p className={styles.list__text}>
                                {message.phone_number || '-'}
                              </p>
                              <p className={styles.list__text}>
                                {getTime(message)}
                              </p>
                              {getStatus(message)}
                            </div>
                          ))}

                        <MyTablePagination
                          sx={{ color: '#5e5e5f' }}
                          rowsPerPageOptions={[
                            10,
                            25,
                            50,
                            {
                              label: `${t('admin_panel_pagination_all')}`,
                              value: -1,
                            },
                          ]}
                          count={messages.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          labelRowsPerPage={t(
                            'admin_panel_pagination_rows_per_page_desktop'
                          )}
                          labelDisplayedRows={({ from, to, count }) =>
                            `${from}–${to} ${t('admin_panel_pagination_of')} ${
                              count !== -1 ? count : '???'
                            }`
                          }
                        />
                      </>
                    ) : (
                      <p className={styles.list__empty}>
                        {t('admin_page_no_messages')}
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <div className={styles.isMobile}>
            {messagesLoading ? (
              <Loader />
            ) : (
              <>
                {messagesError ? (
                  <p>{messagesError}</p>
                ) : (
                  <>
                    {messages.length > 0 ? (
                      <>
                        {messages
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((message: UserMessageType, index: number) => (
                            <div
                              onClick={() => handleClickOnMessage(message)}
                              className={styles.list__row}
                            >
                              <p
                                style={{
                                  backgroundColor: `${getBg(message.status)}`,
                                }}
                                className={`${styles.list__text} ${styles.list__messageNumber}`}
                              >
                                {index + 1}
                              </p>
                              <p
                                className={`${styles.list__text} ${styles.list__name}`}
                              >
                                {message.name}
                              </p>
                              <p
                                className={`${styles.list__text} ${styles.list__email}`}
                              >
                                {message.email}
                              </p>
                              <p
                                className={`${styles.list__text} ${styles.list__message}`}
                              >
                                {message.message}
                              </p>

                              <p
                                className={`${styles.list__text} ${styles.list__date}`}
                              >
                                {getTime(message)}
                              </p>

                              {getStatus(message)}
                            </div>
                          ))}
                        <MyTablePagination
                          sx={{ color: '#5e5e5f' }}
                          rowsPerPageOptions={[
                            10,
                            25,
                            50,
                            {
                              label: `${t('admin_panel_pagination_all')}`,
                              value: -1,
                            },
                          ]}
                          count={messages.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          labelRowsPerPage={t(
                            'admin_panel_pagination_rows_per_page_mobile'
                          )}
                          labelDisplayedRows={({ from, to, count }) =>
                            `${from}–${to} ${t('admin_panel_pagination_of')} ${
                              count !== -1 ? count : '???'
                            }`
                          }
                        />
                      </>
                    ) : (
                      <p className={styles.list__empty}>
                        {t('admin_page_no_messages')}
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </>
      </div>
    </>
  );
};
