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

// Генерация 20 уникальных товаров на основе шаблонов
const generateMockData = (): ProductItem[] => {
  const baseItems: ProductItem[] = [
    {
      id: 1,
      name: "По-аджарські з яйцем",
      description: "Склад: сир сулугуні, яйце, вершкове масло, тісто на заквасці.",
      price: 220,
      weight: 550,
      imageUrl: "/images/khachapuri-adjarian.png",
      isPopular: true,
    },
    {
      id: 2,
      name: "Кубдари",
      description: "Склад: Свинина, яловичина",
      price: 230,
      weight: 550,
      imageUrl: "/images/khachapuri-kubdari.png",
    },
    {
      id: 3,
      name: "Хачапурі по-мергельськи",
      description: "Склад: сулугуні, тісто з хрусткою скоринкою.",
      price: 220,
      weight: 550,
      imageUrl: "/images/po-megerski.png",
    },
    {
      id: 4,
      name: "Хачапурі по-царські",
      description: "Склад: сир сулугуні, підсмажені шматочки сулугуні",
      price: 320,
      weight: 700,
      imageUrl: "/images/khachapuri-czar.png",
      isPopular: true,
    },
    {
      id: 5,
      name: "Кубдари з сиром",
      description: "Склад: сир сулугуні, свинина, яловичина, зелень, тонке домашнє тісто.",
      price: 220,
      weight: 550,
      imageUrl: "/images/kubdari-cheese.png",
    },
    {
      id: 6,
      name: "З куркою та сиром",
      description: "Склад: куряче філе, сир моцарела, вершковий соус, тісто.",
      price: 220,
      weight: 550,
      imageUrl: "/images/kurkoyu-ta-sirom.png",
    },
    {
      id: 7,
      name: "Хачапурі з бараниною",
      description: "Склад: баранина, сир сулугуні, спеції, тісто.",
      price: 250,
      weight: 600,
      imageUrl: "/images/khachapuri-baranina.png",
    },
    {
      id: 8,
      name: "Чвиштари",
      description: "Склад: сир сулугуні, кукурудзяне борошно, вершки.",
      price: 180,
      weight: 400,
      imageUrl: "/images/chvistari.png",
    },
    {
      id: 9,
      name: "Лобіо",
      description: "Склад: квасоля, гострий перець, часник, спеції.",
      price: 150,
      weight: 300,
      imageUrl: "/images/lobio.png",
    },
    {
      id: 10,
      name: "Бадриджани",
      description: "Склад: баклажани, горіховий соус, часник.",
      price: 170,
      weight: 350,
      imageUrl: "/images/badrijani.png",
    }
  ];

  const items: ProductItem[] = [];
  // Индексы популярных товаров для 20 элементов (макс. индекс 19)
  const popularIndices = [0, 3, 8, 15, 19]; 
  
  // Генерируем ровно 20 уникальных товаров
  for (let i = 0; i < 20; i++) {
    const baseIndex = i % baseItems.length;
    const baseItem = baseItems[baseIndex];
    
    // Вариации цен и веса для разнообразия
    const priceVariation = Math.floor(Math.random() * 40) - 20;
    const weightVariation = Math.floor(Math.random() * 100) - 50;
    
    items.push({
      ...baseItem,
      id: i + 1,
      name: baseItem.name, // Убраны цифры из имени
      price: Math.max(120, baseItem.price + priceVariation),
      weight: Math.max(250, baseItem.weight + weightVariation),
      isPopular: popularIndices.includes(i) || (i < baseItems.length && baseItem.isPopular),
      // Циклически используем изображения с вариациями путей
      imageUrl: baseItem.imageUrl.replace('.png', `-${Math.floor(i / baseItems.length)}.png`)
    });
  }
  
  return items;
};

const ProductsItems = ({
  title = "Меню",
  items: initialItems,
  isLoading: externalLoading,
}: ProductsItemsProps) => {
  const [internalItems, setInternalItems] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Загрузка данных
  useEffect(() => {
    // Сбрасываем состояния при изменении входных данных
    setIsLoading(true);
    setHasError(false);
    
    try {
      if (initialItems && initialItems.length > 0) {
        // Ограничиваем внешние данные до 20 элементов
        setInternalItems(initialItems.slice(0, 20));
        setIsLoading(false);
        return;
      }

      // Генерация моковых данных (ровно 20 товаров)
      const mockData = generateMockData();
      
      // Имитация задержки загрузки
      const timer = setTimeout(() => {
        setInternalItems(mockData);
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error loading products:", error);
      setHasError(true);
      setIsLoading(false);
    }
  }, [initialItems]);

  const loading = externalLoading ?? isLoading;
  // Всегда отображаем все доступные товары (максимум 20)
  const itemsToDisplay = internalItems;

  // Скелетон загрузки (оставляем 8 элементов для initial view)
  if (loading) {
    return (
      <section className="products-menu products-menu--loading">
      <h2 className="products-menu__title">{title}</h2>
      <div className="products-menu__grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="products-menu__item-skeleton">
            <div className="products-menu__image-skeleton"></div>
            <div className="products-menu__content-skeleton">
              <div className="products-menu__name-skeleton"></div>
              <div className="products-menu__description-skeleton"></div>
              <div className="products-menu__footer-skeleton">
                <div className="products-menu__price-skeleton"></div>
                <div className="products-menu__weight-skeleton"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    );
  }

  // Ошибка загрузки
  if (hasError) {
    return (
      <section className="products-menu">
        <h2 className="products-menu__title">{title}</h2>
        <p className="products-menu__error">Помилка завантаження товарів. Спробуйте пізніше.</p>
      </section>
    );
  }

  // Пустое состояние
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
        {itemsToDisplay.map((item) => (
          <article 
            key={item.id} 
            className={`products-menu__item ${
              item.isPopular ? "products-menu__item--popular" : ""
            }`}
            aria-label={`Товар: ${item.name}`}
          >
            <div className="products-menu__image-wrapper">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="products-menu__image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                priority={item.isPopular}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const wrapper = target.parentElement;
                  if (wrapper) {
                    wrapper.innerHTML = '<div class="products-menu__image-placeholder">Зображення недоступне</div>';
                  }
                }}
              />
              {item.isPopular && (
                <span className="products-menu__badge" aria-label="Популярний товар">
                  Популярне
                </span>
              )}
            </div>
            
            <div className="products-menu__content">
              <h3 className="products-menu__name">{item.name}</h3>
              <p className="products-menu__description">
                {item.description}
              </p>
              
              <div className="products-menu__footer">
                <span className="products-menu__price">
                  {item.price.toLocaleString('uk-UA')} грн
                </span>
                <span className="products-menu__weight">
                  {item.weight} г
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {/* Кнопка "Завантажити ще" полностью удалена */}
    </section>
  );
};

export default ProductsItems;