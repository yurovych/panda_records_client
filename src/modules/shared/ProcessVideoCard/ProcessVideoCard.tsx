import styles from './ProcessVideoCard.module.scss';
import { VideoFileType } from '../../../types/Video';
import { VideoPlayer } from '../VideoPlayer';

type ProcessVideoCardProps = {
  card: VideoFileType;
};

export const ProcessVideoCard: React.FC<ProcessVideoCardProps> = ({ card }) => {
  return (
    <div className={styles.pvc}>
      <VideoPlayer shownVideo={card} />
    </div>
  );
};
