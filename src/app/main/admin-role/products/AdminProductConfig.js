// import i18next from 'i18next';

// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import { authRoles } from 'src/app/auth';
import Product from './AdminProduct'
import ProductList from './tabs/product-list/ProductList'
// import NewProduct from './tabs/new-Product/NewProduct'
import { Navigate } from 'react-router-dom';
// i18next.addResourceBundle('en', 'examplePage', en);
// i18next.addResourceBundle('tr', 'examplePage', tr);
// i18next.addResourceBundle('ar', 'examplePage', ar);

const ProductConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.admin,
  routes: [
    {
      path: '/admin/products',
      children:[
        {
          path: '',
          element: <Navigate to="/admin/products/productslist" />,
        },
        {
          path: 'productslist',
          element: <Product><ProductList /></Product>
        },
        // {
        //   path: 'newProduct',
        //   element: <Product><NewProduct /></Product>
        // },
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
