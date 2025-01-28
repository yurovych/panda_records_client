import styles from './ServicesCard.module.scss';
import { ServiceCardType } from '../../../types/Service';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentServiceId } from '../../../slices/current';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ServiceCardProps = {
  index?: number;
  card: ServiceCardType;
};

export const ServicesCard: React.FC<ServiceCardProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
          <div className={styles.card__photo}>
            <img
              className={styles.card__photoItself}
              src={card.photo}
              alt='foto'
            />
          </div>

          <div className={styles.card__textContent}>
            <p className={styles.card__title}>{card.title}</p>

            <div className={styles.card__details}>
              <div className={styles.price}>
                <h3 className={styles.price__priceText}>{`${card.price}₴`}</h3>
                {card.hourly && (
                  <>
                    <h3 className={styles.price__priceText}>
                      &nbsp;/
                      {
                        <img
                          className={styles.price__clockIco}
                          src='/icons/clock-ico.svg'
                          alt='clock-ico'
                        />
                      }
                      1 {t('hour')}
                    </h3>
                  </>
                )}
              </div>

              <p className={styles.detailsLink}>{t('home_services_details')}</p>
            </div>
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

          <div className={styles.details__bottom}>
            <div className={styles.price}>
              <h3 className={styles.price__priceText}>{`${card.price}₴`}</h3>
              {card.hourly && (
                <>
                  <h3 className={styles.price__priceText}>
                    &nbsp;/
                    {
                      <img
                        className={styles.price__clockIco}
                        src='/icons/clock-ico.svg'
                        alt='clock-ico'
                      />
                    }
                    1 {t('hour')}
                  </h3>
                </>
              )}
            </div>
            <p className={styles.detailsLink}>{t('home_services_close')}</p>
          </div>
        </div>
      )}
    </article>
  );
};
