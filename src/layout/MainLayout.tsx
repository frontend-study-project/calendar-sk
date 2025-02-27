import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainNav from './MainNav';

const MainLayout = () => (
  <>
    <MainHeader />
    <div className="flex h-[calc(100dvh-60px)]">
      <MainNav />
      <Outlet />
    </div>
  </>
);
export default MainLayout;
