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
            <p>Кафе Хінкальня</p>
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