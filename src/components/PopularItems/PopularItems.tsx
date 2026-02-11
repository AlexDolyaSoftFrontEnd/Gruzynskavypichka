'use client';

import './PopularItems.css';

interface PopularItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function PopularItems() {
  const items: PopularItem[] = [
    {
      id: 1,
      name: 'По-аджарськи',
      price: '220 грн',
      image: '/images/adzharski.png',
    },
    {
      id: 2,
      name: 'Хінкалі мікс',
      price: '25 грн/шт',
      image: '/images/khinkali.png',
    },
    {
      id: 3,
      name: 'Хачапурі по-царські',
      price: '320 грн',
      image: '/images/khachapuri.png',
    },
    {
      id: 4,
      name: 'Люля-кебаб баранина',
      price: '320 грн',
      image: '/images/kebab.png',
    },
  ];

  return (
    <section className="popular-items">
      <h2 className="popular-items__title">Нове та популярне</h2>
      <div className="popular-items__list">
        {items.map((item) => (
          <article key={item.id} className="popular-items__item">
            <img
              src={item.image}
              alt={item.name}
              className="popular-items__image"
              loading="lazy"
            />
            <div className="popular-items__content">
              <h3 className="popular-items__name">{item.name}</h3>
              <p className="popular-items__price">{item.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}