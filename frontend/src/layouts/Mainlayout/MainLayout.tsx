import { Outlet } from 'react-router';
import Header from '../_components/Main/Header/Header';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
