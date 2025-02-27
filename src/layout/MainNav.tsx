import { Link } from 'react-router-dom';

const MainNav = () => (
  <nav className="inline-block w-[300px]">
    <ul>
      <li>
        <Link to="/">캘린더</Link>
      </li>
    </ul>
  </nav>
);
export default MainNav;
