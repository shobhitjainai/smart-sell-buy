import i18next from 'i18next';
import hin from './navigation-i18n/hin';
import en from './navigation-i18n/en';
import { authRoles } from '../auth';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('hin', 'navigation', hin);

const navigationConfig = [
  {
    id: 'home',
    title: 'Home',
    translate: 'HOME',
    type: 'item',
    // icon: 'heroicons-outline:home',
    url: 'user/home',
    auth: authRoles.user,
  },
  {
    id: 'product',
    title: 'Products',
    translate: 'Products',
    type: 'item',
    // icon: 'heroicons-outline:star',
    url: 'user/products',
    auth: authRoles.user,
  },
  {
    id: 'selling',
    title: 'Selling',
    translate: 'SELLING',
    type: 'item',
    // icon: 'material-solid:local_offer',
    url: '/user/selling',
    auth: authRoles.user,
  },
  {
    id: 'sellproduct',
    title: 'Sell Product',
    translate: 'SELL_PRODUCT',
    type: 'item',
    // icon: 'heroicons-outline:star',
    url: '/user/sell-product',
    auth: authRoles.user,
  },
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
    children: [
      {
        id: 'category.categorylist',
        title: 'CategoryList',
        translate: 'CategoryList',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/admin/category/categorylist',
      },
      {
        id: 'category.newcategory',
        title: 'NewCategory',
        translate: "NewCategory",
        type: 'item',
        icon: 'heroicons-outline:plus-circle',
        url: '/admin/category/newcategory',
      },
    ]
  },
  {
    id: 'subcategory',
    title: 'SubCategory',
    translate: 'SubCategory',
    type: 'group',
    icon: 'heroicons-outline:home',
    auth: authRoles.admin,
    children: [
      {
        id: 'subcategory.subcategorylist',
        title: 'SubCategoryList',
        translate: "SubCategoryList",
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/admin/sub-category/sub-category-list',
      },
      {
        id: 'subcategory.newsubcategory',
        title: 'NewSubCategory',
        translate: "NewSubCategory",
        type: 'item',
        icon: 'heroicons-outline:plus-circle',
        url: '/admin/sub-category/new-sub-category',
      },
    ]
  },
  {
    id: 'products',
    title: 'Products',
    translate: 'Products',
    type: 'group',
    icon: 'heroicons-outline:home',
    auth: authRoles.admin,
    // url: '/auth/products',
    children: [
      {
        id: 'products.productslist',
        title: 'ProductList',
        translate: "ProductList",
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: 'admin/products/productslist',
        auth: authRoles.admin,
      },
      {
        id: 'products.newproducts',
        title: 'NewProduct',
        translate: "NewProduct",
        type: 'item',
        icon: 'heroicons-outline:plus-circle',
        url: 'user/sell-product',
      },
    ]
  },
  {
    id: 'user',
    title: 'Customer',
    translate: 'Customer',
    type: 'group',
    icon: 'heroicons-outline:home',
    auth: authRoles.admin,
    children: [
      {
        id: 'products.alluser',
        title: 'Customers',
        translate: "Customers",
        type: 'item',
        icon: 'heroicons-outline:user-group',
        url: 'admin/user/userlist',
      },

    ]
  },
  {
    id: 'order',
    title: 'Order',
    translate: 'Order',
    type: 'group',
    icon: 'heroicons-outline:home',
    auth: authRoles.admin,
    children: [
      {
        id: 'order.order',
        title: 'Active & Expired Products',
        translate: 'ACTIVE_EXPIRED_PRODUCTS',
        type: 'item',
        icon: 'material-solid:list_alt',
        url: '/order',
      },

    ]
  },
];
export default navigationConfig;
