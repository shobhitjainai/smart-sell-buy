import i18next from 'i18next';
import hin from '../i18n/hin';
import en from '../i18n/en';
import { authRoles } from 'src/app/auth';
import Order from './Order'

i18next.addResourceBundle('en', 'productStatus', en);
i18next.addResourceBundle('hin', 'productStatus', hin);

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
