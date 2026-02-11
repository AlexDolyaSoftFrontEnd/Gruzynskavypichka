// components/Footer.tsx
"use client";

import { useEffect } from "react";
import "./Footer.css";

export default function Footer() {
  // Добавляем Schema.org разметку в head для лучшей SEO-оптимизации
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Грузинська кухня",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Звеногородска, 201",
        "addressLocality": "Віта-Поштова",
        "addressRegion": "Київська область",
        "addressCountry": "UA"
      },
      "telephone": "+380935450594",
      "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 09:00-21:00",
      "priceRange": "$$",
      "servesCuisine": ["Грузинська", "Кавказька"],
      "image": "/footer-restaurant.jpg",
      "url": "https://ваш-сайт.com"
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__contact">
            <a 
              href="tel:+380935450594" 
              className="footer__phone"
              aria-label="Телефон грузинської кухні"
            >
              +380935450594
            </a>
          </div>
          
          <div className="footer__info">
            <p className="footer__address">
              Звеногородска, 201, Віта-Поштова, Київська область
            </p>
            <p className="footer__hours">
              Робочі години: 9:00 – 21:00
            </p>
          </div>
          
          <div className="footer__greeting">
            <p className="footer__slogan">Завжди смачно</p>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Грузинська кухня. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}