"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import OrderModal from "../OrderModal/OrderModal";
import "./Header.css";

/* =========================
   Interfaces
========================= */

interface NavItemProps {
  href: string;
  label: string;
  icon: string;
}

/* =========================
   Component
========================= */

export default function Header() {
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header__container">
          {/* Logo */}
          <Link href="/" className="header__logo">
            <Image
              src="/logo/logo.png"
              alt="Грузінська пекарня"
              className="header__logo-image"
            />
          </Link>

          {/* Navigation */}
          <nav className="header__nav">
            <NavItem href="/khachapuri" label="ХАЧАПУРІ" icon="/icons/khachapuri.png" />
            <NavItem href="/khinkali" label="ХІНКАЛІ" icon="/icons/khinkali.png" />
            <NavItem href="/shashlik" label="ШАШЛИК" icon="/icons/shashlik.png" />
            <NavItem href="/salat" label="САЛАТИ" icon="/icons/salat.png" />
            <NavItem href="/sup" label="СУПИ" icon="/icons/sup.png" />
            <NavItem href="/ryba" label="РИБА" icon="/icons/ryba.png" />
          </nav>

          {/* CTA */}
          <button
            type="button"
            className="header__cta"
            onClick={() => setIsOrderOpen(true)}
          >
            Для замовлення →
          </button>
        </div>
      </header>

      {/* Modal */}
      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
      />
    </>
  );
}

/* =========================
   Nav item
========================= */

function NavItem({ href, label, icon }: NavItemProps) {
  return (
    <Link href={href} className="header__link header__link--icon">
      <Image src={icon} alt={label} width={20} height={20} />
      <span>{label}</span>
    </Link>
  );
}
