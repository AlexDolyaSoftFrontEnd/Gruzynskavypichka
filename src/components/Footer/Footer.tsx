"use client";

import "./Footer.css";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const CONTACT_PHONE = "+380935450594";
  const DISPLAY_PHONE = "+380 93 545 05 94";
  const CHEF_NAME = "Кафе Хінкальня";
  const MAP_LINK = "https://maps.google.com/?q=Вито-Почтового+сельского+совета,+18+200+км+правее+автодороги+Киев-Одесса+в+админграницах,+Віта-Поштова,+Київська+область,+08170";
  const cleanPhone = CONTACT_PHONE.replace(/\D/g, '');

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <section className="footer__contact" aria-labelledby="footer-chef-title">
            <div className="footer__chef-details">
              <h2 id="footer-chef-title" className="footer__title">{CHEF_NAME}</h2>
              <p className="footer__description">
               Повар: Геогрій
              </p>
            </div>
            <nav className="footer__social-links" aria-label="Соціальні мережі та контакти">
              <ul className="footer__social-list">
                <li>
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
                </li>
                <li>
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
                </li>
              </ul>
            </nav>
          </section>
    
          <address className="footer__info">
            <p className="footer__address">
              <span className="footer__label">Адреса:</span>
              Віта-Поштова, 18 км. правее автодороги Київ-Одеса
            </p>
    
            <p className="footer__phone">
              <span className="footer__label">Номер телефону:</span>
              <a
                href={`tel:${CONTACT_PHONE}`}
                aria-label="Позвонити"
                className="footer__phone-link"
                data-tooltip="Зателефонувати"
              >
                {DISPLAY_PHONE}
              </a>
            </p>
    
            <p className="footer__hours">
              <span className="footer__label">Робочі години:</span>
              <time dateTime="PT12H" className="footer__time">9:00 – 21:00</time>
            </p>
          </address>
        </div>
        <div className="footer__bottom">
          <small className="footer__copyright">
            &copy; {new Date().getFullYear()} Кафе Хінкальня
          </small>
        </div>
      </div>
    </footer>
  );
}
