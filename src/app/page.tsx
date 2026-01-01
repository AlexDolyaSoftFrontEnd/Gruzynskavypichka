import Header from '../components/Header/Header';
import ProductHero from '../components/ProductHero/ProductHero';

export default function Molfar() {
  return (
    <>
      <Header />
      <ProductHero
      title="Розвідка"
      subtitle="Анонімності не існує"
      coverSrc="/images/book-cover.webp"
      readHref="https://cdn.prod.website-files.com/693fe2a28f9013337e54175d/694468921231f2ddef89779f_rozvidka_23-31.pdf"
    />
    </>
  );
}
