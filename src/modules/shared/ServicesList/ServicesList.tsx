// import styles from './ServicesList.module.scss';

import { ServicesCard } from '../ServicesCard';
import { ServiceCardType } from './../../../types/ServiceCard';

type ServicesListProps = {
  cards: ServiceCardType[];
};

export const ServicesList = ({ cards }: ServicesListProps) => {
  return (
    <>
      {cards.map((card: ServiceCardType) => (
        <ServicesCard card={card} key={card.id} />
      ))}
    </>
  );
};
