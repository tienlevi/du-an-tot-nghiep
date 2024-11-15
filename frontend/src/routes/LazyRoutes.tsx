import Loader from '@/utils/Loader';
import React, { lazy } from 'react';
export const HomePage = lazy(() => import('@/pages/Client/HomePage/Homepage'));
export const ProductDetailPage = lazy(()=> import('@/pages/Client/ProductDetailsPage/Productdetails'))
export const ProfilePage = lazy(() => import('@/pages/Client/Account/Profile'));
export const MyOrdersPage = lazy(
    () => import('@/pages/Client/Account/MyOrders'),
);
export const MyOrderDetailsPage = lazy(
    () => import('@/pages/Client/Account/MyOrders/OrderDetail/OrderDetailPage'),
);
export const LoginPage = lazy(() => import('@/pages/Client/Auth/Login'));
export const RegisterPage = lazy(() => import('@/pages/Client/Auth/Register'));
export const ShippingPage = lazy(()=> import('@/pages/Client/Checkout/Shipping'))
// @admin page
export const DashboardPage = lazy(() => import('../pages/Admin/_dashboard_'));
export const ProductsListAll = lazy(() => import('@/pages/Admin/_product_'));

export const CreateProduct = lazy(
    () => import('@/pages/Admin/_product_/CreateProduct'),
);
// export const UpdateProduct = lazy(
//     () => import('@/pages/Admins/_product_/UpdateProduct'),
// );

// @suspense
export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};
