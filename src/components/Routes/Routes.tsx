import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import { NAV_ITEMS } from '../../utils/constants';
import App from '../App/App';

const routes: RouteObject[] = ['', ...NAV_ITEMS].reduce(
  (acc: RouteObject[], cur: string) => {
    if (cur) {
      acc.push({
        path: `/${cur}`,
        element: <App query={cur} />,
      });
    } else {
      acc.push({
        path: '/',
        element: <Navigate to='/super' />,
      });
    }

    return acc;
  },
  []
);

const Routes = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routes;
