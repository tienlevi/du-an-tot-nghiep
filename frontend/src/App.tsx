import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import DashboardRoute from '@/routes/DashboardRoute';
import WebsiteRoute from './routes/WebsiteRoute';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <DashboardRoute />
      <WebsiteRoute />
    </>
  );
}

export default App;
