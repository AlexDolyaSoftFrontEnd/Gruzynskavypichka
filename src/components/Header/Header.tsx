"use client";

import { useState } from "react";
import Image from "next/image";
import OrderModal from "../OrderModal/OrderModal";
import "./Header.css";

interface NavItemProps {
  label: string;
  icon: string;
}

export default function Header() {
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header__container">
          {/* Текстовый логотип */}
          <div className="header__logo">
            <span className="header__logo-text">Хінкальня</span>
          </div>

          <nav className="header__nav">
            <NavItem label="ХАЧАПУРІ" icon="/icons/khachapuri.png" />
            <NavItem label="ХІНКАЛІ" icon="/icons/khinkali.png" />
            <NavItem label="ШАШЛИК" icon="/icons/shashlik.png" />
            <NavItem label="САЛАТИ" icon="/icons/salat.png" />
            <NavItem label="СУПИ" icon="/icons/sup.png" />
            <NavItem label="РИБА" icon="/icons/ryba.png" />
          </nav>

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

function NavItem({ label, icon }: NavItemProps) {
  return (
    <a href="#" className="header__link">
      <Image 
        src={icon} 
        alt="icon" 
        className="header__icon"
        width={20} 
        height={20} 
      />
      <span>{label}</span>
    </a>
  );
}