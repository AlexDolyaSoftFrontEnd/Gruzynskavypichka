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
          <div className="header__logo">
            <Image
              src="/logo/logo.png"
              alt="Грузинська пекарня"
              height={100}
              width={100}
              style={{ width: 'auto', height: 'auto' }}
            />
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
    <div className="header__link header__link--icon">
      <Image 
        src={icon} 
        alt={label} 
        width={20} 
        height={20} 
        style={{ width: 'auto', height: 'auto' }}
      />
      <span>{label}</span>
    </div>
  );
}
