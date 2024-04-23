import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "src/app/constant/apiRoutes";

export const getuserProfile = createAsyncThunk(
    "userProfile/getuserProfile",
    async () => {
      const response = await fetch(`https://reileadsapi.exerboost.in/api/me`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getAccessToken()}` // Include the token in the Authorization header
        }
      });
      const data = await response.json();
      return data.data;
    }
  );

const userProfileSlice = createSlice({
    name: "userHome",
    initialState: {
      userProfile: [],
      loading: false, 
      
    },
    
    extraReducers: {
      [getuserProfile.pending]: (state) => {
        state.loading = true;
      },
      [getuserProfile.fulfilled]: (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      },
      [getuserProfile.rejected]: (state) => {
        state.loading = false;
      },
      
    },
  });

  
  export default userProfileSlice.reducer;