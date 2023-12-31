import { Link } from 'react-router-dom';
import LogoSmall from '../../assets/brand/logo-small.svg';
import UserMenu from './UserMenu';

function Navbar() {
  return (
    <nav className=' bg-primary px-[25px] h-[70px] flex flex-row items-center sticky z-10 top-0'>
      <div className='flex flex-row items-center justify-between w-full'>
        <Link to='/dashboard'>
          <img
            src={LogoSmall}
            alt='Japa'
            className='cursor-pointer object-contain lg:hidden h-[34.48px]'
          />
        </Link>

        <UserMenu />
      </div>
    </nav>
  );
}

export default Navbar;
