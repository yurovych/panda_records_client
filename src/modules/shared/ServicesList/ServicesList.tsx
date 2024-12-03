import { ServicesCard } from '../ServicesCard';
import { ServiceCardType } from '../../../types/Service';

type ServicesListProps = {
  cards: ServiceCardType[];
};

export const ServicesList = ({ cards }: ServicesListProps) => {
  return (
    <>
      {cards.map((card) => (
        <ServicesCard card={card} key={card.id} />
      ))}
    </>
  );
};
