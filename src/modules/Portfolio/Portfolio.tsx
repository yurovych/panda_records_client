import { useEffect, useState } from 'react';
import { userService } from '../../services/userService';
import { SongTrackType } from './../../types/SongTrack';
import { SongsList } from '../shared/SongsList';
// import songsLocal from './../../data/songsTracks.json';

export const Portfolio = () => {
  const [songsList, setSongsList] = useState<SongTrackType[]>([]);

  async function fetchSongs() {
    try {
      const result: SongTrackType[] = await userService.getSongs();

      // const result = songsLocal;
      setSongsList(result);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p>It is "Portfolio component"</p>
      <div>
        <SongsList tracks={songsList} />
      </div>
    </div>
  );
};
