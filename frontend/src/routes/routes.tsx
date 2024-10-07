import { Route, Routes } from 'react-router-dom';
// website
import { CartProvider } from '@/context/CartContext';
import { LangProvider } from '@/context/LangContext';
import { WishlistProvider } from '@/context/WishlistContext';
import About from '@/pages/(website)/About';
import Account from '@/pages/(website)/Account';
import Cart from '@/pages/(website)/Cart';
import Products from '@/pages/(website)/Products';
// import Category from '@/pages/(website)/Category';
import Checkout from '@/pages/(website)/Checkout';
import ScrollToTop from '@/pages/(website)/components/common/components/ScrollToTop';
import Contact from '@/pages/(website)/Contact';
import Home from '@/pages/(website)/Home';
import LayoutWebsite from '@/pages/(website)/Layout';
import LogIn from '@/pages/(website)/LogIn';
import NotFound from '@/pages/(website)/NotFound';
import Payment from '@/pages/(website)/Payment';
import Product from '@/pages/(website)/Product';
import SearchProducts from '@/pages/(website)/Search';
import SignUpWebsite from '@/pages/(website)/SignUp';
import Wishlist from '@/pages/(website)/Wishlist';

// dashboard
import PageTitle from '@/pages/(dashboard)/_components/PageTitle';
import Calendar from '@/pages/(dashboard)/Calendar';
import CategoryAdd from '@/pages/(dashboard)/CategoryAdd';
import CategoryEdit from '@/pages/(dashboard)/CategoryEdit';
import CategoryList from '@/pages/(dashboard)/CategoryList';
import ECommerce from '@/pages/(dashboard)/Main';
import ProductsAdd from '@/pages/(dashboard)/ProductsAdd';
import ProductsEdit from '@/pages/(dashboard)/ProductsEdit';
import ProductsList from '@/pages/(dashboard)/ProductsList';
import Profile from '@/pages/(dashboard)/Profile';

function DashboardRoute() {
  return (
    <>
      <ScrollToTop />
      <LangProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              <Route element={<LayoutWebsite />}>
                <Route index element={<Home />} path="/" />
                <Route element={<Contact />} path="/contact" />
                <Route element={<Account />} path="/account" />
                <Route element={<About />} path="/about" />
                <Route element={<SignUpWebsite />} path="/signup" />
                <Route element={<LogIn />} path="/login" />
                <Route element={<Wishlist />} path="/wishlist" />
                <Route element={<Cart />} path="/cart" />
                <Route element={<Checkout />} path="/checkout" />
                <Route element={<Payment />} path="/payment" />
                <Route element={<Products />} path="/products" />
                <Route element={<Product />} path="/allProducts/:title" />
                <Route element={<SearchProducts />} path="/search" />
                {/* <Route element={<Category />} path="/category" />  */}
                <Route element={<NotFound />} path="*" />
              </Route>
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
              <Route
                path="/products/list"
                element={
                  <>
                    <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <ProductsList />
                  </>
                }
              />
              <Route
                path="/products/add"
                element={
                  <>
                    <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <ProductsAdd />
                  </>
                }
              />
              <Route
                path="/products/edit/:id"
                element={
                  <>
                    <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <ProductsEdit />
                  </>
                }
              />
              <Route
                path="/category/list"
                element={
                  <>
                    <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <CategoryList />
                  </>
                }
              />
              <Route
                path="/category/add"
                element={
                  <>
                    <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <CategoryAdd />
                  </>
                }
              />
              <Route
                path="/category/edit/:id"
                element={
                  <>
                    <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <CategoryEdit />
                  </>
                }
              />
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </LangProvider>
    </>
  );
}

export default DashboardRoute;
