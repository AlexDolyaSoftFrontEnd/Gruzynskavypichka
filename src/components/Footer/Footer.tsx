"use client";

import Script from "next/script";
import "./Footer.css";

export default function Footer() {
  const CONTACT_PHONE = "+380935450594";
  const DISPLAY_PHONE = "+38093-545-05-94";
  const CHEF_NAME = "Георгій";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Грузинська пекарня",
    url: "https://gruzynskavypichka.com",
    telephone: CONTACT_PHONE,
    priceRange: "$$",
    servesCuisine: ["Грузинська кухня"],
    image: "https://gruzynskavypichka.com/footer-restaurant.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "вул. Звенигородська, 201",
      addressLocality: "Віта-Поштова",
      addressRegion: "Київська область",
      postalCode: "08132",
      addressCountry: "UA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
  };

  return (
    <>
      <Script
        id="restaurant-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            <div className="footer__contact">
              <dl className="footer__chef-details">
                <dd>Повар: {CHEF_NAME}</dd>
              </dl>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="footer__phone"
                aria-label={`Зателефонувати шеф-повару ${CHEF_NAME}`}
              >
                {DISPLAY_PHONE}
              </a>
            </div>
            <div className="footer__info">
              <p className="footer__address">
                Вулиця Звенигородська, 201, Віта-Поштова, Київська область
              </p>
              <p className="footer__hours">
                Робочі години: 9:00 – 21:00
              </p>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()} Грузинська пекарня
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
