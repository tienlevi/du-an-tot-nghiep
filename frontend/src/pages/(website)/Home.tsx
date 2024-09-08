import Row1 from './components/Home/Row1';
import Deal from './components/Home/Deal';
import Categories from './components/Category/Categories';
import Services from './components/common/components/Services';
import Products from './components/Product/Products';
const Home = () => {
  return (
    <div dir="ltr" className="flex flex-col xl:mx-32 mt-28 gap-3">
      <Row1 />
      <Products />
      <Deal />
      <Categories />
      <Services />
    </div>
  );
};

export default Home;
