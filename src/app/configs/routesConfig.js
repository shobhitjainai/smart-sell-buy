import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import HomeConfig from '../main/home/HomeConfig';
import ForgotPasswordConfig from '../main/forgot password/ForgotPasswordConfig';
import SubCategoryConfig from '../main/home/components/categories/SubCategoryConfig';
import ProductConfig from '../main/products/ProductConfig';
import ProductDetailsConfig from '../main/products/product_details/ProductsDetailsConfig';
import SellingConfig from '../main/selling/SellingConfig';
import SellProductConfig from '../main/sell_product/SellProductConfig';
import SellProductSubCategoryConfig from '../main/sell_product/SellProductSubCategoryConfig';
import PostProductConfig from '../main/sell_product/PostProductConfig';
import LocationConfig from '../main/sell_product/LocationConfig';
import ProfileConfig from '../main/profile/profile_page/ProfileConfig';
import SettingConfig from '../main/profile/account_settings/SettingConfig';
import settingsConfig from './settingsConfig';

//admin
import DashboardConfig from '../main/admin-role/dashboard/DashboardConfig';
import CategoryConfig from '../main/admin-role/category/CategoryConfig';
import Authorization from 'app/shared-components/Authorization';
import AdminProductConfig from '../main/admin-role/products/AdminProductConfig'
import UserConfig from '../main/admin-role/user/UserConfig';
import OrderConfig from '../main/admin-role/order/OrderConfig';
import AdminSubCategoryConfig from '../main/admin-role/sub-category/AdminSubCategoryConfig';


const routeConfigs = [
  CategoryConfig,
  DashboardConfig,
  LocationConfig,
  PostProductConfig,
  SellProductSubCategoryConfig,
  ProductConfig,
  SubCategoryConfig,
  ForgotPasswordConfig,
  ExampleConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  HomeConfig,
  ProductDetailsConfig,
  SellingConfig,
  SellProductConfig,
  ProfileConfig,
  SettingConfig,
  AdminProductConfig,
  UserConfig,
  OrderConfig,
  AdminSubCategoryConfig
];


// const getLoginRedirectUrl = () => {
//   const role = localStorage.getItem('role');
//   if (role === 'admin') {
//     return 'admin/dashboard';
//   } else if (role === 'user') {
//     return 'user/home';
//   }
//   return '/';
// };

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, [localStorage.getItem('auth_role') === 'user' ? "user" : "admin"]),
  {
    path: '/',
    element: <Authorization />
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
