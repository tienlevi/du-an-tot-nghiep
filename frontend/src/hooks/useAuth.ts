import { User } from '@/types/user';
import { useEffect, useState } from 'react';

function useAuth() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('user')!);
    setUser(value);
  }, []);

  const logOut = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return { user, setUser, logOut };
}

export default useAuth;
