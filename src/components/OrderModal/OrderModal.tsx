"use client";

import "./OrderModal.css";

export default function OrderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={`order-modal ${isOpen ? "order-modal--open" : ""}`}
      aria-hidden={!isOpen}
    >
      <div className="order-modal__backdrop" onClick={onClose} />

      <aside className="order-modal__panel" role="dialog" aria-modal="true">
        <button className="order-modal__close" onClick={onClose}>
          <span>×</span>
        </button>

        <h1 className="order-modal__title">Замовлення</h1>

        <h2 className="order-modal__subtitle">
          Введіть дані отримувача
        </h2>

        <form className="order-form">
          <div className="order-form__grid">
            <div className="order-form__field">
              <label>Ваше імʼя та прізвище*</label>
              <input placeholder="Ігорь Ручкин" />
            </div>

            <div className="order-form__field">
              <label>Телефон*</label>
              <input placeholder="+380 97 323 47 11" />
            </div>

            <div className="order-form__field">
              <label>Електронна пошта*</label>
              <input placeholder="igor.ruhkin@gmail.com" />
            </div>

            <div className="order-form__field">
              <label>Місто</label>
              <input placeholder="Київ / Львів / Вінниця" />
            </div>

            <div className="order-form__field">
              <label>Відділення / Поштомат Нової Пошти</label>
              <input placeholder="Відділення №18 або Поштомат №324" />
            </div>

            <div className="order-form__field">
              <label>Адреса доставки</label>
              <input placeholder="м. Київ, вул. Хрещатик, 12, кв. 34" />
            </div>
          </div>

          <button type="submit" className="order-form__submit">
            ЗАМОВИТИ
          </button>
        </form>
      </aside>
    </div>
  );
}
