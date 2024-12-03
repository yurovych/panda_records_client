import { EquipmentList } from '../shared/EquipmentList';
import { useAppSelector } from '../../app/hooks';

export const Services = () => {
  const servicesList = useAppSelector((state) => state.sevrices.objects);
  const equipmentList = useAppSelector((state) => state.equipment.objects);

  return (
    <div>
      <div>
        <EquipmentList cards={equipmentList} />
      </div>
    </div>
  );
};
