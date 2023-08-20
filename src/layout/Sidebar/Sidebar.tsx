import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { signOut } from '../../store/slices/user';
import { mainLinks, navItemType, preferencesLinks } from '../navLinks';
import styles from '../styles.module.css';
import { LogoutIcon } from '../navIcons';
import Logo from '../../assets/brand/logo.svg';

function Sidebar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkRouteMatch = (route: string) => {
    const path = location.pathname;
    return path.includes(route);
  };

  const logoutUser = () => {
    dispatch(signOut());
    navigate('/auth/login');
  };

  return (
    <nav className='w-[25vw] pb-5 max-h-screen sticky top-0 bottom-0 hidden lg:block bg-primary overflow-y-auto customized-scrollbar h-screen'>
      <div className='py-[39px] flex justify-center'>
        <Link to='/dashboard'>
          <img
            src={Logo}
            alt='Japa'
            className='cursor-pointer object-contain hidden md:block w-full h-auto'
          />
        </Link>
      </div>
      <ul className='flex flex-col px-4'>
        <p className='text-primaryLight font-medium text-sm font-secondary mx-4 mb-[10px]'>
          Main Menu
        </p>
        <div className='flex flex-col gap-2 mb-[56px]'>
          {mainLinks.map((item: navItemType) => (
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
          ))}
        </div>
        <p className='text-primaryLight font-medium text-sm font-secondary mx-4 mb-[10px]'>
          Preferences
        </p>
        <div className='flex flex-col gap-2 mb-[56px]'>
          {preferencesLinks.map((item: navItemType) => (
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
          ))}
        </div>
        <li className={styles.navLink} onClick={logoutUser}>
          <LogoutIcon />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
