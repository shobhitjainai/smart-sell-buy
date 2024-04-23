// import i18next from 'i18next';

// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import { authRoles } from 'src/app/auth';
import  SellProductSubcategory from './SellProductSubCategory'

// i18next.addResourceBundle('en', 'HomePage', en);
// i18next.addResourceBundle('tr', 'HomePage', tr);
// i18next.addResourceBundle('ar', 'HomePage', ar);

const SellProductSubCategoryConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.both,
  routes: [
    {
      path: 'sellproductsubcategory/:id',
      element: <SellProductSubcategory />,
    },
  ],
};

export default SellProductSubCategoryConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const SellProductSubCategoryConfig = {
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

export default SellProductSubCategoryConfig;
*/
