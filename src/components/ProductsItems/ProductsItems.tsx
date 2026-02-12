"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
      description: "Склад: сир сулугуні, яйце, вершкове масло, тісто на заквасці.",
      price: 260,
      weight: 550,
      imageUrl: "/menu/khachapuri.png",
      isPopular: true,
    },
    {
      id: 2,
      name: "Хінкалі",
      description: "Склад: тісто, яловичо-свиняче м'ясо, часник, спеції.",
      price: 220,
      weight: 420,
      imageUrl: "/menu/khinkali.png",
      isPopular: false,
    },
    {
      id: 3,
      name: "Картопля фрі",
      description: "Склад: сир сулугуні, тісто з хрусткою скоринкою.",
      price: 50,
      weight: 500,
      imageUrl: "/menu/fri.png",
    },
    {
      id: 4,
      name: "Грузинський лимонад",
      description: "Склад: Груша, Тархун, Виноград.",
      price: 290,
      weight: 450,
      imageUrl: "/menu/zadukeli.jpg",
    },
    {
      id: 5,
      name: "Лосось стейк",
      description: "Склад: філе лосося, фірмовий маринад",
      price: 200,
      weight: 350,
      imageUrl: "/menu/losos.png",
      isPopular: false,
    },
    {
      id: 6,
      name: "Бадріджані",
      description: "Склад: баклажани, грецькі горіхи, часник, гранатовий соус.",
      price: 180,
      weight: 380,
      imageUrl: "/menu/kurkoyu.png",
    },
    {
      id: 7,
      name: "Суп Харчо",
      description: "Склад: яловичина, рис, кінза, волоський горіх, часник, хмели-сунелі.",
      price: 170,
      weight: 400,
      imageUrl: "/menu/kharcho.png",
    },
    {
      id: 8,
      name: "Картопля на мангалі",
      description: "Склад: картопля, спеції.",
      price: 20,
      weight: 350,
      imageUrl: "/menu/kartoplya.png",
      isPopular: false,
    },
    {
      id: 9,
      name: "Сациві з курицею",
      description: "Склад: куряче філе, грецький соус з горіхів, часник, спеції.",
      price: 310,
      weight: 420,
      imageUrl: "/menu/rebra.png",
    },
    {
      id: 10,
      name: "Курячий Бульйон",
      description: "Склад: сир супута, помідори, огірки, зелень, оцет.",
      price: 170,
      weight: 380,
      imageUrl: "/menu/bulyon.png",
    },
    {
      id: 11,
      name: "Овочі гриль",
      description: "Склад: баклажан, кабачок, гриби шампіньйони, перець болгарський, цибуля",
      price: 190,
      weight: 320,
      imageUrl: "/menu/ovochi.png",
    }
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

      const mockData = generateMockData();

      const timer = setTimeout(() => {
        setInternalItems(mockData);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  }, [initialItems]);

  const loading = externalLoading ?? isLoading;

  if (loading) {
    return (
      <section className="products-menu products-menu--loading">
        <h2 className="products-menu__title">{title}</h2>
        <div className="products-menu__grid">
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
      <section className="products-menu">
        <h2 className="products-menu__title">{title}</h2>
        <p className="products-menu__error">
          Помилка завантаження товарів. Спробуйте пізніше.
        </p>
      </section>
    );
  }

  if (internalItems.length === 0) {
    return (
      <section className="products-menu">
        <h2 className="products-menu__title">{title}</h2>
        <p className="products-menu__empty">Товари відсутні</p>
      </section>
    );
  }

  return (
    <section className="products-menu">
      <h2 className="products-menu__title">{title}</h2>

      <div className="products-menu__grid">
        {internalItems.map((item) => (
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
      aria-label={`Товар: ${item.name}`}
    >
      <div className="products-menu__image-wrapper">
        {!imageError ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="products-menu__image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={item.isPopular}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="products-menu__image-placeholder">
            Зображення недоступне
          </div>
        )}

        {item.isPopular && (
          <span className="products-menu__badge">
            Популярне
          </span>
        )}
      </div>

      <div className="products-menu__content">
        <h3 className="products-menu__name">{item.name}</h3>
        <p className="products-menu__description">{item.description}</p>

        <div className="products-menu__footer">
          <span className="products-menu__price">
            {item.price.toLocaleString("uk-UA")} грн
          </span>
          <span className="products-menu__weight">
            {item.weight} г
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductsItems;