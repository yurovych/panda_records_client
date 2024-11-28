import { EquipmentCard } from '../EquipmentCard';
import { EquipmentCardType } from './../../../types/Equipment';

type EquipmentListProps = {
  cards: EquipmentCardType[];
};

export const EquipmentList = ({ cards }: EquipmentListProps) => {
  return (
    <>
      {cards.map((card) => (
        <EquipmentCard card={card} key={card.id} />
      ))}
    </>
  );
};
