import { combineReducers } from '@reduxjs/toolkit';
import userHomeSlice from './userHomeSlice'
import userSellingSlice from './userSellingSlice';
import userProfileSlice from './userProfileSlice';
import profileSlice from './profileSlice';


const transformReducers = combineReducers({
    // applications,
    // approvalList,
    // communityList,
    // rawDataReport,
    // transform
    userHomeSlice,
    userSellingSlice,
    userProfileSlice,
    profileSlice,
})
export default transformReducers