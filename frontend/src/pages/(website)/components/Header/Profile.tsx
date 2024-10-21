/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiHeart, CiShoppingCart, CiUser } from 'react-icons/ci';
const Profile = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const handleClick = () => {
    setOpen(!open);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('user')!);
    setUser(value);
  }, []);

  return (
    <div className="flex justify-between md:justify-around items-center md:gap-4 md:ml-4 ">
      <Link to="/wishlist" className="px-2 cursor-pointer">
        <CiHeart className="" style={{ fontSize: 30 }} />
      </Link>
      <Link to="/cart" className="px-2 cursor-pointer">
        <CiShoppingCart style={{ fontSize: 30 }} />
      </Link>
      <div className="px-2 cursor-pointer">
        <CiUser style={{ fontSize: 30 }} onClick={handleClick} />
      </div>
      <div
        className={`absolute top-full p-2 bg-[rgba(31,31,31,0.5)] ${open ? 'block' : 'hidden'} z-20`}
      >
        <div className="flex flex-col">
          <Link className="text-[18px] p-4 text-white" to={`/account`}>
            Hello {user?.name}
          </Link>
          <div
            className="text-[18px] p-4 text-white cursor-pointer"
            onClick={logOut}
          >
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
