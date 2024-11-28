import styles from './ServicesCard.module.scss';
import { ServiceCardType } from './../../../types/ServiceCard';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentServiceId } from '../../../slices/current';
import { useEffect, useState } from 'react';

type ServiceCardProps = {
  card: ServiceCardType;
};

export const ServicesCard = ({ card }: ServiceCardProps) => {
  const dispatch = useAppDispatch();
  const currentServiceId = useAppSelector(
    (state) => state.current.currentServiceId
  );

  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    setIsShown(card.id !== currentServiceId);
  }, [currentServiceId, card.id]);

  const handleMoreDetails = () => {
    dispatch(setCurrentServiceId(card.id));

    setIsShown(!isShown);
  };

  const handleLessDetails = () => {
    dispatch(setCurrentServiceId(null));

    setIsShown(!isShown);
  };

  return (
    <article className={`${styles.cardWrapper} ${isShown && styles.swingCard}`}>
      {isShown ? (
        <div className={`${styles.card} `}>
          <img className={styles.card__photo} src={card.photo} alt='foto' />

          <div className={styles.card__textContent}>
            <p className={styles.card__title}>{card.title}</p>

            <p onClick={handleMoreDetails} className={styles.detailsLink}>
              More details
            </p>
          </div>
        </div>
      ) : (
        <div className={`${styles.details}`}>
          <div className={styles.details__content}>
            <p>{card.details}</p>
            <p>{card.details}</p>
            <p>{card.details}</p>
            <p>{card.details}</p>
            <p>{card.details}</p>
          </div>

          <p className={styles.detailsLink} onClick={handleLessDetails}>
            Less details
          </p>
        </div>
      )}
    </article>
  );
};
