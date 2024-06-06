import { useEffect, useState } from 'react';
import {
  Outlet,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/Main';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import ProductsAdd from './pages/Products/ProductsAdd';
import ProductsList from './pages/Products/ProductsList';
import ProductsEdit from './pages/Products/ProductsEdit';
// Client
import Offer from './pages/Offer/Offer';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Payment from './pages/payment/Payment';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Journal from './pages/Journal/Journal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderBottom from './components/home/Header/HeaderBottom';
import SpecialCase from './components/SpecialCase/SpecialCase';
import Footer from './components/home/Footer/Footer';
import FooterBottom from './components/home/Footer/FooterBottom';
import Header from './components/home/Header/Header';

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
          path="/admin"
        />

        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        {/* Products */}
        <Route
          path="/products/productslist"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProductsList />
            </>
          }
        />
        <Route
          path="/products/productsadd"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProductsAdd />
            </>
          }
        />
        <Route
          path="/products/productsedit"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProductsEdit />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/category/:category" element={<Offer />} />
          <Route path="/product/:_id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/paymentgateway" element={<Payment />} />
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes>
    </>
  );
}

export default App;
