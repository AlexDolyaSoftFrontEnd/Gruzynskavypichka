"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faRotateRight,
  faFire,
  faTag,
  faWeightScale,
  faBowlFood,
  faCircleExclamation,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import menuData from "./menu-data.json";
import "./ProductsItems.css";

interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  imageUrl: string;
  isPopular?: boolean;
  category?: string;
}

interface ProductsItemsProps {
  title?: string;
  items?: ProductItem[];
  isLoading?: boolean;
  onLoadError?: (error: Error) => void;
}

const LOAD_DELAY_MS = 600;
const SKELETON_COUNT = 9;

const VALID_CATEGORIES = [
  "vegetable",
  "meat",
  "soup",
  "side",
  "cheese",
  "drink",
  "dessert",
];

function validateProductItem(item: unknown, index: number): ProductItem | null {
  if (!item || typeof item !== "object") {
    console.warn(`[Validation] Item at index ${index} is not an object`);
    return null;
  }

  const product = item as Record<string, unknown>;
  const requiredFields = ["id", "name", "description", "price", "weight", "imageUrl"];

  for (const field of requiredFields) {
    if (!(field in product)) {
      console.warn(`[Validation] Item at index ${index} missing field: ${field}`);
      return null;
    }
  }

  if (typeof product.id !== "number" || product.id <= 0) {
    console.warn(`[Validation] Item at index ${index} has invalid id`);
    return null;
  }

  if (typeof product.name !== "string" || product.name.trim().length === 0) {
    console.warn(`[Validation] Item at index ${index} has invalid name`);
    return null;
  }

  if (typeof product.description !== "string") {
    console.warn(`[Validation] Item at index ${index} has invalid description`);
    return null;
  }

  if (typeof product.price !== "number" || product.price <= 0) {
    console.warn(`[Validation] Item at index ${index} has invalid price`);
    return null;
  }

  if (typeof product.weight !== "number" || product.weight <= 0) {
    console.warn(`[Validation] Item at index ${index} has invalid weight`);
    return null;
  }

  if (typeof product.imageUrl !== "string" || product.imageUrl.trim().length === 0) {
    console.warn(`[Validation] Item at index ${index} has invalid imageUrl`);
    return null;
  }

  if (product.category !== undefined) {
    if (typeof product.category !== "string" || !VALID_CATEGORIES.includes(product.category)) {
      console.warn(`[Validation] Item at index ${index} has invalid category`);
      return null;
    }
  }

  return {
    id: product.id,
    name: product.name.trim(),
    description: product.description.trim(),
    price: product.price,
    weight: product.weight,
    imageUrl: product.imageUrl.trim(),
    isPopular: Boolean(product.isPopular),
    category: product.category as string | undefined,
  };
}

function validateMenuData(data: unknown): ProductItem[] | null {
  if (!data || typeof data !== "object") {
    console.error("[Validation] Invalid data structure");
    return null;
  }

  const menu = data as Record<string, unknown>;

  if (!Array.isArray(menu.items)) {
    console.error("[Validation] Missing or invalid items array");
    return null;
  }

  const validItems: ProductItem[] = [];

  menu.items.forEach((item, index) => {
    const validatedItem = validateProductItem(item, index);
    if (validatedItem) {
      validItems.push(validatedItem);
    }
  });

  if (validItems.length === 0) {
    console.error("[Validation] No valid items found");
    return null;
  }

  const uniqueIds = new Set(validItems.map((item) => item.id));
  if (uniqueIds.size !== validItems.length) {
    console.warn("[Validation] Duplicate item IDs detected");
  }

  return validItems;
}

function loadMenuData(): Promise<ProductItem[]> {
  return new Promise((resolve, reject) => {
    try {
      const validated = validateMenuData(menuData);

      if (!validated) {
        reject(new Error("Невірний формат даних меню"));
        return;
      }

      resolve(validated);
    } catch (error) {
      reject(error instanceof Error ? error : new Error("Помилка завантаження меню"));
    }
  });
}

