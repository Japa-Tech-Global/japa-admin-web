import Home from '../../pages/home';
import ErrorPage from '../../pages/ErrorPage';
import Login from '../../pages/auth/Login';
import { PrivateRoute, ProtectedRoute } from '../utils';
import { UserType } from '../../types/user';
import { getSessionDetails } from '../../functions/userSession';
import ForgotPassword from '../../pages/auth/ForgotPassword';
import ResetPassword from '../../pages/auth/ResetPassword';
import VerifyAccount from '../../pages/auth/VerifyAccount';

const currentUser: UserType | null = getSessionDetails();

const authenticationRoutes = [
  {
    path: '/',
    element: !currentUser ? <Login /> : <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectedRoute>
        <ForgotPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: '/reset-password/:email',
    element: (
      <ProtectedRoute>
        <ResetPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: '/verify-account',
    element: (
      <PrivateRoute>
        <VerifyAccount />
      </PrivateRoute>
    ),
  },
];

export default authenticationRoutes;
