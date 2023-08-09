import Home from '../../pages/home';
import { PrivateRoute } from '../utils';

const homeRoutes = [
  {
    path: '/home',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
];

export default homeRoutes;
