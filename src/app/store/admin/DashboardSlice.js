import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "src/app/constant/apiRoutes";

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async () => {
        const response = await fetch(`https://reileadsapi.exerboost.in/api/product-banner`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
        const data = await response.json();
        return data.data;
    }
);
export const getSubCategoryCount = createAsyncThunk(
    "subCategoryCount/getSubCategoryCount",
    async () => {
        const response = await fetch(`https://reileadsapi.exerboost.in/api/subcategory`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
        const data = await response.json();
        return data.data;
    }
);

const DashboardSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        subCategoryCount:''
    },

    extraReducers: {
        [getProducts.pending]: (state) => {
            state.loading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [getProducts.rejected]: (state) => {
            state.loading = false;
        },
        [getSubCategoryCount.pending]: (state) => {
            state.loading = true;
        },
        [getSubCategoryCount.fulfilled]: (state, action) => {
            state.loading = false;
            state.subCategoryCount = action.payload;
        },
        [getSubCategoryCount.rejected]: (state) => {
            state.loading = false;
        },
    },
});
export default DashboardSlice.reducer;