import { EquipmentList } from '../shared/EquipmentList';
import { useAppSelector } from '../../app/hooks';
import { ServicesList } from '../shared/ServicesList';
import { SongsList } from '../shared/SongsList';

export const Services = () => {
  const servicesList = useAppSelector((state) => state.sevrices.objects);
  const equipmentList = useAppSelector((state) => state.equipment.objects);
  const songsList = useAppSelector((state) => state.songs.objects);

  return (
    <div>
      <div>
        <SongsList tracks={songsList} />
        <ServicesList cards={servicesList} />
        <EquipmentList cards={equipmentList} />
      </div>
    </div>
  );
};
