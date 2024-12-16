import { ServicesCard } from '../ServicesCard';
import { ServiceCardType } from '../../../types/Service';

type ServicesListProps = {
  cards: ServiceCardType[];
  visual: 'brief' | 'wide';
};

export const ServicesList = ({ cards, visual }: ServicesListProps) => {
  return (
    <>
      {cards.map((card, index) => (
        <ServicesCard
          index={index + 1}
          card={card}
          visual={visual}
          key={card.id}
        />
      ))}
    </>
  );
};
