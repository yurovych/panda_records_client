import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setIsDeleteModalOpened } from '../../slices/booleanSlice';
import styles from './DeleteSongModal.module.scss';
import { useTranslation } from 'react-i18next';
import { SongTrackType } from './../../types/SongTrack';
import { adminServices } from '../../services/adminService';
import { setTrackToDelete } from '../../slices/playerSlice';

type DeleteSongModalType = {
  track: SongTrackType | null;
};

export const DeleteSongModal: React.FC<DeleteSongModalType> = ({ track }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  function closeModal() {
    dispatch(setIsDeleteModalOpened(false));
  }

  function deletedSuccessfully() {
    closeModal();
    dispatch(setTrackToDelete(null));
  }

  function deleteSong() {
    if (!track) return;
    setIsDeleting(true);

    adminServices
      .deleteSong(track.id)
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
          {t('delete_song')} {`"${track?.artist} - ${track?.title}"?`}
        </h3>

        <div className={styles.content__buttonsBlock}>
          <button
            onClick={deleteSong}
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
