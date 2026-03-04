"use client";

import "./ProductHero.css";
import { useOrderModal } from "../../hooks/useOrderModal";
import OrderModal from "../OrderModal/OrderModal";

export default function ProductHero() {
  const orderModal = useOrderModal();

  return (
    <section className="product-hero">
      <div className="product-hero__overlay" />
      <div className="product-hero__flag product-hero__flag--left" />
      <div className="product-hero__flag product-hero__flag--right" />
      <div className="product-hero__container" />
      <OrderModal
        isOpen={orderModal.isOpen}
        onClose={orderModal.close}
      />
    </section>
  );
}
