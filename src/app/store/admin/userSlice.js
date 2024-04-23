import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "src/app/constant/apiRoutes";

export const getCustomers = createAsyncThunk(
    "customers/getCustomers",
    async () => {
        const response = await fetch(`https://reileadsapi.exerboost.in/api/get-all-users`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}` 
            }
        });
        const data = await response.json();
        return data.data;
    }
);


const userSlice = createSlice({
    name: "product",
    initialState: {
        customers: [],
        loading: false,
        editDialog: false,
    },

    reducers: {
        handleEditProductDialog: (state,action) => {
          state.editDialog = action.payload;
        }
      },

    extraReducers: {

        [getCustomers.pending]: (state) => {
            state.loading = true;
        },
        [getCustomers.fulfilled]: (state, action) => {
            state.loading = false;
            state.customers = action.payload;
        },
        [getCustomers.rejected]: (state) => {
            state.loading = false;
        },

    },
});


// export const {handleEditProductDialog} = categorySlice.actions
export default userSlice.reducer;