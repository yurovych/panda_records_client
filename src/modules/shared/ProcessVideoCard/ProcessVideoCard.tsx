import styles from './ProcessVideoCard.module.scss';
import { VideoFileType } from '../../../types/Video';

type ProcessVideoCardProps = {
  card: VideoFileType;
};

export const ProcessVideoCard: React.FC<ProcessVideoCardProps> = ({ card }) => {
  return (
    <div className={styles.pvc}>
      <video className={styles.pvc__video} controls>
        <source src={card.video_file} type='video/mp4' />
      </video>
    </div>
  );
};
