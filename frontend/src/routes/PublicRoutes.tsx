import { MAIN_ROUTES } from '@/constants/router';
import AccountLayout from '@/layouts/AccountLayout';
import MainLayout from '@/layouts/Mainlayout/MainLayout';
import NotFound from '@/pages/Client/NotFound';
import { Navigate } from 'react-router';
import {
    CheckoutPage,
    HomePage,
    LoginPage,
    MyOrderDetailsPage,
    MyOrdersPage,
    ProductDetailPage,
    ProfilePage,
    RegisterPage,
    ShippingPage,
    Suspense,
} from './LazyRoutes';

const PublicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: (
                    <Suspense>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: '/login',
                element: (
                    <Suspense>
                        <LoginPage />
                    </Suspense>
                ),
            },
            {
                path: '/register',
                element: (
                    <Suspense>
                        <RegisterPage />
                    </Suspense>
                ),
            },
            {
                path: 'products/:id',
                element: (
                    <Suspense>
                        <ProductDetailPage />
                    </Suspense>
                ),
            },
            {
                path: '/login',
                element: (
                    <Suspense>
                        <LoginPage />
                    </Suspense>
                ),
            },
            {
                path: '/register',
                element: (
                    <Suspense>
                        <RegisterPage />
                    </Suspense>
                ),
            },
            // @CheckOut
            {
                path: MAIN_ROUTES.SHIPPING,
                element: (
                    <Suspense>
                        <ShippingPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.CHECKOUT,
                element: (
                    <Suspense>
                        <CheckoutPage />
                    </Suspense>
                ),
            },

            // @Account
            {
                element: (
                    <Suspense>
                        {/* <AuthProtected> */}
                        <AccountLayout />
                        {/* </AuthProtected> */}
                    </Suspense>
                ),
                children: [
                    {
                        path: `${MAIN_ROUTES.PROFILE}`,
                        element: <ProfilePage />,
                    },
                    {
                        path: `${MAIN_ROUTES.MY_ORDERS}`,
                        element: <MyOrdersPage />,
                    },
                    {
                        path: `${MAIN_ROUTES.MY_ORDERS_DETAIL}`,
                        element: <MyOrderDetailsPage />,
                    },
                ],
            },
        ],
    },

    { path: '*', element: <Navigate to={'/404'} /> },
    { path: '/404', element: <NotFound /> },
];

export default PublicRoutes;
