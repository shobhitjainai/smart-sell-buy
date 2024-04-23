// import i18next from 'i18next';

// import en from './i18n/en';
// import tr from './i18n/tr';
// import ar from './i18n/ar';
import { authRoles } from 'src/app/auth';
import User from './User'
import UserList from './tabs/user-list/UserList'
import { Navigate } from 'react-router-dom';
// i18next.addResourceBundle('en', 'examplePage', en);
// i18next.addResourceBundle('tr', 'examplePage', tr);
// i18next.addResourceBundle('ar', 'examplePage', ar);

const UserConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.admin,
  routes: [
    {
      path: '/admin/user',
      children:[
        {
          path: '',
          element: <Navigate to="/admin/user/userList" />,
        },
        {
          path: 'userList',
          element: <User><UserList /></User>
        },
        // {
        //   path: 'newcategory',
        //   element: <Category><NewCategory /></Category>
        // },
      ]
    },
  ],
};

export default UserConfig;

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
