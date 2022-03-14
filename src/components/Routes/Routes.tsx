import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import { NAV_ITEMS, Query } from '../../state/types';
import App from '../App/App';

/**
 * Create routes array
 */
const routes: RouteObject[] = ['', ...NAV_ITEMS].reduce(
  (acc: RouteObject[], cur: Query | string) => {
    if (cur) {
      acc.push({
        path: `/${cur}`,
        element: <App query={cur as Query} />,
      });
    } else {
      // The empty string is used to add this redirect
      acc.push({
        path: '/',
        element: <Navigate to='/super' />,
      });
    }

    return acc;
  },
  []
);

/**
 * Dynamically return the desired component based on the route
 */
const Routes = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routes;
