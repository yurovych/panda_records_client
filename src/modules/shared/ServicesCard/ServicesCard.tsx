import styles from './ServicesCard.module.scss';
import { ServiceCardType } from './../../../types/ServiceCard';
import { Link } from 'react-router-dom';

type ServiceCardProps = {
  card: ServiceCardType;
};

export const ServicesCard = ({ card }: ServiceCardProps) => {
  return (
    <article className={styles.card}>
      {/* <img className={styles.card__photo} src={card.photo} alt='foto' /> */}
      <img
        className={styles.card__photo}
        src='./images/section-songs/tobi.png'
        alt='foto'
      />

      <div className={styles.card__textContent}>
        <p className={styles.card__title}>{card.title}</p>

        <Link className={styles.card__detailsLink} to=''>
          More details
        </Link>
      </div>
    </article>
  );
};
