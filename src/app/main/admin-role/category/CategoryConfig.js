import i18next from 'i18next';

import en from '../i18n/en';
import hin from '../i18n/hin';

import { authRoles } from 'src/app/auth';
import Category from './Category'
import CategoryList from './tabs/category-list/CategoryList'
import NewCategory from './tabs/new-category/NewCategory'
import { Navigate } from 'react-router-dom';
import { element } from 'prop-types';
i18next.addResourceBundle('en', 'categoryPage', en);
i18next.addResourceBundle('hin', 'categoryPage', hin);


const CategoryConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: '/admin/category',
      children: [
        {
          path: '',
          element: <Navigate to="/admin/category/categorylist" />,
        },
        {
          path: 'categorylist',
          element: <Category><CategoryList /></Category>
        },
        {
          path: 'newcategory',
          element: <Category><NewCategory /></Category>
        },
      ]
    },
  ],
};

export default CategoryConfig;

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
