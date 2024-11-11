import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/layouts/Protected/ProtectedRoute';
import { DashboardPage, Suspense } from './LazyRoutes';
import { ADMIN_ROUTES } from '@/constants/router';

export const PrivateRoutes = [
  {
    path: ADMIN_ROUTES.DASHBOARD,
    element: (
     // <ProtectedRoute>
        <AdminLayout />
     // </ProtectedRoute>
    ),
    children:[
      {
        index: true,
        element: (
            <Suspense>
                <DashboardPage />
            </Suspense>
        ),
    },
    ]
  },
];
