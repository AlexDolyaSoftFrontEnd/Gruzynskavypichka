"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUtensils, 
  faRotateRight, 
  faFire, 
  faTag, 
  faWeightScale,
  faBowlFood,
  faCircleExclamation,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import "./ProductsItems.css";

interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  imageUrl: string;
  isPopular?: boolean;
}

interface ProductsItemsProps {
  title?: string;
  items?: ProductItem[];
  isLoading?: boolean;
}

const generateMockData = (): ProductItem[] => {
  return [
    {
      id: 1,
      name: "Хачапурі по-аджарські",
      description: "Тісто на заквасці, сир сулугуні, яйце, вершкове масло.",
      price: 260,
      weight: 550,
      imageUrl: "/menu/khachapuri.png",
      isPopular: true,
    },
    {
      id: 2,
      name: "Хінкалі (1 шт.)",
      description: "Традиційна грузинська пампушка з яловичо-свинячим фаршем, бульйоном всередині, часником та спеціями.",
      price: 32,
      weight: 100,
      imageUrl: "/menu/khinkali.png",
      isPopular: true,
    },
    {
      id: 3,
      name: "Картопля фрі",
      description: "Золотиста картопля фрі зі спеціальними спеціями.",
      price: 95,
      weight: 250,
      imageUrl: "/menu/fri.png",
    },
    {
      id: 4,
      name: "Грузинський лимонад",
      description: "Освіжаючий напій з натуральними ароматами груші, тархуну та винограду.",
      price: 85,
      weight: 450,
      imageUrl: "/menu/zadukeli.jpg",
    },
    {
      id: 5,
      name: "Стейк з лосося на грилі",
      description: "Свіжий лосось у фірмовому маринаді, запечений на грилі.",
      price: 320,
      weight: 220,
      imageUrl: "/menu/losos.png",
    },
    {
      id: 6,
      name: "Бадріджані з горіховим соусом",
      description: "Запечені баклажани з соусом з грецьких горіхів, часнику та гранатового соусу.",
      price: 165,
      weight: 300,
      imageUrl: "/menu/kurkoyu.png",
    },
    {
      id: 7,
      name: "Суп «Харчо»",
      description: "Насичений суп на яловичому бульйоні з рисом, хмели-сунелі, волоськими горіхами та кінзою.",
      price: 145,
      weight: 350,
      imageUrl: "/menu/kharcho.png",
    },
    {
      id: 8,
      name: "Картопля на мангалі",
      description: "Картопля, запечена на вугіллі з грузинськими спеціями та розмарином.",
      price: 110,
      weight: 350,
      imageUrl: "/menu/kartoplya.png",
    },
    {
      id: 9,
      name: "Сациві з куриці",
      description: "Куряче філе в насиченому соусі з грецьких горіхів, часнику та спецій хмели-сунелі.",
      price: 295,
      weight: 400,
      imageUrl: "/menu/rebra.png",
    },
    {
      id: 10,
      name: "Овочі гриль",
      description: "Сезонні овочі (баклажан, кабачок, перець, цибуля, гриби) на грилі з оливковою олією та зеленню.",
      price: 175,
      weight: 380,
      imageUrl: "/menu/ovochi.png",
    },
    {
      id: 11,
      name: "Курячий бульйон з зеленню",
      description: "Легкий бульйон з курки, зелені, коренів та спецій. Подавати з грінками.",
      price: 85,
      weight: 300,
      imageUrl: "/menu/bulyon.png",
    },
  ];
};

