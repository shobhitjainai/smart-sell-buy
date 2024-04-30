import i18next from 'i18next';
import en from '../admin-role/i18n/en';
import hin from '../admin-role/i18n/hin';
import { authRoles } from 'src/app/auth';
import SellProduct from './SellProduct'

i18next.addResourceBundle('en', 'addProduct', en);
i18next.addResourceBundle('hin', 'addProduct', hin);

const SellProductConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.both,
  routes: [
    {
      path: '/user/sell-product',
      element: <SellProduct />,
    },
  ],
};

export default SellProductConfig;

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
