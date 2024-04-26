import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { authRoles } from '../auth';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'home',
    title: 'Home',
    translate: 'HOME',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: 'user/home',
    auth: authRoles.user,
  },
  {
    id: 'product',
    title: 'Products',
    translate: 'Products',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: 'user/products',
    auth: authRoles.user,
  },
  {
    id: 'selling',
    title: 'Selling',
    translate: 'Selling',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: '/user/selling',
    auth: authRoles.user,
  },
  {
    id: 'sellproduct',
    title: 'Sell Product',
    translate: 'Sellproduct',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: '/user/sell-product',
    auth: authRoles.user,
  },

  //admin

  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'Dashboard',
    type: 'item',
    icon: 'heroicons-outline:view-grid',
    url: '/admin/dashboard',
    auth: authRoles.admin,
  },
  {
    id: 'category',
    title: 'Category',
    translate: 'Category',
    type: 'group',
    icon: 'heroicons-outline:home',
    auth: authRoles.admin,
    // url: 'caterory',
    children: [
      {
        id: 'category.categorylist',
        title: 'Category List',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/admin/category/categorylist',
      },
      {
        id: 'category.newcategory',
        title: 'New Category',
        type: 'item',
        icon: 'heroicons-outline:plus-circle',
        url: '/admin/category/newcategory',
      },
    ]
  },
  {
    id: 'subcategory',
    title: 'Sub-Category',
    translate: 'Sub-Category',
    type: 'group',
    icon: 'heroicons-outline:home',
    auth: authRoles.admin,
    children: [
      {
        id: 'subcategory.subcategorylist',
        title: 'Sub-Category List',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/admin/sub-category/sub-category-list',
      },
      {
        id: 'subcategory.newsubcategory',
        title: 'New Sub-Category',
        type: 'item',
        icon: 'heroicons-outline:plus-circle',
        url: '/admin/sub-category/new-sub-category',
      },
    ]
  },
  {
    id: 'products',
    title: 'Products',
    translate: 'products',
    type: 'group',
    icon: 'heroicons-outline:home',
    auth: authRoles.admin,
    // url: '/auth/products',
    children: [
      {
        id: 'products.productslist',
        title: 'Product List',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: 'admin/products/productslist',
        auth: authRoles.admin,
      },
      {
        id: 'products.newproducts',
        title: 'New Product',
        type: 'item',
        icon: 'heroicons-outline:plus-circle',
        url: 'user/sell-product',
      },
    ]
  },
  {
    id: 'user',
    title: 'Customer',
    translate: 'user',
    type: 'group',
    icon: 'heroicons-outline:home',
    auth: authRoles.admin,
    // url: 'user',
    children: [
      {
        id: 'products.alluser',
        title: 'Customers',
        type: 'item',
        icon: 'heroicons-outline:user-group',
        url: 'admin/user/userlist',
      },

    ]
  },
  {
    id: 'order',
    title: 'Order',
    translate: 'order',
    type: 'group',
    icon: 'heroicons-outline:home',
    auth: authRoles.admin,
    children: [
      {
        id: 'order.order',
        title: 'order',
        type: 'item',
        icon: 'material-solid:handyman',
        url: '/order',
      },

    ]
  },
];
export default navigationConfig;
