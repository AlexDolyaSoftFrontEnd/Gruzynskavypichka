"use client";

import { useState } from "react";
import OrderModal from "../OrderModal/OrderModal";
import "./Header.css";

export default function Header() {
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__logo">
            <h1 className="header__title">Кафе Хінкальня</h1>
            <span className="header__subtitle">Грузинські страви</span>
          </div>

          <button
            type="button"
            className="header__cta"
            onClick={() => setIsOrderOpen(true)}
          >
            Замовлення
          </button>
        </div>
      </header>

      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
      />
    </>
  );
}