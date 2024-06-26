import i18next from 'i18next';

import en from '../i18n/en';
import hin from '../i18n/hin';
import { authRoles } from 'src/app/auth';
import Dashboard from './Dashboard'

i18next.addResourceBundle('en', 'dashboardPage', en);
i18next.addResourceBundle('hin', 'dashboardPage', hin);

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.admin,
  routes: [
    {
      path: 'admin/dashboard',
      element: <Dashboard />,
    },
  ],
};

export default DashboardConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
*/
