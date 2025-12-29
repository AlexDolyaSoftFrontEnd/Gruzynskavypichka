"use client";

import { useEffect } from "react";
import "./OrderModal.css";

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OrderModal({
  isOpen,
  onClose,
}: OrderModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="order-modal order-modal--open"
      role="presentation"
    >
      <div
        className="order-modal__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="order-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
      >
        <header className="order-modal__header">
          <h1
            id="order-title"
            className="order-modal__title"
          >
            Замовлення
          </h1>
          <p className="order-modal__subtitle">
            Введіть дані отримувача нижче:
          </p>
        </header>

        <form
          className="order-form"
          autoComplete="on"
        >
          <div className="order-form__grid">
            <div className="order-form__field">
              <label htmlFor="name">
                Імʼя та прізвище*
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Ігор Ручкін"
                autoComplete="name"
              />
            </div>

            <div className="order-form__field">
              <label htmlFor="phone">
                Телефон*
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+380 97 323 47 11"
                autoComplete="tel"
              />
            </div>

            <div className="order-form__field">
              <label htmlFor="email">
                Електронна пошта*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>

            <div className="order-form__field">
              <label htmlFor="city">
                Місто*
              </label>
              <input
                id="city"
                name="city"
                required
                placeholder="Київ"
                autoComplete="address-level2"
              />
            </div>

            <div className="order-form__field">
              <label htmlFor="post">
                Нова Пошта*
              </label>
              <input
                id="post"
                name="post"
                required
                placeholder="Відділення / Поштомат"
              />
            </div>

            <div className="order-form__field">
              <label htmlFor="address">
                Адреса доставки*
              </label>
              <input
                id="address"
                name="address"
                required
                placeholder="вул. Богдана Хмелінського"
                autoComplete="street-address"
              />
            </div>
          </div>

          {/* PRIMARY ACTION */}
          <button
            type="submit"
            className="order-form__submit"
          >
            Замовити
          </button>

          {/* SECONDARY ACTION */}
          <button
            type="button"
            className="order-modal__close"
            onClick={onClose}
            aria-label="Закрити форму"
          >
            Закрити
          </button>
        </form>
      </aside>
    </div>
  );
}
