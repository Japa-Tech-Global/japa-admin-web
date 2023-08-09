import Disputes from '../../pages/disputes';
import { PrivateRoute } from '../utils';

const disputesRoutes = [
  {
    path: '/disputes',
    element: (
      <PrivateRoute>
        <Disputes />
      </PrivateRoute>
    ),
  },
];

export default disputesRoutes;
