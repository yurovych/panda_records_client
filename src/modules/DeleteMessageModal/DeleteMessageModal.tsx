import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setIsDeleteModalOpened } from '../../slices/booleanSlice';
import styles from './DeleteMessageModal.module.scss';
import { useTranslation } from 'react-i18next';
import { adminServices } from '../../services/adminService';
import { deleteMessage, setMessageToDelete } from '../../slices/fetchMessages';
import { UserMessageType } from '../../types/UserMessage';

type DeleteMessageModalType = {
  message: UserMessageType | null;
};

export const DeleteMessageModal: React.FC<DeleteMessageModalType> = ({
  message,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  function closeModal() {
    dispatch(setMessageToDelete(null));
    dispatch(setIsDeleteModalOpened(false));
  }

  function deletedSuccessfully() {
    if (message) {
      dispatch(deleteMessage(message));
    }
    closeModal();
    dispatch(setMessageToDelete(null));
  }

  function handleDeleteMessage() {
    if (!message) return;
    setIsDeleting(true);

    adminServices
      .deleteMessage(message.id)
      .then(deletedSuccessfully)
      .catch((error) => {
        if (error.message) {
          setError(error.message);
        }

        if (!error.response?.data) {
          return;
        }

        const { detail } = error.response.data;

        if (detail) {
          setError(detail);
        }
      })
      .finally(() => setIsDeleting(false));
  }

  return (
    <>
      <div onClick={closeModal} className={styles.opened}></div>

      <div className={styles.content}>
        {error && <h3 className={styles.error}>{error}</h3>}

        <h3 className={styles.content__text}>
          {t('admin_panel_message_delete_confirmation')}
        </h3>

        <div className={styles.content__buttonsBlock}>
          <button
            onClick={handleDeleteMessage}
            className={`${styles.content__button} ${
              styles.content__deleteButton
            } ${isDeleting && styles.disabled}`}
          >
            {t('delete')}
          </button>

          <button
            onClick={closeModal}
            className={`${styles.content__button} ${styles.content__cancelButton}`}
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </>
  );
};
