import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';
import MainNav from './MainNav';

const MainLayout = () => (
  <>
    <MainHeader />
    <main className="flex h-[calc(100dvh-60px)]">
      <MainNav />
      <Outlet />
    </main>
    <div id="modal"></div>
  </>
);
export default MainLayout;
