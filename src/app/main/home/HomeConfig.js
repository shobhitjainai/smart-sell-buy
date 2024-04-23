import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import Home from './Home';
import { authRoles } from 'src/app/auth';

i18next.addResourceBundle('en', 'HomePage', en);
i18next.addResourceBundle('tr', 'HomePage', tr);
i18next.addResourceBundle('ar', 'HomePage', ar);

const HomeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.user,
  routes: [
    {
      path: 'user/home',
      element: <Home />,
    },
  ],
};

export default HomeConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const HomeConfig = {
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

export default HomeConfig;
*/
