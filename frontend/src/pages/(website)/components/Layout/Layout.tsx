import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import i18n from '../common/components/LangConfig';
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <div dir={i18n.t('dir')} className={i18n.t('font')}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
