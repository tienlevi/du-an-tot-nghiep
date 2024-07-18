import { CartProvider } from '@/context/CartContext';
import { LangProvider } from '@/context/LangContext';
import { WishlistProvider } from '@/context/WishlistContext';
import About from '@/pages/(website)/About';
import Account from '@/pages/(website)/Account';
import AllProducts from '@/pages/(website)/AllProducts';
import Cart from '@/pages/(website)/Cart';
import Category from '@/pages/(website)/Category';
import Checkout from '@/pages/(website)/Checkout';
import i18n from '@/pages/(website)/components/common/components/LangConfig';
import Loading from '@/pages/(website)/components/common/components/Loading';
import ScrollToTop from '@/pages/(website)/components/common/components/ScrollToTop';
import Footer from '@/pages/(website)/components/Footer/Footer';
import Header from '@/pages/(website)/components/Header/Header';
import Contact from '@/pages/(website)/Contact';
import Home from '@/pages/(website)/Home';
import LogIn from '@/pages/(website)/LogIn';
import NotFound from '@/pages/(website)/NotFound';
import Payment from '@/pages/(website)/Payment';
import Product from '@/pages/(website)/Product';
import SignUp from '@/pages/(website)/SignUp';
import Wishlist from '@/pages/(website)/Wishlist';
import { Route, Routes } from 'react-router-dom';

function WebsiteRoute() {
  return (
    <>
      <div dir={i18n.t('dir')} className={i18n.t('font')}>
        <LangProvider>
          <CartProvider>
            <WishlistProvider>
              <>
                <Header />
                <Routes>
                  <Route index element={<Home />} path="/" />
                  <Route element={<Contact />} path="/contact" />
                  <Route element={<Account />} path="/account" />
                  <Route element={<About />} path="/about" />
                  <Route element={<SignUp />} path="/signup" />
                  <Route element={<LogIn />} path="/login" />
                  <Route element={<Wishlist />} path="/wishlist" />
                  <Route element={<Cart />} path="/cart" />
                  <Route element={<Checkout />} path="/checkout" />
                  <Route element={<Payment />} path="/payment" />
                  <Route element={<AllProducts />} path="/all-products" />
                  <Route element={<Product />} path="/allProducts/:title" />
                  <Route element={<Category />} path="/category" />
                  <Route element={<NotFound />} path="*" />
                </Routes>
                <Footer />
                <ScrollToTop />
              </>
            </WishlistProvider>
          </CartProvider>
        </LangProvider>
      </div>
    </>
  );
}

export default WebsiteRoute;