export default function ProductsItems({
  title = "Меню",
  items: externalItems,
  isLoading: externalLoading,
  onLoadError,
}: ProductsItemsProps) {
  const [internalItems, setInternalItems] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchMenu = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");

    try {
      if (externalItems && externalItems.length > 0) {
        setInternalItems(externalItems);
        setIsLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, LOAD_DELAY_MS));

      const items = await loadMenuData();
      setInternalItems(items);
      setIsLoading(false);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error("Невідома помилка");
      setHasError(true);
      setErrorMessage(errorObj.message);
      setIsLoading(false);
      onLoadError?.(errorObj);
    }
  }, [externalItems, onLoadError]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const loading = externalLoading ?? isLoading;

  if (loading) {
    return (
      <section
        className="products-menu products-menu--loading"
        aria-busy="true"
        aria-label="Завантаження меню"
      >
        <header className="products-menu__header">
          <h2 className="products-menu__title">{title}</h2>
          <div className="products-menu__loading-indicator" aria-hidden="true">
            <FontAwesomeIcon icon={faClock} spin />
            <span>Завантаження...</span>
          </div>
        </header>

        <div className="products-menu__grid" role="status">
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <article key={index} className="products-menu__item-skeleton">
              <div className="products-menu__image-skeleton" />
              <div className="products-menu__content-skeleton">
                <div className="products-menu__name-skeleton" />
                <div className="products-menu__description-skeleton" />
                <div className="products-menu__footer-skeleton" />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className="products-menu products-menu--error" aria-live="polite">
        <header className="products-menu__header">
          <h2 className="products-menu__title">{title}</h2>
        </header>

        <div className="products-menu__error-container" role="alert">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="products-menu__error-icon"
            aria-hidden="true"
          />
          <p className="products-menu__error-message">
            {errorMessage || "Не вдалося завантажити меню"}
          </p>
          <button
            type="button"
            onClick={fetchMenu}
            className="products-menu__retry-btn"
            aria-label="Спробувати завантажити меню ще раз"
          >
            <FontAwesomeIcon icon={faRotateRight} aria-hidden="true" />
            <span>Спробувати знову</span>
          </button>
        </div>
      </section>
    );
  }

  if (internalItems.length === 0) {
    return (
      <section className="products-menu products-menu--empty" aria-live="polite">
        <header className="products-menu__header">
          <h2 className="products-menu__title">{title}</h2>
        </header>

        <div className="products-menu__empty-container">
          <FontAwesomeIcon
            icon={faBowlFood}
            className="products-menu__empty-icon"
            aria-hidden="true"
          />
          <p className="products-menu__empty-text">
            Наразі меню порожнє. Поверніться пізніше.
          </p>
        </div>
      </section>
    );
  }

  const sortedItems = [...internalItems].sort(
    (a, b) => Number(b.isPopular) - Number(a.isPopular)
  );

  const popularCount = sortedItems.filter((item) => item.isPopular).length;

  return (
    <section className="products-menu" aria-label={title}>
      <header className="products-menu__header">
        <h2 className="products-menu__title" id="menu-heading">
          {title}
        </h2>
      </header>

      <ul className="products-menu__grid" role="list" aria-labelledby="menu-heading">
        {sortedItems.map((item, index) => (
          <li
            key={item.id}
            className="products-menu__list-item"
            style={{ "--item-index": index } as React.CSSProperties}
          >
            <ProductCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

interface ProductCardProps {
  item: ProductItem;
}

function ProductCard({ item }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardId = `product-${item.id}`;
  const nameId = `product-name-${item.id}`;
  const descId = `product-desc-${item.id}`;

  return (
    <article
      id={cardId}
      className={`products-menu__item ${item.isPopular ? "products-menu__item--popular" : ""}`}
      aria-labelledby={nameId}
      aria-describedby={descId}
    >
      <div className="products-menu__image-wrapper">
        {!imageError ? (
          <>
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className={`products-menu__image ${imageLoaded ? "products-menu__image--loaded" : ""}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={item.isPopular}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
              loading={item.isPopular ? "eager" : "lazy"}
            />
            {!imageLoaded && (
              <div className="products-menu__image-loading" aria-hidden="true" />
            )}
          </>
        ) : (
          <div
            className="products-menu__image-placeholder"
            role="img"
            aria-label={`Зображення для страви ${item.name} недоступне`}
          >
            <FontAwesomeIcon icon={faUtensils} className="products-menu__placeholder-icon" aria-hidden="true" />
            <span className="visually-hidden">Зображення недоступне</span>
          </div>
        )}

        {item.isPopular && (
          <span className="products-menu__badge" aria-label="Популярна страва">
            <FontAwesomeIcon icon={faFire} className="products-menu__badge-icon" aria-hidden="true" />
            <span>Популярне</span>
          </span>
        )}
      </div>

      <div className="products-menu__content">
        <h3 id={nameId} className="products-menu__name">
          {item.name}
        </h3>

        <p id={descId} className="products-menu__description">
          {item.description}
        </p>

        <footer className="products-menu__footer">
          <span
            className="products-menu__price"
            aria-label={`Ціна: ${item.price} гривень`}
          >
            <FontAwesomeIcon icon={faTag} className="products-menu__price-icon" aria-hidden="true" />
            <span className="products-menu__price-value">
              {item.price.toLocaleString("uk-UA")}
            </span>
          </span>

          <span
            className="products-menu__weight"
            aria-label={`Вага: ${item.weight} грамів`}
          >
            <FontAwesomeIcon icon={faWeightScale} className="products-menu__weight-icon" aria-hidden="true" />
            <span>{item.weight}</span>
            <span className="visually-hidden">г</span>
          </span>
        </footer>
      </div>
    </article>
  );
}