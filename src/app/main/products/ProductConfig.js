import i18next from 'i18next';

import en from '../selling/i18n/en';
import hin from '../selling/i18n/hin';
import { authRoles } from 'src/app/auth';
import Product from './Product';

i18next.addResourceBundle('en', 'productsPage', en);
i18next.addResourceBundle('hin', 'productsPage', hin);

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
