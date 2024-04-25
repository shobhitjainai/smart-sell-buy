import { combineReducers } from '@reduxjs/toolkit';
import CategorySlice from './CategorySlice';
import productSlice from './productSlice'
import userSlice from './userSlice';
import DashboardSlice from './DashboardSlice';
import SubCategory from './SubCategorySlice';
const transformReducers = combineReducers({
    CategorySlice,
    productSlice,
    userSlice,
    DashboardSlice,
    SubCategory
})
export default transformReducers