import { useEffect, useState } from 'react';
import { EquipmentList } from '../shared/EquipmentList';
import { EquipmentCardType } from './../../types/Equipment';
import { userService } from '../../services/userService';

export const Services = () => {
  const [equipment, setEquipment] = useState<EquipmentCardType[]>([]);

  async function fetchEquipment() {
    try {
      const result: EquipmentCardType[] = await userService.getEquipment();

      setEquipment(result);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <div>
      <div>
        <EquipmentList cards={equipment} />
      </div>
    </div>
  );
};
