import WaitingList from '../../pages/waitingList';
import { PrivateRoute } from '../utils';

const waitingListRoutes = [
  {
    path: '/waiting-list',
    element: (
      <PrivateRoute>
        <WaitingList />
      </PrivateRoute>
    ),
  },
];

export default waitingListRoutes;
