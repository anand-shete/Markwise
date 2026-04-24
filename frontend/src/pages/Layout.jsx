import { Footer, Loader, Navbar } from '@/components';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

const Layout = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<Loader />} key={key}>
      <Navbar />
      <Outlet />
      <Footer />
    </Suspense>
  );
};

export default Layout;
