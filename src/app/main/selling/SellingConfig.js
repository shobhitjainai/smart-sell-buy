import i18next from 'i18next';

import en from './i18n/en';
import hin from './i18n/hin';
import { authRoles } from "src/app/auth";
import Selling from "./Selling";

i18next.addResourceBundle('en', 'sellingPage', en);
i18next.addResourceBundle('hin', 'sellingPage', hin);

const SellingConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.user,
  routes: [
    {
      path: '/user/selling',
      element: <Selling />,
    },
  ],
};

export default SellingConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const SellingConfig = {
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

export default SellingConfig;
*/
