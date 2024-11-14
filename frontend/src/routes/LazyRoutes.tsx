import Loader from '@/utils/Loader';
import React, { lazy } from 'react';
export const HomePage = lazy(() => import('@/pages/Client/HomePage/Homepage'));
export const ProfilePage = lazy(() => import('@/pages/Client/Account/Profile'));
export const MyOrdersPage = lazy(
    () => import('@/pages/Client/Account/MyOrders'),
);
export const MyOrderDetailsPage = lazy(
    () => import('@/pages/Client/Account/MyOrders/OrderDetail/OrderDetailPage'),
);
export const LoginPage = lazy(() => import('@/pages/Client/Auth/Login'));
export const RegisterPage = lazy(() => import('@/pages/Client/Auth/Register'));

// @admin page
export const DashboardPage = lazy(() => import('../pages/Admin/_dashboard_'));

// @suspense
export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};
