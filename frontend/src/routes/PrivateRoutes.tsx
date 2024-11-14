import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/layouts/Protected/ProtectedRoute';
import {
    CreateProduct,
    DashboardPage,
    ProductsListAll,
    Suspense,
    // UpdateProduct,
} from './LazyRoutes';
import { ADMIN_ROUTES } from '@/constants/router';
import { Outlet } from 'react-router-dom';

export const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            // <ProtectedRoute>
            <AdminLayout />
            // </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense>
                        <DashboardPage />
                    </Suspense>
                ),
            },
            {
                path: ADMIN_ROUTES.PRODUCTS,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductsListAll />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',

                        element: (
                            <Suspense>
                                <ProductsListAll />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateProduct />
                            </Suspense>
                        ),
                    },
                    // {
                    //     path: ':id/edit',
                    //     element: (
                    //         <Suspense>
                    //             <UpdateProduct />
                    //         </Suspense>
                    //     ),
                    // },
                ],
            },
        ],
    },
];
