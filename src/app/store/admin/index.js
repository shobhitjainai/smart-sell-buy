import { combineReducers } from '@reduxjs/toolkit';
import CategorySlice from './CategorySlice';
import productSlice from './productSlice'
import userSlice from './userSlice';
import DashboardSlice from './DashboardSlice';
import SubCategory from './SubCategorySlice';
import productStatusSlice from './productStatusSlice';
const transformReducers = combineReducers({
    CategorySlice,
    productSlice,
    userSlice,
    DashboardSlice,
    SubCategory,
    productStatusSlice,
})
export default transformReducers