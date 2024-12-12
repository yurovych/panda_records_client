import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentSong, setIsPlaying } from '../../../slices/playerSlice';

export const Player: React.FC = () => {
  const audioElem = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.player.currentSong);
  const isPlaying = useAppSelector((state) => state.player.isPlaying);
  const currentProgress = useAppSelector(
    (state) => state.player.currentProgress
  );

  const onPlaying = () => {
    const audio = audioElem.current;
    if (!audio || !currentSong || audio.duration === 0) return;

    const duration = audio?.duration;
    const currentTime = audio?.currentTime;

    if (audio && currentSong) {
      dispatch(
        setCurrentSong({
          ...currentSong,
          progress: currentTime,
          song_length: duration,
        })
      );
    }
  };

  useEffect(() => {
    const audio = audioElem.current;
    if (!audio) return;

    if (currentProgress) {
      audio.currentTime = currentProgress;
    }
  }, [currentProgress]);

  useEffect(() => {
    const audio = audioElem.current;
    if (!audio) return;

    if (isPlaying && currentSong?.audio_file) {
      audio.src = currentSong.audio_file;
      audio.play().catch((error) => console.error('Error:', error));
    } else {
      audio.pause();
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [isPlaying, currentSong?.audio_file]);

  useEffect(() => {
    const audio = audioElem.current;
    if (!audio) return;

    const handleEnded = () => {
      dispatch(setIsPlaying(false));
      dispatch(setCurrentSong(null));
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [dispatch, currentSong]);

  return <audio onTimeUpdate={onPlaying} ref={audioElem} />;
};
