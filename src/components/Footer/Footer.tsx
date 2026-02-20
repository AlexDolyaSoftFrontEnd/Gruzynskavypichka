"use client";

import "./Footer.css";
import { FaWhatsapp, FaTelegram, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const CONTACT_PHONE = "+380935450594";
  const DISPLAY_PHONE = "+380 93 545 05 94";
  const CHEF_NAME = "Георгій";
  // Обновленная ссылка на карту с новым адресом
  const MAP_LINK = "https://maps.google.com/?q=Вито-Почтового+сельского+совета,+18+200+км+правее+автодороги+Киев-Одесса+в+админграницах,+Віта-Поштова,+Київська+область,+08170";

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
              <dd>Свіжі хачапурі за традиційними рецептами прямо до вашого столу.</dd>
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
                data-tooltip="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              
              {/* Карта */}
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__icon-link"
                aria-label="Переглянути на карті"
                data-tooltip="Карта"
              >
                <FaMapMarkerAlt />
              </a>
            </div>
          </div>

          {/* Правая секция - адрес, телефон и часы работы */}
          <div className="footer__info">
            <p className="footer__address">
              Адреса: Віта-Поштова, 18 км. правее автодороги Київ-Одеса
            </p>

            <p className="footer__phone">
              Телефон:{" "}
              <a
                href={`tel:${CONTACT_PHONE}`}
                aria-label="Позвонити"
                className="footer__phone-link"
              >
                {DISPLAY_PHONE}
              </a>
            </p>

            <p className="footer__hours">
              Робочі години: 9:00 – 17:00
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            Кафе Хінкальня
          </p>
        </div>
      </div>
    </footer>
  );
}
