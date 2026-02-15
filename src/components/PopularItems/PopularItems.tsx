'use client';

import { useState } from 'react';
import './PopularItems.css';

interface PopularItem {
  id: number;
  name: string;
  image: string;
}

export default function PopularItems() {
  const items: PopularItem[] = [
    {
      id: 1,
      name: 'Хінкалі з бараниною',
      image: '/menu/khinkali.png',
    },
    {
      id: 2,
      name: 'Салат по-грузинськи',
      image: '/menu/salat.png',
    },
    {
      id: 3,
      name: 'Лаваш-караваш',
      image: '/menu/karavash.jpeg',
    },
    {
      id: 4,
      name: 'Люля-кебаб з баранини',
      image: '/menu/kebab.png',
    },
  ];

  return (
    <section className="popular-items">
      <h2 className="popular-items__title">Нове та популярне</h2>
      <div className="popular-items__list">
        {items.map((item, index) => (
          <PopularItemCard 
            key={item.id} 
            item={item} 
            isFirst={index === 0}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

interface PopularItemCardProps {
  item: PopularItem;
  isFirst?: boolean;
  isLast?: boolean;
}

function PopularItemCard({ item, isFirst, isLast }: PopularItemCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article 
      className={`popular-items__item ${
        isFirst ? 'popular-items__item--first' : ''
      } ${
        isLast ? 'popular-items__item--last' : ''
      }`}
    >
      {!imageError ? (
        <img
          src={item.image}
          alt={item.name}
          className="popular-items__image"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="popular-items__image-placeholder">
          Зображення недоступне
        </div>
      )}
    </article>
  );
}
