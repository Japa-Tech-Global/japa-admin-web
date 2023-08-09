import Appointments from '../../pages/appointments';
import { PrivateRoute } from '../utils';

const appointmentsRoutes = [
  {
    path: '/appointments',
    element: (
      <PrivateRoute>
        <Appointments />
      </PrivateRoute>
    ),
  },
];

export default appointmentsRoutes;
