import i18next from 'i18next';
import en from '../../admin-role/i18n/en';
import hin from '../../admin-role/i18n/hin';
import Profile from './Profile'
import { authRoles } from 'src/app/auth';
i18next.addResourceBundle('en', 'profilePage', en);
i18next.addResourceBundle('hin', 'profilePage', hin);

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
