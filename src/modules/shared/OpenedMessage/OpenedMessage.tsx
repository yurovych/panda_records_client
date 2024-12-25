import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setiIsMessageOpened } from '../../../slices/booleanSlice';
import styles from './OpenedMessage.module.scss';

export const OpenedMessage = () => {
  const dispatch = useAppDispatch();
  const currentMessage = useAppSelector(
    (state) => state.current.currentMessage
  );

  function closeMessage() {
    dispatch(setiIsMessageOpened(false));
  }

  return (
    <>
      <div onClick={closeMessage} className={styles.opened}></div>

      <div className={styles.opened__letter}>
        <p className={styles.opened__name}>{currentMessage?.name}</p>
        <p className={styles.opened__message}>{currentMessage?.message}</p>
        <p className={styles.opened__date}>{currentMessage?.created_at}</p>
        <a
          href={`mailto:${currentMessage?.email}`}
          className={styles.opened__email}
        >
          {currentMessage?.email}
        </a>
        <a
          href={`tel:${currentMessage?.phone_number}`}
          className={styles.opened__phone}
        >
          {currentMessage?.phone_number || '-'}
        </a>
        <div className={styles.opened__closeWrapper}>
          <button className={styles.opened__close} onClick={closeMessage}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};
