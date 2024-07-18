import { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Loader from '@/common/Loader';
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
// Client
import { ToastContainer } from 'react-toastify';
import PageTitle from '@/pages/(dashboard)/_components/PageTitle';

function DashboardRoute() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
          path="/products/productsedit/:id"
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
    </>
  );
}

export default DashboardRoute;
