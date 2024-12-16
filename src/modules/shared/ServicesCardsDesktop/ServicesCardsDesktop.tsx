import { useTranslation } from 'react-i18next';
import { ServiceCardType } from '../../../types/Service';
import styles from './ServicesCardsDesktop.module.scss';
import { useAppSelector } from '../../../app/hooks';

type ServicesCardsDesktopType = {
  services: ServiceCardType[];
};

export const ServicesCardsDesktop: React.FC<ServicesCardsDesktopType> = (
  services
) => {
  const currentLanguage = useAppSelector(
    (state) => state.current.currentLanguage
  );

  const { t } = useTranslation();

  const service1 = services.services[0];
  const service2 = services.services[1];
  const service3 = services.services[2];
  const service4 = services.services[3];
  const service5 = services.services[4];
  const service6 = services.services[5];

  return (
    <>
      <div className={`${styles.card} ${styles.card1}`}>
        <h2 className={`${styles.card__title} ${styles.card1__title}`}>
          {currentLanguage === 'ua' ? service1.title_uk : service1.title_en}
        </h2>

        <div className={`${styles.card__content} ${styles.card1__content}`}>
          <div
            className={`${styles.card__textBlock} ${styles.card1__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card1__text}`}>
              {currentLanguage === 'ua'
                ? service1.details_block1_uk
                : service1.details_block1_en}
            </p>
          </div>

          <div
            className={`${styles.card__textBlock} ${styles.card1__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card1__text}`}>
              {currentLanguage === 'ua'
                ? service1.details_block2_uk
                : service1.details_block2_en}
            </p>
          </div>

          <div
            className={`${styles.card__textBlock} ${styles.card1__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card1__text}`}>
              {currentLanguage === 'ua'
                ? service1.details_block3_uk
                : service1.details_block3_en}
            </p>
          </div>
        </div>

        <div
          className={`${styles.card__priceWrapper} ${styles.card1__priceWrapper}`}
        >
          <div className={styles.card__priceBlock}>
            <h3
              className={`${styles.card__priceText} ${styles.card1__priceText}`}
            >{`${service1.price}₴`}</h3>
            {service1.hourly && (
              <>
                <img
                  className={styles.card__clockIco}
                  src='./icons/clock-ico.svg'
                  alt='clock-ico'
                />
                <h3 className={styles.card__priceText}>1 / {t('hour')}</h3>
              </>
            )}
          </div>
        </div>

        <div className={`${styles.card__image} ${styles.card1__image}`}>
          <img
            className={`${styles.card__imageItself} ${styles.card1__imageItself}`}
            src={service1.photo}
            alt='card_image'
          />
        </div>
      </div>

      <div className={`${styles.card} ${styles.card2}`}>
        <h2 className={`${styles.card__title} ${styles.card2__title}`}>
          {currentLanguage === 'ua' ? service2.title_uk : service2.title_en}{' '}
        </h2>

        <div className={`${styles.card__content} ${styles.card2__content}`}>
          <div
            className={`${styles.card__textBlock} ${styles.card2__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card2__text}`}>
              {currentLanguage === 'ua'
                ? service2.details_block1_uk
                : service2.details_block1_en}
            </p>
          </div>

          <div
            className={`${styles.card__textBlock} ${styles.card2__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card2__text}`}>
              {currentLanguage === 'ua'
                ? service2.details_block2_uk
                : service2.details_block2_en}
            </p>
          </div>
        </div>

        <div
          className={`${styles.card__priceWrapper} ${styles.card2__priceWrapper}`}
        >
          <div className={styles.card__priceBlock}>
            <h3
              className={`${styles.card__priceText} ${styles.card2__priceText}`}
            >{`${service2.price}₴`}</h3>
            {service2.hourly && (
              <>
                <img
                  className={styles.card__clockIco}
                  src='./icons/clock-ico.svg'
                  alt='clock-ico'
                />
                <h3 className={styles.card__priceText}>1 / {t('hour')}</h3>
              </>
            )}
          </div>
        </div>

        <div className={`${styles.card__image} ${styles.card2__image}`}>
          <img
            className={`${styles.card__imageItself} ${styles.card2__imageItself}`}
            src={service2.photo}
            alt='card_image'
          />
        </div>
      </div>

      <div className={`${styles.card} ${styles.card3}`}>
        <h2 className={`${styles.card__title} ${styles.card3__title}`}>
          {currentLanguage === 'ua' ? service3.title_uk : service3.title_en}{' '}
        </h2>

        <div className={`${styles.card__content} ${styles.card3__content}`}>
          <div
            className={`${styles.card__textBlock} ${styles.card3__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card3__text}`}>
              {currentLanguage === 'ua'
                ? service3.details_block1_uk
                : service3.details_block1_en}
            </p>
          </div>

          <div
            className={`${styles.card__textBlock} ${styles.card3__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card3__text}`}>
              {currentLanguage === 'ua'
                ? service3.details_block2_uk
                : service3.details_block2_en}
            </p>
          </div>
        </div>

        <div
          className={`${styles.card__priceWrapper} ${styles.card3__priceWrapper}`}
        >
          <div className={styles.card__priceBlock}>
            <h3
              className={`${styles.card__priceText} ${styles.card3__priceText}`}
            >{`${service3.price}₴`}</h3>
            {service3.hourly && (
              <>
                <img
                  className={styles.card__clockIco}
                  src='./icons/clock-ico.svg'
                  alt='clock-ico'
                />
                <h3 className={styles.card__priceText}>1 / {t('hour')}</h3>
              </>
            )}
          </div>
        </div>

        <div className={`${styles.card__image} ${styles.card3__image}`}>
          <img
            className={`${styles.card__imageItself} ${styles.card3__imageItself}`}
            src={service3.photo}
            alt='card_image'
          />
        </div>
      </div>

      <div className={`${styles.card} ${styles.card4}`}>
        <h2 className={`${styles.card__title} ${styles.card4__title}`}>
          {currentLanguage === 'ua' ? service4.title_uk : service4.title_en}{' '}
        </h2>

        <div className={`${styles.card__content} ${styles.card4__content}`}>
          <div
            className={`${styles.card__textBlock} ${styles.card4__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card4__text}`}>
              {currentLanguage === 'ua'
                ? service4.details_block1_uk
                : service4.details_block1_en}
            </p>
          </div>

          <div
            className={`${styles.card__textBlock} ${styles.card4__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card4__text}`}>
              {currentLanguage === 'ua'
                ? service4.details_block2_uk
                : service4.details_block2_en}
            </p>
          </div>

          <div
            className={`${styles.card__textBlock} ${styles.card4__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card4__text}`}>
              {currentLanguage === 'ua'
                ? service4.details_block3_uk
                : service4.details_block3_en}
            </p>
          </div>
        </div>

        <div
          className={`${styles.card__priceWrapper} ${styles.card4__priceWrapper}`}
        >
          <div className={styles.card__priceBlock}>
            <h3
              className={`${styles.card__priceText} ${styles.card4__priceText}`}
            >{`${service4.price}₴`}</h3>
            {service4.hourly && (
              <>
                <img
                  className={styles.card__clockIco}
                  src='./icons/clock-ico.svg'
                  alt='clock-ico'
                />
                <h3 className={styles.card__priceText}>1 / {t('hour')}</h3>
              </>
            )}
          </div>
        </div>

        <div className={`${styles.card__image} ${styles.card4__image}`}>
          <img
            className={`${styles.card__imageItself} ${styles.card4__imageItself}`}
            src={service4.photo}
            alt='card_image'
          />
        </div>
      </div>

      <div className={`${styles.card} ${styles.card5}`}>
        <h2 className={`${styles.card__title} ${styles.card5__title}`}>
          {currentLanguage === 'ua' ? service5.title_uk : service5.title_en}{' '}
        </h2>

        <div className={`${styles.card__content} ${styles.card5__content}`}>
          <div
            className={`${styles.card__textBlock} ${styles.card5__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card5__text}`}>
              {currentLanguage === 'ua'
                ? service5.details_block1_uk
                : service5.details_block1_en}
            </p>
          </div>

          <div
            className={`${styles.card__textBlock} ${styles.card5__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card5__text}`}>
              {currentLanguage === 'ua'
                ? service5.details_block2_uk
                : service5.details_block2_en}
            </p>
          </div>
        </div>

        <div
          className={`${styles.card__priceWrapper} ${styles.card5__priceWrapper}`}
        >
          <div className={styles.card__priceBlock}>
            <h3
              className={`${styles.card__priceText} ${styles.card5__priceText}`}
            >{`${service5.price}₴`}</h3>
            {service5.hourly && (
              <>
                <img
                  className={styles.card__clockIco}
                  src='./icons/clock-ico.svg'
                  alt='clock-ico'
                />
                <h3 className={styles.card__priceText}>1 / {t('hour')}</h3>
              </>
            )}
          </div>
        </div>

        <div className={`${styles.card__image} ${styles.card5__image}`}>
          <img
            className={`${styles.card__imageItself} ${styles.card5__imageItself}`}
            src={service5.photo}
            alt='card_image'
          />
        </div>
      </div>

      <div className={`${styles.card} ${styles.card6}`}>
        <h2 className={`${styles.card__title} ${styles.card6__title}`}>
          {currentLanguage === 'ua' ? service6.title_uk : service6.title_en}{' '}
        </h2>

        <div className={`${styles.card__content} ${styles.card6__content}`}>
          <div
            className={`${styles.card__textBlock} ${styles.card6__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card6__text}`}>
              {currentLanguage === 'ua'
                ? service6.details_block1_uk
                : service6.details_block1_en}
            </p>
          </div>

          <div
            className={`${styles.card__textBlock} ${styles.card6__textBlock}`}
          >
            <p className={`${styles.card__text} ${styles.card6__text}`}>
              {currentLanguage === 'ua'
                ? service6.details_block2_uk
                : service6.details_block2_en}
            </p>
          </div>
        </div>

        <div
          className={`${styles.card__priceWrapper} ${styles.card6__priceWrapper}`}
        >
          <div className={styles.card__priceBlock}>
            <h3
              className={`${styles.card__priceText} ${styles.card6__priceText}`}
            >{`${service6.price}₴`}</h3>
            {service6.hourly && (
              <>
                <img
                  className={styles.card__clockIco}
                  src='./icons/clock-ico.svg'
                  alt='clock-ico'
                />
                <h3 className={styles.card__priceText}>1 / {t('hour')}</h3>
              </>
            )}
          </div>
        </div>

        <div className={`${styles.card__image} ${styles.card6__image}`}>
          <img
            className={`${styles.card__imageItself} ${styles.card6__imageItself}`}
            src={service6.photo}
            alt='card_image'
          />
        </div>
      </div>
    </>
  );
};
