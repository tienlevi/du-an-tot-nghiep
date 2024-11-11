import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from '@/layouts/Protected/ProtectedRoute';

export const PrivateRoutes = [
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
  },
];
