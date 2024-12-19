import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentSong } from '../../../slices/playerSlice';
import allSongs from './../../../data/songsCards.json';

export const Player: React.FC = () => {
  const audioElem = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();
  const currentSongIndex = useAppSelector(
    (state) => state.player.currentSongIndex
  );
  const currentSong = useAppSelector((state) => state.player.currentSong);
  const isSongPlaying = useAppSelector((state) => state.player.isSongPlaying);
  const currentSongProgress = useAppSelector(
    (state) => state.player.currentSongProgress
  );

  const [prevTrackId, setPrevTrackId] = useState<number | null>(null);

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
        setPrevTrackId(currentSong.id);
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
  }, [isSongPlaying, currentSong, prevTrackId]);

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