const ProductsItems = ({
  title = "Меню",
  items: initialItems,
  isLoading: externalLoading,
}: ProductsItemsProps) => {
  const [internalItems, setInternalItems] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    try {
      if (initialItems && initialItems.length > 0) {
        setInternalItems(initialItems);
        setIsLoading(false);
        return;
      }

      const timer = setTimeout(() => {
        setInternalItems(generateMockData());
        setIsLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  }, [initialItems]);

  const loading = externalLoading ?? isLoading;

  if (loading) {
    return (
      <section 
        className="products-menu products-menu--loading" 
        aria-busy="true"
        aria-label="Завантаження меню"
      >
        <h2 className="products-menu__title">
          {title}
        </h2>
        <div className="products-menu__grid" role="status">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="products-menu__item-skeleton">
              <div className="products-menu__image-skeleton"></div>
              <div className="products-menu__content-skeleton">
                <div className="products-menu__name-skeleton"></div>
                <div className="products-menu__description-skeleton"></div>
                <div className="products-menu__footer-skeleton"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className="products-menu" aria-live="polite">
        <h2 className="products-menu__title">{title}</h2>
        <div className="products-menu__error-container">
          <p className="products-menu__error">
            <FontAwesomeIcon icon={faCircleExclamation} className="products-menu__error-icon" />
            Не вдалося завантажити меню. 
            <button 
              onClick={() => window.location.reload()} 
              className="products-menu__retry-btn"
              aria-label="Спробувати завантажити меню ще раз"
            >
              <FontAwesomeIcon icon={faRotateRight} className="products-menu__retry-icon" />
              Спробувати знову
            </button>
          </p>
        </div>
      </section>
    );
  }

  if (internalItems.length === 0) {
    return (
      <section className="products-menu" aria-live="polite">
        <h2 className="products-menu__title">{title}</h2>
        <div className="products-menu__empty-container">
          <FontAwesomeIcon icon={faBowlFood} className="products-menu__empty-icon" />
          <p className="products-menu__empty">Наразі меню порожнє. Поверніться пізніше.</p>
        </div>
      </section>
    );
  }

  const sortedItems = [...internalItems].sort((a, b) => 
    Number(b.isPopular) - Number(a.isPopular)
  );

  return (
    <section className="products-menu" aria-label={title}>
      <h2 className="products-menu__title">
        {title}
      </h2>
      <div className="products-menu__grid">
        {sortedItems.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

const ProductCard = ({ item }: { item: ProductItem }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className={`products-menu__item ${
        item.isPopular ? "products-menu__item--popular" : ""
      }`}
      aria-labelledby={`product-name-${item.id}`}
    >
      <div className="products-menu__image-wrapper">
        {!imageError ? (
          <Image
            src={item.imageUrl}
            alt={`Страва: ${item.name}. ${item.description}`}
            fill
            className="products-menu__image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={item.isPopular}
            onError={() => setImageError(true)}
            loading={item.isPopular ? "eager" : "lazy"}
          />
        ) : (
          <div 
            className="products-menu__image-placeholder" 
            aria-label="Зображення недоступне"
            role="img"
          >
            <FontAwesomeIcon icon={faUtensils} className="products-menu__placeholder-icon" />
            <span className="visually-hidden">Зображення страви тимчасово недоступне</span>
          </div>
        )}

        {item.isPopular && (
          <span 
            className="products-menu__badge" 
            aria-label="Популярна страва"
          >
            <FontAwesomeIcon icon={faFire} className="products-menu__badge-icon" />
            Популярне
          </span>
        )}
      </div>

      <div className="products-menu__content">
        <h3 id={`product-name-${item.id}`} className="products-menu__name">
          {item.name}
        </h3>
        <p className="products-menu__description">{item.description}</p>

        <div className="products-menu__footer">
          <span className="products-menu__price" aria-label={`Ціна: ${item.price} гривень`}>
            <FontAwesomeIcon icon={faTag} className="products-menu__price-icon" aria-hidden="true" />
            {item.price.toLocaleString("uk-UA")}
          </span>
          <span 
            className="products-menu__weight" 
            aria-label={`Вага: ${item.weight} грамів`}
          >
            <FontAwesomeIcon icon={faWeightScale} className="products-menu__weight-icon" aria-hidden="true" />
            {item.weight}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductsItems;
