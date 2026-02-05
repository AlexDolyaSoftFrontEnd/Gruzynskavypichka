"use client";

import "./ProductHero.css";

import { useOrderModal } from "../../hooks/useOrderModal";
import OrderModal from "../OrderModal/OrderModal";

export default function ProductHero() {
  const orderModal = useOrderModal();

  return (
    <section className="product-hero">
      <div className="product-hero__overlay" />

      <div className="product-hero__container" />

      <OrderModal
        isOpen={orderModal.isOpen}
        onClose={orderModal.close}
      />
    </section>
  );
}

