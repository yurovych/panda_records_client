import styles from './ServicesCard.module.scss';
import { ServiceCardType } from '../../../types/Service';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentServiceId } from '../../../slices/current';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ServiceCardProps = {
  index?: number;
  card: ServiceCardType;
  visual: 'brief' | 'wide';
};

export const ServicesCard: React.FC<ServiceCardProps> = ({ card, visual }) => {
  const { t } = useTranslation();
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
    <>
      {visual === 'brief' ? (
        <article
          className={`${styles.cardWrapper} ${isShown && styles.spinCard}`}
        >
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

                <p className={`${styles.detailsLink} ${styles.card__details}`}>
                  {t('home_services_details')}
                </p>
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

              <p className={styles.detailsLink}>{t('home_services_close')}</p>
            </div>
          )}
        </article>
      ) : (
        <div className={styles.serDetCard}>
          <div className={styles.serDetCard__image}>
            <img
              className={styles.serDetCard__imageItself}
              src={card.photo}
              alt='card_image'
            />
          </div>

          <div className={styles.serDetCard__content}>
            <h2 className={styles.serDetCard__title}>{card.title}</h2>

            <div
              className={`${styles.serDetCard__textBlock} ${styles.serDetCard__textBlock_block1}`}
            >
              <p
                className={`${styles.serDetCard__text} ${styles.serDetCard__text_text1}`}
              >
                {card.details_block1}
              </p>
            </div>

            <div
              className={`${styles.serDetCard__textBlock} ${styles.serDetCard__textBlock_block2}`}
            >
              <p
                className={`${styles.serDetCard__text} ${styles.serDetCard__text_text2}`}
              >
                {card.details_block2}
              </p>
            </div>

            <div
              className={`${styles.serDetCard__textBlock} ${styles.serDetCard__textBlock_block3}`}
            >
              <p
                className={`${styles.serDetCard__text} ${styles.serDetCard__text_text3}`}
              >
                {card.details_block3}
              </p>
            </div>
          </div>

          <div className={styles.serDetCard__priceBlockWrapper}>
            <div className={styles.serDetCard__priceBlock}>
              <h3 className={styles.serDetCard__priceBlockText}>
                {`${card.price}₴`}
              </h3>
              {card.hourly && (
                <>
                  <h3 className={styles.serDetCard__priceBlockText}>
                    &nbsp;/
                    {
                      <img
                        className={styles.serDetCard__clockIco}
                        src='./icons/clock-ico.svg'
                        alt='clock-ico'
                      />
                    }
                    1 {t('hour')}
                  </h3>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
