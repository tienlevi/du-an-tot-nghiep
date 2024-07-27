import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import Router from '@/routes/routes';
import Loader from '@/common/Loader';

const queryClient = new QueryClient();

function App() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
