import styles from './ProcessVideoCard.module.scss';
import { VideoFileType } from '../../../types/Video';
import { VideoPlayer } from '../VideoPlayer';
import { DeleteIcon } from './../../../iconsMove/delete';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { adminServices } from '../../../services/adminService';
import { deleteVideo } from '../../../slices/fetchVideos';

type ProcessVideoCardProps = {
  card: VideoFileType;
};

export const ProcessVideoCard: React.FC<ProcessVideoCardProps> = ({ card }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const isAuthenticated = useAppSelector(
    (state) => state.boolean.isAuthenticated
  );

  function handledeleteVideo() {
    setIsDeleting(true);

    adminServices
      .deleteVideo(card.id)
      .then(() => dispatch(deleteVideo(card)))
      .catch((error) => {
        alert(error);
      })
      .finally(() => setIsDeleting(false));
  }

  const tooltipCopmonent = () => {
    return (
      <div className={styles.tooltip}>
        <h3 className={styles.tooltip__title}>
          {t('delete_video_tooltip_title')}
        </h3>
        <h4 className={styles.tooltip__videoTitle}> {`"${card.title}"`}</h4>
        <button
          onClick={handledeleteVideo}
          className={`${styles.tooltip__button}  ${
            isDeleting && styles.disabled
          }`}
        >
          {isDeleting ? t('deleting') : t('delete')}
        </button>
      </div>
    );
  };

  return (
    <div className={styles.pvc}>
      {isAuthenticated && (
        <Tooltip title={tooltipCopmonent()}>
          <div className={styles.deleteVideo}>
            <DeleteIcon />
          </div>
        </Tooltip>
      )}
      <VideoPlayer shownVideo={card} />
    </div>
  );
};
