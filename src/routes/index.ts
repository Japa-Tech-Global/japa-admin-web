import adminsRoutes from './admins';
import appointmentsRoutes from './appointments';
import artisansRoutes from './artisans';
import authenticationRoutes from './authentication';
import customersRoutes from './customer';
import disputesRoutes from './disputes';
import homeRoutes from './home';
import notificationsRoutes from './notifications';
import settingsRoutes from './settings';
import ticketsRoutes from './tickets';
import waitingListRoutes from './waitingList';

const routes: any[] = [
  ...authenticationRoutes,
  ...homeRoutes,
  ...adminsRoutes,
  ...customersRoutes,
  ...artisansRoutes,
  ...waitingListRoutes,
  ...ticketsRoutes,
  ...notificationsRoutes,
  ...settingsRoutes,
  ...appointmentsRoutes,
  ...disputesRoutes,
];

export default routes;
