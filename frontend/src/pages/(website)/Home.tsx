import Categories from './components/Category/Categories';
import Deal from './components/common/components/Deal';
import Services from './components/common/components/Services';
import ProductItem from './components/Product/ProductItem';
const Home = () => {
  return (
    <div dir="ltr" className="flex flex-col xl:mx-32 mt-28 gap-3">
      <ProductItem limitProduct={4} />
      <Deal />
      <Categories />
      <Services />
    </div>
  );
};

export default Home;
