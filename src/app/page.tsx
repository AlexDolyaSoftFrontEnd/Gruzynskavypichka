import { type FC } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ProductHero from '../components/ProductHero/ProductHero';
import ProductsItems from '../components/ProductsItems/ProductsItems';

export const GeorgianBakery: FC = () => {
  return (
    <>
      <Header />
      <ProductHero />
      <ProductsItems />
      <Footer />
    </>
  );
};

export default GeorgianBakery;