import { combineReducers } from '@reduxjs/toolkit';
import CategorySlice from './CategorySlice';
import productSlice from './productSlice'
import userSlice from './userSlice';
import DashboardSlice from './DashboardSlice';

const transformReducers = combineReducers({
    // applications,
    // approvalList,
    // communityList,
    // rawDataReport,
    // transform
    CategorySlice,
    productSlice,
    userSlice,
    DashboardSlice
   
})
export default transformReducers