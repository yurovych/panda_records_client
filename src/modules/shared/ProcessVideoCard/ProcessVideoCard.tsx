import styles from './ProcessVideoCard.module.scss';
import { VideoFileType } from '../../../types/Video';
import { VideoPlayer } from '../VideoPlayer';
import { DeleteIcon } from './../../../iconsMove/delete';

type ProcessVideoCardProps = {
  card: VideoFileType;
};

const handleDeleteButton = () => {
  alert('hey');
};

export const ProcessVideoCard: React.FC<ProcessVideoCardProps> = ({ card }) => {
  return (
    <div className={styles.pvc}>
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
          handleDeleteButton();
        }}
        className={styles.deleteVideo}
      >
        <DeleteIcon />
      </div>
      <VideoPlayer shownVideo={card} />
    </div>
  );
};
