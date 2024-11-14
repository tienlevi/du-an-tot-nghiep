import MainLayout from '@/layouts/Mainlayout/MainLayout';
import NotFound from '@/pages/Client/NotFound';
import { Navigate } from 'react-router';
import {
    HomePage,
    MyOrderDetailsPage,
    MyOrdersPage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    Suspense,
} from './LazyRoutes';
import ProductDetailsPage from '@/pages/Client/ProductDetailsPage/Productdetails';
import AdminLayout from '@/layouts/AdminLayout';
import AccountLayout from '@/layouts/AccountLayout';
import { MAIN_ROUTES } from '@/constants/router';

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
                        <ProductDetailsPage />
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

    { path: '/admin', element: <AdminLayout /> },
    { path: '*', element: <Navigate to={'/404'} /> },
    { path: '/404', element: <NotFound /> },
];

export default PublicRoutes;
