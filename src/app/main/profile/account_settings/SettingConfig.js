import i18next from 'i18next';

// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import Setting from './Setting'

// i18next.addResourceBundle('en', 'HomePage', en);
// i18next.addResourceBundle('tr', 'HomePage', tr);
// i18next.addResourceBundle('ar', 'HomePage', ar);

const SettingConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/profile/account-settings',
      element: <Setting />,
    },
  ],
};

export default SettingConfig;

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
