import Customers from '../../pages/customers';
import CustomerRatings from '../../pages/customers/Ratings';
import { PrivateRoute } from '../utils';

const customersRoutes = [
  {
    path: '/customers',
    element: (
      <PrivateRoute>
        <Customers />
      </PrivateRoute>
    ),
  },
  {
    path: '/customers/ratings',
    element: (
      <PrivateRoute>
        <CustomerRatings />
      </PrivateRoute>
    ),
  },
];

export default customersRoutes;
