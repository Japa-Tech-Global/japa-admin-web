import Artisans from '../../pages/artisans';
import ArtisanCategory from '../../pages/artisans/category';
import { PrivateRoute } from '../utils';

const artisansRoutes = [
  {
    path: '/artisans',
    element: (
      <PrivateRoute>
        <Artisans />
      </PrivateRoute>
    ),
  },
  {
    path: '/artisans/categories',
    element: (
      <PrivateRoute>
        <ArtisanCategory />
      </PrivateRoute>
    ),
  },
];

export default artisansRoutes;
