import CartDrawer from '@/components/CartDrawer/CartDrawer';
import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';

export default function UserToolBar() {
  const isAuth = false;
  return (
    <div className="ml-12 flex items-center gap-8">
      {isAuth && (
        <>
          <Link to={'/'} className="flex flex-col items-center justify-center">
            <HeartOutlined className="text-2xl" />
            <span className="text-sm">Yêu thích</span>
          </Link>
          <Link
            to={'/auth/profile'}
            className="flex flex-col items-center justify-center"
          >
            <UserOutlined className="text-2xl" />
            <span className="text-sm">Tài khoản</span>
          </Link>
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
          <Link to={'/auth/register'} className="flex flex-col items-center justify-center">
            <UserAddOutlined className='text-2xl' />
            <span className="text-sm">Đăng ký</span>
          </Link>
          <Link
            to={'/auth/login'}
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
