// import i18next from 'i18next';

// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import { authRoles } from 'src/app/auth';
import Order from './Order'

// i18next.addResourceBundle('en', 'examplePage', en);
// i18next.addResourceBundle('tr', 'examplePage', tr);
// i18next.addResourceBundle('ar', 'examplePage', ar);

const OrderConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.admin,
  routes: [
    {
      path: '/Order',
      element: <Order />,
    },
  ],
};

export default OrderConfig;

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
