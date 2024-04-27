import i18next from 'i18next';
import en from '../i18n/en';
import hin from '../i18n/hin';
import { authRoles } from 'src/app/auth';
import Product from './AdminProduct'
import ProductList from './tabs/product-list/ProductList'
import { Navigate } from 'react-router-dom';
i18next.addResourceBundle('en', 'adminProductPage', en);
i18next.addResourceBundle('hin', 'adminProductPage', hin);

const ProductConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: '/admin/products',
      children: [
        {
          path: '',
          element: <Navigate to="/admin/products/productslist" />,
        },
        {
          path: 'productslist',
          element: <Product><ProductList /></Product>
        },
      ]
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

const ExampleConfig = {
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

export default ExampleConfig;
*/
