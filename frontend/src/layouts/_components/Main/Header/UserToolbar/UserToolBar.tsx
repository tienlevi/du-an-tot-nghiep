import CartDrawer from '@/components/CartDrawer';
import { doLogout } from '@/store/slice/authSlice';
import { useAppDispatch, useTypedSelector } from '@/store/store';
import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Dropdown } from 'antd';
import { MenuProps } from 'antd/lib';
import { Link } from 'react-router-dom';

export default function UserToolBar() {
  const isAuth = useTypedSelector((state) => state.auth.authenticate);
  const dispatch = useAppDispatch()
  const isAdmin = useTypedSelector(state=> state.auth.user?.role === 'admin')
  const items: MenuProps['items'] = [
    ...(isAdmin ? [{
      label: <Link to={'/admin/dashboard'} className='text-global'>Quản trị</Link>,
      key: 'admin-dashboard',
    }] : []),
    {
      label: <Link to={'/auth/profile'} className='text-global'>Thông tin</Link>,
      key: 'profile-info',
    },
    {
      label: <Link to={'/auth/orders'} className='text-global'>Đơn hàng</Link>,
      key: 'orders',
    },
    {
      type: 'divider',
    },
    {
      label: <button onClick={() => dispatch(doLogout())}>Đăng xuất</button>,
      key: 'logout',
    },
  ];
  return (
    <div className="ml-12 flex items-center gap-8">
      {isAuth && (
        <>
          <Link to={'/'} className="flex flex-col items-center justify-center">
            <HeartOutlined className="text-2xl" />
            <span className="text-sm">Yêu thích</span>
          </Link>
          <Dropdown menu={{ items }} trigger={['click']} placement='bottom' className='cursor-pointer'  overlayClassName='border-[1px] w-[150px] border-global  rounded-lg'>
            <div
              className="flex flex-col items-center justify-center"
            >
              <UserOutlined className="text-2xl" />
              <span className="text-sm">Tài khoản</span>
            </div>
          </Dropdown>

          <CartDrawer>
            <span className="flex flex-col items-center justify-center">
              <Badge count={1} overflowCount={10}>
                <ShoppingCartOutlined className="text-2xl" />
              </Badge>
              <span className="text-sm">Giỏ hàng</span>
            </span>
          </CartDrawer>
        </>
      )}
      {!isAuth && (
        <>
          <Link
            to={'/register'}
            className="flex flex-col items-center justify-center"
          >
            <UserAddOutlined className="text-2xl" />
            <span className="text-sm">Đăng ký</span>
          </Link>
          <Link
            to={'/login'}
            className="flex flex-col items-center justify-center"
          >
            <UserOutlined className="text-2xl" />
            <span className="text-sm">Đăng nhập</span>
          </Link>
          <span className="flex flex-col items-center justify-center">
            <ShoppingCartOutlined className="text-2xl" />
            <span className="text-sm pointer-events-none">Giỏ hàng</span>
          </span>
        </>
      )}
    </div>
  );
}
