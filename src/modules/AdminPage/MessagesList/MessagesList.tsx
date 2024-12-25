import styles from './MessagesList.module.scss';
import messages from '../../../data/notifications.json';
import { Field, Form, Formik } from 'formik';
import { useAppDispatch } from '../../../app/hooks';
import { setiIsMessageOpened } from '../../../slices/booleanSlice';
import { setCurrentMessage } from '../../../slices/current';
import { UserMessageType } from '../../../types/UserMessage';
import { Loader } from '../../Loader';

export const MessagesList = () => {
  const dispatch = useAppDispatch();

  function handleClickOnMessage(message: UserMessageType) {
    dispatch(setiIsMessageOpened(true));
    dispatch(setCurrentMessage(message));
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
      <Formik
        initialValues={{
          status: message.status,
        }}
        onSubmit={(values) => {
          alert(`Вибраний статус: ${values.status}`);
        }}
      >
        {({ isSubmitting, handleSubmit, setFieldValue }) => (
          <Form className={styles.form}>
            <Field
              // disabled={isSubmitting}
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
                Pending
              </option>
              <option
                className={`${styles.form__option} ${styles.form__processing}`}
                value='processing'
              >
                Processing
              </option>
              <option
                className={`${styles.form__option} ${styles.form__completed}`}
                value='completed'
              >
                Completed
              </option>
            </Field>
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <>
      <div className={styles.list}>
        {messages.length > 0 ? (
          <div className={styles.stars}>
            <img
              className={`${styles.stars__star} ${styles.stars__star_star1}`}
              src='./images/songs-star-big.png'
              alt='star_ico'
            />
            <img
              className={`${styles.stars__star} ${styles.stars__star_star2}`}
              src='./images/songs-star-avarage.png'
              alt='star_ico'
            />
            <img
              className={`${styles.stars__star} ${styles.stars__star_star3}`}
              src='./images/songs-star-small.png'
              alt='star_ico'
            />
          </div>
        ) : (
          ''
        )}

        {messages ? (
          <>
            {messages.length > 0 ? (
              <>
                <div className={styles.isDesktop}>
                  <div className={styles.list__header}>
                    <h3 className={styles.list__headerTitle}>N</h3>
                    <h3 className={styles.list__headerTitle}>Name</h3>
                    <h3 className={styles.list__headerTitle}>Email</h3>
                    <h3 className={styles.list__headerTitle}>Phone number</h3>
                    <h3 className={styles.list__headerTitle}>Date</h3>
                    <h3 className={styles.list__headerTitle}>Status</h3>
                  </div>

                  {messages.map((message: UserMessageType, index: number) => (
                    <div
                      onClick={() => handleClickOnMessage(message)}
                      style={{ backgroundColor: `${getBg(message.status)}` }}
                      className={styles.list__strip}
                    >
                      <p className={styles.list__text}>{index + 1}</p>
                      <p className={styles.list__text}>{message.name}</p>
                      <p className={styles.list__text}>{message.email}</p>
                      <p className={styles.list__text}>
                        {message.phone_number || '-'}
                      </p>
                      <p className={styles.list__text}>{message.created_at}</p>
                      {getStatus(message)}
                    </div>
                  ))}
                </div>

                <div className={styles.isMobile}>
                  {messages.map((message: UserMessageType) => (
                    <div
                      onClick={() => handleClickOnMessage(message)}
                      style={{ backgroundColor: `${getBg(message.status)}` }}
                      className={styles.list__row}
                    >
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
                        {message.created_at}
                      </p>

                      {getStatus(message)}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h3 className={styles.list__empty}>
                You don't have any message yet
              </h3>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};
