import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setIsDeleteModalOpened } from '../../slices/booleanSlice';
import styles from './DeleteSongModal.module.scss';
import { useTranslation } from 'react-i18next';
import { SongTrackType } from './../../types/SongTrack';
import { adminServices } from '../../services/adminService';

type DeleteSongModalType = {
  track: SongTrackType;
};

export const DeleteSongModal: React.FC<DeleteSongModalType> = ({ track }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function closeModal() {
    dispatch(setIsDeleteModalOpened(false));
  }

  function deleteSong() {
    adminServices.deleteSong(track.id);
  }

  return (
    <>
      <div onClick={closeModal} className={styles.opened}></div>

      <div className={styles.content}>
        <h3 className={styles.content__text}>
          {t('delete_song')} {`"${track.artist} - ${track.title}"?`}
        </h3>

        <div className={styles.content__buttonsBlock}>
          <button
            onClick={deleteSong}
            className={`${styles.content__button} ${styles.content__deleteButton}`}
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
