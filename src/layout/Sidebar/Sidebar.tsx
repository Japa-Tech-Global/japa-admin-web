import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signOut } from '../../store/slices/user';
import navLinks, { navItemType } from '../navLinks';
import styles from '../styles.module.css';
import { LogoutIcon } from '../navIcons';
import Dropdown from './Dropdown';

function Sidebar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  const checkRouteMatch = (route: string) => {
    const path = location.pathname;
    return path.includes(route);
  };

  const logoutUser = () => {
    dispatch(signOut());
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className='w-[240px] text-black pt-[25px] pb-5 h-[calc(100vh-80px)] sticky top-[80px] hidden lg:block bg-white overflow-y-auto'>
      <ul className='flex flex-col h-full gap-[15px]'>
        {navLinks.map((item: navItemType) =>
          item.type !== 'dropdown' ? (
            <Link key={item.href} to={item.href}>
              <li
                className={
                  checkRouteMatch(item.href) ? styles.activeNavLink : styles.navLink
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            </Link>
          ) : (
            <Dropdown key={item.href} item={item} />
          )
        )}
        <li
          className={`p-3 pl-[25px] cursor-pointer hover:bg-[#EBF2FF] font-medium text-lg flex gap-[22px] items-center mt-auto  text-error`}
          onClick={logoutUser}
        >
          <LogoutIcon />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
