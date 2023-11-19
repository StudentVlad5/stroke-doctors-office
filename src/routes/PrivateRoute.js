import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const authorization_id = localStorage.getItem('authorization_id');
  return authorization_id ? Component : <Navigate to={redirectTo} />;
};
PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
