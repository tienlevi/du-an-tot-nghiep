import { Outlet } from 'react-router';
import Header from '../_components/Main/Header/Header';
import Footer from '../_components/Main/Footer/Footer';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}
