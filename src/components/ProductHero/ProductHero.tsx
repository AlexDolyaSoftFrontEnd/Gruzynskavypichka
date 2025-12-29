import Image from "next/image";
import Link from "next/link";
import "./ProductHero.css";

type ProductHeroProps = {
  title: string;
  subtitle?: string;
  coverSrc: string;
  readHref: string;
  orderHref: string;
};

export default function ProductHero({
  title,
  subtitle,
  coverSrc,
  readHref,
  orderHref,
}: ProductHeroProps) {
  return (
    <section className="product-hero" aria-labelledby="product-title">
      <div className="product-hero__overlay" />

      <div className="product-hero__container">
        <article className="product-hero__card">
          <Image
            src={coverSrc}
            alt={title}
            width={420}
            height={620}
            priority
            className="product-hero__image"
          />

          <header className="product-hero__header">
            <h1 id="product-title" className="product-hero__title">
              {title}
            </h1>

            {subtitle && (
              <p className="product-hero__subtitle">{subtitle}</p>
            )}
          </header>
        </article>

        <footer className="product-hero__actions">
          <div className="product-hero__buttons">
            <Link
              href={readHref}
              className="product-hero__button product-hero__button--secondary"
            >
              Читати уривок
            </Link>

            <Link
              href={orderHref}
              className="product-hero__button product-hero__button--primary"
            >
              Замовити
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}
