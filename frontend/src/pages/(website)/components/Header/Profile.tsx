/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartShopping, FaUser, FaHeart } from 'react-icons/fa6';
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
        <FaHeart style={{ fontSize: 20 }} />
      </Link>
      <Link to="/cart" className="px-2 cursor-pointer">
        <FaCartShopping style={{ fontSize: 20 }} />
      </Link>
      <div className="px-2 cursor-pointer">
        <FaUser style={{ fontSize: 20 }} onClick={handleClick} />
      </div>
      <div
        className={`absolute top-full p-2 bg-[rgba(31,31,31,0.5)] ${open ? 'block' : 'hidden'} z-20`}
      >
        <div className="flex flex-col">
          <div className="text-[18px] p-4 text-white">Hello {user?.name}</div>
          <Link className="text-[18px] p-4 text-white" to={`/account`}>
            My Account
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
