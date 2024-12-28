import styles from './Equipment.module.scss';
import { EquipmentCardType } from './../../../types/Equipment';

type EquipmentCardProps = {
  card: EquipmentCardType;
};

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ card }) => {
  return (
    <article className={styles.cardWrapper}>
      <div className={styles.card}>
        <img className={styles.card__image} src={card.photo} alt='foto' />

        <div className={styles.card__textContent}>
          <h3 className={styles.card__title}>{card.name}</h3>
          <h4 className={styles.card__model}>{card.model}</h4>
        </div>
      </div>
    </article>
  );
};
