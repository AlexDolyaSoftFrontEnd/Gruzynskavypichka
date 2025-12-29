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
      readHref="/read"
      orderHref="/order"
    />
    </>
  );
}
