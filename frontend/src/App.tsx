import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import DashboardRoute from '@/routes/DashboardRoute';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <DashboardRoute />
    </>
  );
}

export default App;
