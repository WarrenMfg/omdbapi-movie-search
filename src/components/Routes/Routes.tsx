import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import App from '../App/App';

export const navItems = [
  'super',
  'cool',
  'nice',
  'sweet',
  'awesome',
  'dude',
  'favorites',
];

const routes: RouteObject[] = ['', ...navItems].reduce(
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
