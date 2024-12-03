import styles from './ServicesCard.module.scss';
import { ServiceCardType } from '../../../types/Service';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentServiceId } from '../../../slices/current';
import { useEffect, useState } from 'react';

type ServiceCardProps = {
  card: ServiceCardType;
};

export const ServicesCard: React.FC<ServiceCardProps> = ({ card }) => {
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
    <article className={`${styles.cardWrapper} ${isShown && styles.spinCard}`}>
      {isShown ? (
        <div onClick={handleMoreDetails} className={`${styles.card} `}>
          <img className={styles.card__photo} src={card.photo} alt='foto' />

          <div className={styles.card__textContent}>
            <p className={styles.card__title}>{card.title}</p>

            <p className={styles.detailsLink}>Details</p>
          </div>
        </div>
      ) : (
        <div onClick={handleLessDetails} className={styles.details}>
          <div className={styles.details__content}>
            <h3 className={styles.details__title}>{card.title}</h3>
            <div className={styles.details__description}>
              <h5>{card.details_block1}</h5>
              <h5>{card.details_block2}</h5>
            </div>
          </div>

          <p className={styles.detailsLink}>Close</p>
        </div>
      )}
    </article>
  );
};
