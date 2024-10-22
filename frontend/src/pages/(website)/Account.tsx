import { Link, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const Account = () => {
  const { logOut } = useAuth();

  return (
    <div className="flex flex-col mx-4 md:ml-36 mt-48 gap-20 justify-center md:justify-between ">
      <div className="text-[32px] font-bold text-center">Account</div>
      <div className="flex flex-col md:flex-row gap-28">
        <nav className="flex flex-col gap-4 text-gray-400">
          <ul>
            <li className="px-4 py-2">
              <Link
                to="/account"
                className="hover:underline hover:underline-offset-8 ease-in-out duration-300 transform  focus:text-red-600"
              >
                My Frofile
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link
                to="/account/edit"
                className="hover:underline hover:underline-offset-8 ease-in-out duration-300 transform  focus:text-red-600"
              >
                Change Profile
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link
                to="/account/order"
                className="hover:underline hover:underline-offset-8 ease-in-out duration-300 transform  focus:text-red-600"
              >
                Đơn hàng
              </Link>
            </li>
            <li
              className="px-4 py-2 cursor-pointer"
              onClick={() => {
                logOut();
              }}
            >
              Logout
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
      {/* Snackbar for displaying success or error messages */}
    </div>
  );
};

export default Account;
