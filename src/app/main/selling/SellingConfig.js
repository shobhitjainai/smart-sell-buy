// import i18next from 'i18next';

// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import { authRoles } from "src/app/auth";
import Selling from "./Selling";

// i18next.addResourceBundle('en', 'HomePage', en);
// i18next.addResourceBundle('tr', 'HomePage', tr);
// i18next.addResourceBundle('ar', 'HomePage', ar);

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
