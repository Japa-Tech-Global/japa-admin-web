import {
  AdminsIcon,
  AppointmentIcon,
  ArtisanIcon,
  CustomerIcon,
  DisputeIcon,
  HomeIcon,
  NotificationIcon,
  SettingIcon,
  TicketIcon,
  WaitingListIcon,
} from './navIcons';
import styles from './styles.module.css';

export interface navItemType {
  label: string;
  href: string;
  icon?: any;
  type?: 'link' | 'dropdown';
  dropdownLinks?: {
    label: string;
    href: string;
  }[];
}

const navLinks: navItemType[] = [
  {
    label: 'Home',
    href: '/home',
    icon: <HomeIcon className={styles.navIcon} />,
  },
  {
    label: 'Artisans',
    href: '/artisans',
    icon: <ArtisanIcon className={styles.navIcon} />,
    type: 'dropdown',
    dropdownLinks: [
      {
        label: 'All Artisans',
        href: '/artisans',
      },
      {
        label: 'Categories',
        href: '/artisans/categories',
      },
    ],
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: <CustomerIcon className={styles.navIcon} />,
    type: 'dropdown',
    dropdownLinks: [
      {
        label: 'All Customers',
        href: '/customers',
      },
      {
        label: 'Customer Ratings',
        href: '/customers/ratings',
      },
    ],
  },
  {
    label: 'Waiting List',
    href: '/waiting-list',
    icon: <WaitingListIcon className={styles.navIcon} />,
  },
  {
    label: 'Appointments',
    href: '/appointments',
    icon: <AppointmentIcon className={styles.navIcon} />,
  },
  {
    label: 'Disputes',
    href: '/disputes',
    icon: <DisputeIcon className={styles.navIcon} />,
  },
  {
    label: 'Tickets',
    href: '/tickets',
    icon: <TicketIcon className={styles.navIcon} />,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: <NotificationIcon className={styles.navIcon} />,
  },
  {
    label: 'Admins',
    href: '/admins',
    icon: <AdminsIcon className={styles.navIcon} />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <SettingIcon className={styles.navIcon} />,
  },
];

export default navLinks;
