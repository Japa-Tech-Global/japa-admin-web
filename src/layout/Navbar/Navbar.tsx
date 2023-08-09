import { Link } from 'react-router-dom';
import Logo from '../../assets/brand/logo.svg';
import LogoSmall from '../../assets/brand/logo-small.svg';
import { useAppSelector } from '../../store/hooks';
import UserMenu from './UserMenu';

function Navbar() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <nav
      className='pt-0 pb-0 bg-white p-[25px] h-[80px] flex flex-row items-center fixed z-10 top-0 left-0 right-0'
      style={{ boxShadow: ' 0px 0px 11px rgba(0, 0, 0, 0.09)' }}
    >
      <div className='flex flex-row items-center justify-between w-full'>
        <Link to='/home'>
          <img
            src={Logo}
            alt='Landshop'
            className='cursor-pointer object-contain hidden md:block'
          />
          <img
            src={LogoSmall}
            alt='Landshop'
            className='cursor-pointer object-contain md:hidden h-[34.48px]'
          />
        </Link>

        {user && <UserMenu />}
      </div>
    </nav>
  );
}

export default Navbar;
