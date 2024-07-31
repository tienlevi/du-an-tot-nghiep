import { Route, Routes } from 'react-router-dom';
// website
import { CartProvider } from '@/context/CartContext';
import { LangProvider } from '@/context/LangContext';
import { WishlistProvider } from '@/context/WishlistContext';
import About from '@/pages/(website)/About';
import Account from '@/pages/(website)/Account';
import AllProducts from '@/pages/(website)/AllProducts';
import Cart from '@/pages/(website)/Cart';
import Category from '@/pages/(website)/Category';
import Checkout from '@/pages/(website)/Checkout';
import ScrollToTop from '@/pages/(website)/components/common/components/ScrollToTop';
import Contact from '@/pages/(website)/Contact';
import Home from '@/pages/(website)/Home';
import LogIn from '@/pages/(website)/LogIn';
import NotFound from '@/pages/(website)/NotFound';
import Payment from '@/pages/(website)/Payment';
import Product from '@/pages/(website)/Product';
import SignUpWebsite from '@/pages/(website)/SignUp';
import Wishlist from '@/pages/(website)/Wishlist';
import LayoutWebsite from '@/pages/(website)/Layout';

// Dashboard
import SignIn from '@/pages/(dashboard)/Authentication/SignIn';
import SignUp from '@/pages/(dashboard)/Authentication/SignUp';
import Calendar from '@/pages/(dashboard)/Calendar';
import Chart from '@/pages/(dashboard)/Chart';
import ECommerce from '@/pages/(dashboard)/Dashboard/Main';
import ProductsAdd from '@/pages/(dashboard)/Products/ProductsAdd';
import ProductsEdit from '@/pages/(dashboard)/Products/ProductsEdit';
import ProductsList from '@/pages/(dashboard)/Products/ProductsList';
import Profile from '@/pages/(dashboard)/Profile';
import Settings from '@/pages/(dashboard)/Settings';
import Tables from '@/pages/(dashboard)/Tables';
import PageTitle from '@/pages/(dashboard)/_components/PageTitle';

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
                <Route element={<AllProducts />} path="/allproducts" />
                <Route element={<Product />} path="/allProducts/:title" />
                {/* <Route element={<Category />} path="/category" /> */}
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
              {/* Products */}
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
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </LangProvider>
    </>
  );
}

export default DashboardRoute;
