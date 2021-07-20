import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

function RouteLayout({ route }: RouteConfig) {
  return <div style={{ overflow: 'auto' }}>{renderRoutes(route.routes)}</div>;
}

export default RouteLayout;
