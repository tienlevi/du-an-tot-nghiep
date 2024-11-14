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
                path: 'products/:id',
                element: (
                    <Suspense>
                        <ProductDetailsPage />
                    </Suspense>
                ),
            },
            // @Account
            {
                path: 'account',
                element: (
                    <Suspense>
                        {/* <AuthProtected> */}
                        <AccountLayout />
                        {/* </AuthProtected> */}
                    </Suspense>
                ),
                children: [
                    { path: '', element: <ProfilePage /> },
                    { path: 'my-orders', element: <MyOrdersPage /> },
                    {
                        path: 'my-orders/:id',
                        element: <MyOrderDetailsPage />,
                    },
                ],
            },
        ],
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

    { path: '/admin', element: <AdminLayout /> },
    { path: '*', element: <Navigate to={'/404'} /> },
    { path: '/404', element: <NotFound /> },
];

export default PublicRoutes;
