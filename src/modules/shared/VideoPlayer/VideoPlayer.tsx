import { useEffect, useRef } from 'react';
import styles from './VideoPlayer.module.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  setCurrentVideo,
  setIsSongPlaying,
  setIsVideoPlaying,
} from '../../../slices/playerSlice';
import { VideoFileType } from '../../../types/Video';

type VideoPlayerPropsType = {
  shownVideo: VideoFileType;
};

export const VideoPlayer: React.FC<VideoPlayerPropsType> = ({ shownVideo }) => {
  const dispatch = useAppDispatch();
  const videoElem = useRef<HTMLVideoElement | null>(null);

  const currentVideo = useAppSelector((state) => state.player.currentVideo);
  const isVideoPlaying = useAppSelector((state) => state.player.isVideoPlaying);
  const isSongPlaying = useAppSelector((state) => state.player.isSongPlaying);

  function handleOnPlay() {
    dispatch(setIsVideoPlaying(!isVideoPlaying));

    if (currentVideo?.id !== shownVideo.id) {
      dispatch(setCurrentVideo(shownVideo));
    }

    dispatch(setIsSongPlaying(false));

    videoElem.current?.play();
  }

  useEffect(() => {
    if (currentVideo?.id !== shownVideo.id && videoElem.current) {
      videoElem.current?.pause();
      videoElem.current.currentTime = 0;
    } else if (isSongPlaying && videoElem.current) {
      videoElem.current?.pause();
    }
  }, [currentVideo, shownVideo, isSongPlaying]);

  return (
    <video
      controls
      preload='none'
      poster={shownVideo.poster}
      onPlay={handleOnPlay}
      ref={videoElem}
      className={styles.videoItself}
    >
      <source src={shownVideo.video_file} type='video/mp4' />
    </video>
  );
};
