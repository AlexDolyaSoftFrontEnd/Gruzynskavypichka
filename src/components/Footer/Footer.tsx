"use client";

import "./Footer.css";
import { FaWhatsapp, FaTelegram, FaViber, FaMapMarkerAlt} from "react-icons/fa";

export default function Footer() {
  const CONTACT_PHONE = "+380935450594";
  const DISPLAY_PHONE = "+380 93 545 05 94";
  const CHEF_NAME = "Георгій Берадзе";
  const MAP_LINK = "https://maps.google.com/?q=Вулиця+Звенигородська,+201,+Віта-Поштова,+Київська+область";

  // Форматирование номера для мессенджеров (только цифры)
  const cleanPhone = CONTACT_PHONE.replace(/\D/g, '');
  const phoneWithoutCountryCode = cleanPhone.slice(3); 

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Основное содержимое футера */}
        <div className="footer__content">
          {/* Левая секция - контакты и соцсети */}
          <div className="footer__contact">
            <dl className="footer__chef-details">
              <dd>Повар: {CHEF_NAME}</dd>
            </dl>

            {/* Социальные сети и контакты */}
            <div className="footer__social-links">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__icon-link"
                aria-label="Написати у WhatsApp"
              >
                <FaWhatsapp />
              </a>
              
              {/* Telegram */}
              <a
                href={`https://t.me/+${phoneWithoutCountryCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__icon-link"
                aria-label="Написати у Telegram"
              >
                <FaTelegram />
              </a>
              
              {/* Карта */}
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__icon-link"
                aria-label="Переглянути на карті"
              >
                <FaMapMarkerAlt />
              </a>
            </div>
          </div>

          {/* Правая секция - адрес, телефон и часы работы */}
          <div className="footer__info">
            <p className="footer__address">
              Вулиця Звенигородська, 201, Віта-Поштова
            </p>

            <p className="footer__phone">
              Мобильний номер: <a href={`tel:${CONTACT_PHONE}`}>{DISPLAY_PHONE}</a>
            </p>

            <p className="footer__hours">
              Робочі години: 9:00 – 21:00
            </p>
          </div>
        </div>

        {/* Нижняя секция - копирайт */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Грузинська пекарня
          </p>
        </div>
      </div>
    </footer>
  );
}