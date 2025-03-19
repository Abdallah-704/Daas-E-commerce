import { Route } from 'react-router-dom';

export const RouteBuilder = ({ config }) => {
  const { layout: Layout, guard: Guard, guardProps, routes } = config;

  const renderRoute = (route) => {
    const Component = route.element;
    let element = <Component />;

    if (route.guard) {
      const RouteGuard = route.guard;
      element = <RouteGuard {...route.guardProps}>{element}</RouteGuard>;
    }

    return <Route key={route.path} path={route.path} element={element} />;
  };

  if (Guard) {
    return (
      <Route element={<Guard {...guardProps}>
        <Layout>{routes.map(renderRoute)}</Layout>
      </Guard>} />
    );
  }

  return <Route element={<Layout>{routes.map(renderRoute)}</Layout>} />;
}; 