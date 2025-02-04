import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentSong, setPrevTrackId } from '../../../slices/playerSlice';

export const Player: React.FC = () => {
  const dispatch = useAppDispatch();
  const audioElem = useRef<HTMLAudioElement | null>(null);

  const currentSongIndex = useAppSelector(
    (state) => state.player.currentSongIndex
  );
  const allSongs = useAppSelector((state) => state.songs.objects);
  const currentSong = useAppSelector((state) => state.player.currentSong);
  const isSongPlaying = useAppSelector((state) => state.player.isSongPlaying);
  const currentSongProgress = useAppSelector(
    (state) => state.player.currentSongProgress
  );
  const prevTrackId = useAppSelector((state) => state.player.prevTrackId);

  const onPlaying = () => {
    const audio = audioElem.current;
    if (!audio || !currentSong || audio.duration === 0) return;

    const currentTime = audio?.currentTime;

    if (audio && currentSong) {
      dispatch(
        setCurrentSong({
          ...currentSong,
          progress: currentTime,
        })
      );
    }
  };

  useEffect(() => {
    const audio = audioElem.current;
    if (!audio) return;

    if (currentSongProgress) {
      audio.currentTime = currentSongProgress;
    }
  }, [currentSongProgress]);

  useEffect(() => {
    const audio = audioElem.current;
    if (!audio) return;

    if (isSongPlaying && currentSong?.audio_file) {
      if (currentSong.id !== prevTrackId) {
        audio.src = currentSong.audio_file;
        dispatch(setPrevTrackId(currentSong.id));
      }
      audio.play().catch((error) => console.error('Error:', error));
    } else if (!isSongPlaying) {
      audio.pause();
    }

    return () => {
      if (audio && !currentSong) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [isSongPlaying, currentSong, prevTrackId, dispatch]);

  const handleEnded = () => {
    if (currentSongIndex === null) {
      dispatch(setCurrentSong(allSongs[0]));
    } else if (currentSongIndex === allSongs.length - 1) {
      dispatch(setCurrentSong(allSongs[0]));
    } else {
      dispatch(setCurrentSong(allSongs[currentSongIndex + 1]));
    }
  };

  return (
    <audio onEnded={handleEnded} onTimeUpdate={onPlaying} ref={audioElem} />
  );
};
