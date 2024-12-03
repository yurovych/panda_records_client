import { SongsList } from '../shared/SongsList';
import { useAppSelector } from '../../app/hooks';

export const Portfolio = () => {
  const songsList = useAppSelector((state) => state.songs.objects);

  return (
    <div>
      <p>It is "Portfolio component"</p>
      <div>
        <SongsList tracks={songsList} />
      </div>
    </div>
  );
};
