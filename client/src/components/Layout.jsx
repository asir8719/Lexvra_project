import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StarryBackground from './StarryBackground';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      {!isHome && <StarryBackground />}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
