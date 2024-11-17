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
export const CheckoutPage = lazy(() => import('@/pages/Client/Checkout/CheckOut'));
// @admin page
export const DashboardPage = lazy(() => import('../pages/Admin/_dashboard_'));
export const ProductsListAll = lazy(() => import('@/pages/Admin/_product_'));

export const CreateProduct = lazy(
    () => import('@/pages/Admin/_product_/CreateProduct'),
);
// export const UpdateProduct = lazy(
//     () => import('@/pages/Admins/_product_/UpdateProduct'),
// );
<<<<<<< HEAD

export const CategoryList = lazy(() => import('@/pages/Admin/_category_'));
export const CreateCategory = lazy(
    () => import('@/pages/Admin/_category_/CreateCategory'),
);
export const UpdateCategory = lazy(
    () => import('@/pages/Admin/_category_/UpdateCategory'),
);

export const ColorList = lazy(() => import('@/pages/Admin/_color_'));
export const CreateColor = lazy(
    () => import('@/pages/Admin/_color_/CreateColor'),
);
export const UpdateColor = lazy(
    () => import('@/pages/Admin/_color_/UpdateColor'),
);

export const SizeList = lazy(() => import('@/pages/Admin/_size_/'));
export const CreateSize = lazy(() => import('@/pages/Admin/_size_/CreateSize'));
export const UpdateSize = lazy(() => import('@/pages/Admin/_size_/UpdateSize'));

export const TagList = lazy(() => import('@/pages/Admin/_tag_/'));
export const CreateTag = lazy(() => import('@/pages/Admin/_tag_/CreateTag'));
export const UpdateTag = lazy(() => import('@/pages/Admin/_tag_/UpdateTag'));
=======
>>>>>>> FE/Shipping-test

// @suspense
export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};
