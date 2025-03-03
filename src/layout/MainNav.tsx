import { Link } from 'react-router-dom';

const MainNav = () => (
  <nav className="inline-block w-[300px] p-[20px] border-box border-r border-gray-300 text-[18px]">
    <ul>
      <li>
        <Link to="/">캘린더</Link>
      </li>
    </ul>
  </nav>
);
export default MainNav;
