import { CartProvider } from '@/context/CartContext';
import { LangProvider } from '@/context/LangContext';
import { WishlistProvider } from '@/context/WishlistContext';
import i18n from '@/pages/(website)/components/common/components/LangConfig';
import Loading from '@/pages/(website)/components/common/components/Loading';
import ScrollToTop from '@/pages/(website)/components/common/components/ScrollToTop';
import Footer from '@/pages/(website)/components/Footer/Footer';
import Header from '@/pages/(website)/components/Header/Header';
import Home from '@/pages/(website)/Home';
import { Route, Routes } from 'react-router-dom';

function WebsiteRoute() {
  return (
    <>
      <div dir={i18n.t('dir')} className={i18n.t('font')}>
        <LangProvider>
          <CartProvider>
            <WishlistProvider>
              <>
                <Header />
                <Routes>
                  <Route index element={<Home />} path="/" />
                </Routes>
                <Footer />
                <ScrollToTop />
              </>
            </WishlistProvider>
          </CartProvider>
        </LangProvider>
      </div>
    </>
  );
}

export default WebsiteRoute;
