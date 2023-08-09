import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { navItemType } from '../navLinks';
import styles from '../styles.module.css';
import autoAnimate from '@formkit/auto-animate';
import { DropdownIcon } from '../navIcons';

const Dropdown = ({ item }: { item: navItemType }) => {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const parentRef = useRef(null);

  const checkRouteMatch = (route: string) => {
    const path = location.pathname;
    return path.includes(route);
  };

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
  return (
    <div onClick={() => setOpen(!open)} ref={parentRef}>
      <div className={checkRouteMatch(item.href) ? styles.activeNavLink : styles.navLink}>
        {item.icon}
        <span>{item.label}</span>
        <DropdownIcon
          className={
            styles.navIcon + ' duration-500 ' + (open ? 'rotate-180' : 'rotate-0')
          }
        />
      </div>
      {open && (
        <ul>
          {item.dropdownLinks?.map((link) => (
            <Link key={link.href} to={link.href}>
              <li className={styles.dropdown}>
                <span>{link.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
