// import i18next from 'i18next';

// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import { authRoles } from 'src/app/auth';
import Product from './Product';

// i18next.addResourceBundle('en', 'HomePage', en);
// i18next.addResourceBundle('tr', 'HomePage', tr);
// i18next.addResourceBundle('ar', 'HomePage', ar);

const ProductConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: 'user/products',
      element: <Product />,
    },
  ],
};

export default ProductConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ProductConfig = {
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

export default ProductConfig;
*/
