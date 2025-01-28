import { ServicesCard } from '../ServicesCard';
import { ServiceCardType } from '../../../types/Service';

type ServicesListProps = {
  cards: ServiceCardType[];
};

export const ServicesList = ({ cards }: ServicesListProps) => {
  return (
    <>
      {cards.map((card, index) => (
        <ServicesCard index={index + 1} card={card} key={card.id} />
      ))}
    </>
  );
};
