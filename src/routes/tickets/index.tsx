import Tickets from '../../pages/tickets';
import { PrivateRoute } from '../utils';

const ticketsRoutes = [
  {
    path: '/tickets',
    element: (
      <PrivateRoute>
        <Tickets />
      </PrivateRoute>
    ),
  },
];

export default ticketsRoutes;
