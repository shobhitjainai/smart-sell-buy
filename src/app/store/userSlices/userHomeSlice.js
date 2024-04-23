import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "src/app/constant/apiRoutes";

export const getBannerImages = createAsyncThunk(
    "bannerImages/getBannerImages",
    async () => {
      const response = await fetch(`https://reileadsapi.exerboost.in/api/product-banner`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}` // Include the token in the Authorization header
        }
      });
      const data = await response.json();
      return data.data;
    }
  );

  export const getCategories = createAsyncThunk(
    "Categories/getCategories",
    async () => {
      const response = await fetch(`https://reileadsapi.exerboost.in/api/category`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}` 
        }
      });
      const data = await response.json();
      return data.data;
    }
  );
  export const getSubCategories = createAsyncThunk(
    "subcategories/getSubCategories",
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

  export const getUserProducts = createAsyncThunk(
    "userPruducts/getUserProducts",
    async () => {
      const response = await fetch(`https://reileadsapi.exerboost.in/api/product`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}` 
        }
      });
      const data = await response.json();
      return data.data;
    }
  );

  export const getSingleProductDetail = createAsyncThunk(
    "singleProductDetail/getSingleProductDetail",
    async (id) => {
      const response = await fetch(`https://reileadsapi.exerboost.in/api/product-details/${id}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}` 
        }
      });
      const data = await response.json();
      return data.data;
    }
  );

  export const getSearchProducts = createAsyncThunk(
    "searchProducts/getSearchProducts",
    async (search) => {
      const response = await fetch(`https://reileadsapi.exerboost.in/api/search-products?name=${search}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}` 
        }
      });
      const data = await response.json();
      return data.data;
    }
  );
  
const userHomeSlice = createSlice({
    name: "userHome",
    initialState: {
      bannerImages: [],
      loading: false, 
      Categories: [],
      userProducts: [],
      subcategories:[],
      singleProductDetail: [],
      searchInput: '',
    },
    
    extraReducers: {
      [getBannerImages.pending]: (state) => {
        state.loading = true;
      },
      [getBannerImages.fulfilled]: (state, action) => {
        state.loading = false;
        state.bannerImages = action.payload;
      },
      [getBannerImages.rejected]: (state) => {
        state.loading = false;
      },
      [getCategories.pending]: (state) => {
        state.loading = true;
      },
      [getCategories.fulfilled]: (state, action) => {
        state.loading = false;
        state.Categories = action.payload;
      },
      [getCategories.rejected]: (state) => {
        state.loading = false;
      },
      [getSubCategories.pending]: (state) => {
        state.loading = true;
      },
      [getSubCategories.fulfilled]: (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      },
      [getSubCategories.rejected]: (state) => {
        state.loading = false;
      },
      [getUserProducts.pending]: (state) => {
        state.loading = true;
      },
      [getUserProducts.fulfilled]: (state, action) => {
        state.loading = false;
        state.userProducts = action.payload;
      },
      [getUserProducts.rejected]: (state) => {
        state.loading = false;
      },

      [getSingleProductDetail.pending]: (state) => {
        state.loading = true;
      },
      [getSingleProductDetail.fulfilled]: (state, action) => {
        state.loading = false;
        state.singleProductDetail = action.payload;
      },
      [getSingleProductDetail.rejected]: (state) => {
        state.loading = false;
      },

      [getSearchProducts.pending]: (state) => {
        state.loading = true;
      },
      [getSearchProducts.fulfilled]: (state, action) => {
        state.loading = false;
        state.searchInput = action.payload;
      },
      [getSearchProducts.rejected]: (state) => {
        state.loading = false;
      },
    },
  });
  

  export default userHomeSlice.reducer;