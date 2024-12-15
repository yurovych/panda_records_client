import styles from './ServicesCard.module.scss';
import { ServiceCardType } from '../../../types/Service';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentServiceId } from '../../../slices/current';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ServiceCardProps = {
  card: ServiceCardType;
  visual: 'brief' | 'wide';
};

export const ServicesCard: React.FC<ServiceCardProps> = ({ card, visual }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentServiceId = useAppSelector(
    (state) => state.current.currentServiceId
  );
  const currentLanguage = useAppSelector(
    (state) => state.current.currentLanguage
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
                <p className={styles.card__title}>
                  {currentLanguage === 'ua' ? card.title_uk : card.title_en}
                </p>

                <p className={`${styles.detailsLink} ${styles.card__details}`}>
                  {t('home_services_details')}
                </p>
              </div>
            </div>
          ) : (
            <div onClick={handleLessDetails} className={styles.details}>
              <div className={styles.details__content}>
                <h3 className={styles.details__title}>
                  {currentLanguage === 'ua' ? card.title_uk : card.title_en}
                </h3>
                <div className={styles.details__description}>
                  <h5>
                    {currentLanguage === 'ua'
                      ? card.details_block1_uk
                      : card.details_block1_en}
                  </h5>
                  <h5>
                    {currentLanguage === 'ua'
                      ? card.details_block2_uk
                      : card.details_block2_en}
                  </h5>
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
            <h2 className={styles.serDetCard__title}>
              {currentLanguage === 'ua' ? card.title_uk : card.title_en}
            </h2>

            <div
              className={`${styles.serDetCard__textBlock} ${styles.serDetCard__textBlock_block1}`}
            >
              <p
                className={`${styles.serDetCard__text} ${styles.serDetCard__text_text1}`}
              >
                {currentLanguage === 'ua'
                  ? card.details_block1_uk
                  : card.details_block1_en}
              </p>
            </div>

            <div
              className={`${styles.serDetCard__textBlock} ${styles.serDetCard__textBlock_block2}`}
            >
              <p
                className={`${styles.serDetCard__text} ${styles.serDetCard__text_text2}`}
              >
                {currentLanguage === 'ua'
                  ? card.details_block2_uk
                  : card.details_block2_en}
              </p>
            </div>

            <div
              className={`${styles.serDetCard__textBlock} ${styles.serDetCard__textBlock_block3}`}
            >
              <p
                className={`${styles.serDetCard__text} ${styles.serDetCard__text_text3}`}
              >
                {currentLanguage === 'ua'
                  ? card.details_block3_uk
                  : card.details_block3_en}
              </p>
            </div>
          </div>

          <div className={styles.serDetCard__priceBlockWrapper}>
            <div className={styles.serDetCard__priceBlock}>
              <h3 className={styles.serDetCard__priceBlockText}>
                {`${card.price}₴ / `}
              </h3>
              <img
                className={styles.serDetCard__clockIco}
                src='./icons/clock-ico.svg'
                alt='clock-ico'
              />
              <h3 className={styles.serDetCard__priceBlockText}>
                1 {t('hour')}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
