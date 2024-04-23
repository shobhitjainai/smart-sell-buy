// import i18next from 'i18next';

// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import { authRoles } from 'src/app/auth';
import  Subcategory from './SubCategory'

// i18next.addResourceBundle('en', 'HomePage', en);
// i18next.addResourceBundle('tr', 'HomePage', tr);
// i18next.addResourceBundle('ar', 'HomePage', ar);

const SubCategoryConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.user,
  routes: [
    {
      path: 'subcategory/:id',
      element: <Subcategory />,
    },
  ],
};

export default SubCategoryConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const SubCategoryConfig = {
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

export default SubCategoryConfig;
*/
