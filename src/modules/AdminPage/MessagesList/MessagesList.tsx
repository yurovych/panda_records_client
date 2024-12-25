import styles from './MessagesList.module.scss';
import messages from '../../../data/notifications.json';
import { Field, Form, Formik } from 'formik';
import { useAppDispatch } from '../../../app/hooks';
import { setiIsMessageOpened } from '../../../slices/booleanSlice';
import { setCurrentMessage } from '../../../slices/current';
import { UserMessageType } from '../../../types/UserMessage';

export const MessagesList = () => {
  const dispatch = useAppDispatch();

  function handleClickOnMessage(message: UserMessageType) {
    dispatch(setiIsMessageOpened(true));
    dispatch(setCurrentMessage(message));
  }

  function getBg(status: string) {
    switch (status) {
      case 'processing':
        return '#c26f0f';
      case 'completed':
        return '#0e31ad';
      default:
        return '#0ead61';
    }
  }

  function submitSelect() {
    alert(`Вибраний статус: asd`);
  }

  return (
    <>
      <div className={styles.list}>
        <h3 className={styles.list__title}>Your messages</h3>
        {messages && messages.length > 0 ? (
          <>
            {/* <div className={styles.list__header}>
            <h3 className={styles.list__title}>N</h3>
            <h3 className={styles.list__title}>Name</h3>
            <h3 className={styles.list__title}>Email</h3>
            <h3 className={styles.list__title}>Phone number</h3>
            <h3 className={styles.list__title}>Date</h3>
            <h3 className={styles.list__title}>Status</h3>
          </div> */}

            {messages.map((message: UserMessageType, index: number) => (
              <div
                style={{ backgroundColor: `${getBg(message.status)}` }}
                className={styles.list__row}
              >
                <p
                  onClick={() => handleClickOnMessage(message)}
                  className={`${styles.list__text} ${styles.list__name}`}
                >
                  {message.name}
                </p>
                <p
                  onClick={() => handleClickOnMessage(message)}
                  className={`${styles.list__text} ${styles.list__email}`}
                >
                  {message.email}
                </p>
                <p
                  onClick={() => handleClickOnMessage(message)}
                  className={`${styles.list__text} ${styles.list__message}`}
                >
                  {message.message}
                </p>

                <p
                  onClick={() => handleClickOnMessage(message)}
                  className={`${styles.list__text} ${styles.list__date}`}
                >
                  {message.created_at}
                </p>

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
                        onChange={(
                          event: React.ChangeEvent<HTMLSelectElement>
                        ) => {
                          const selectedValue = event.target.value;
                          setFieldValue('status', selectedValue);
                          handleSubmit();
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
              </div>
            ))}
          </>
        ) : (
          <h3 className={styles.list__title}>You don't have any message yet</h3>
        )}
      </div>
    </>
  );
};
