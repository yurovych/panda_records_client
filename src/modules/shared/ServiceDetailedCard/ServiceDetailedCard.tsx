import { ServiceCardType } from '../../../types/Service';
import styles from './ServiceDetailedCard.module.scss';

type ServiceCardProps = {
  card: ServiceCardType;
};

export const ServiceDetailedCard: React.FC<ServiceCardProps> = ({ card }) => {
  return (
    <div className={styles.serDetCard}>
      <div className={styles.serDetCard__image}>
        <img
          className={styles.serDetCard__imageItself}
          src={card.photo}
          alt='card_image'
        />
      </div>

      <h2 className={styles.serDetCard__title}>{card.title} </h2>

      <p
        className={`${styles.serDetCard__text} ${styles.serDetCard__text_text1}`}
      >
        {card.details_block1}
      </p>

      <p
        className={`${styles.serDetCard__text} ${styles.serDetCard__text_text2}`}
      >
        {card.details_block2}
      </p>

      <div className={styles.serDetCard__priceBlock}>
        <h3 className={styles.serDetCard__priceBlockText}>
          {`${card.price}₴ /`}
        </h3>
        <img
          className={styles.serDetCard__clockIco}
          src='./icons/clock-ico.svg'
          alt='clock-ico'
        />
        <h3 className={styles.serDetCard__priceBlockText}>1 Hour</h3>
      </div>
    </div>
  );
};
