import i18next from 'i18next';

// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import Profile from './Profile'
import { authRoles } from 'src/app/auth';

// i18next.addResourceBundle('en', 'HomePage', en);
// i18next.addResourceBundle('tr', 'HomePage', tr);
// i18next.addResourceBundle('ar', 'HomePage', ar);

const ProfileConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.both,
  routes: [
    {
      path: '/apps/profile',
      element: <Profile />,
    },
  ],
};

export default ProfileConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ProfileConfig = {
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

export default ProfileConfig;
*/
