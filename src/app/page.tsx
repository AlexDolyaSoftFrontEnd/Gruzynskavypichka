import { useMemo } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ProductHero from '../components/ProductHero/ProductHero';
import ProductsItems from '../components/ProductsItems/ProductsItems';

export default function Georgianbakery() {
  const content = useMemo(() => {
    return (
      <>
        <Header />
        <ProductHero />
        <ProductsItems />
        <Footer />
      </>
    );
  }, []);

  return content;
}
