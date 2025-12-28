"use client";

import Link from "next/link";
import { useState } from "react";
import { useOrderModal } from "../../hooks/useOrderModal";
import OrderModal from "../OrderModal/OrderModal";
import "./Header.css";

export default function Header() {
  const orderModal = useOrderModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`header ${isMenuOpen ? "header--menu-open" : ""}`}>
        <div className="header__container">
          <Link href="/" className="header__logo" onClick={closeMenu}>
            <span className="header__logo-text">
              MOLFAR <br />
              <small>— інститут розвідки</small>
            </span>
          </Link>

          <nav className="header__nav">
            <Link href="#trust" className="header__link" onClick={closeMenu}>Довіра</Link>
            <Link href="#partners" className="header__link" onClick={closeMenu}>Партнери</Link>
            <Link href="#author" className="header__link" onClick={closeMenu}>Автор</Link>
            <Link href="#read" className="header__link" onClick={closeMenu}>Читати</Link>
          </nav>

          <div className="header__actions">
            <button
              className="header__cta"
              onClick={() => {
                closeMenu();
                orderModal.open();
              }}
            >
              ЗАМОВИТИ
            </button>

            <button
              className="header__burger"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(v => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <OrderModal
        isOpen={orderModal.isOpen}
        onClose={orderModal.close}
      />
    </>
  );
}
