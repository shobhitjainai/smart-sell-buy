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

export const getSubCategoriesById = createAsyncThunk('subcategories/getSubCategoriesById', async (id) => {
  const response = await fetch(`https://reileadsapi.exerboost.in/api/subcategory/${id}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  });
  const data = await response.json();
  return data.data;
})

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

export const filterProducts = createAsyncThunk('product/filterProducts', async (productData) => {
  const formData = new FormData();
  // Append form data fields to the FormData object
  Object.keys(productData).forEach((key) => {
    formData.append(key, productData[key]);
  });
  const response = await fetch(`https://reileadsapi.exerboost.in/api/filter-product`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    },
    body: formData
  });
  const data = await response.json();
  return data.data;
})

const userHomeSlice = createSlice({
  name: "userHome",
  initialState: {
    loading: {
      categoriesLoading: false,
      currentSubCategoriesLoading: false,
      userProductsLoading: false,
    },
    filterState: {
      sort: 'newest-on-top',
      category_id: '',
      subcategory_id: '',
      price_max: '',
      price_min: ''
    },
    currentSubCategories: [],
    bannerImages: [],
    Categories: [],
    userProducts: [],
    subcategories: [],
    singleProductDetail: [],
    searchInput: '',
  },
  reducers: {
    handleFilters: (state, action) => {
      const { name, value } = action.payload
      state.filterState[name] = value
    }
  },
  extraReducers: {
    [getBannerImages.fulfilled]: (state, action) => {
      state.bannerImages = action.payload;
    },
    [getCategories.pending]: (state) => {
      state.loading.categoriesLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading.categoriesLoading = false;
      state.Categories = action.payload;
    },
    [getSubCategoriesById.pending]: (state, action) => {
      state.loading.currentSubCategoriesLoading = true;
    },
    [getSubCategoriesById.fulfilled]: (state, action) => {
      state.loading.currentSubCategoriesLoading = false;
      state.currentSubCategories = action.payload;
    },
    [getSubCategories.pending]: (state) => {
      // state.loading = true;
    },
    [getSubCategories.fulfilled]: (state, action) => {
      // state.loading = false;
      state.subcategories = action.payload;
    },
    [getUserProducts.pending]: (state) => {
      state.loading.userProductsLoading = true;
    },
    [getUserProducts.fulfilled]: (state, action) => {
      state.loading.userProductsLoading = false;
      state.userProducts = action.payload;
    },

    [getSingleProductDetail.pending]: (state) => {
      // state.loading = true;
    },
    [getSingleProductDetail.fulfilled]: (state, action) => {
      // state.loading = false;
      state.singleProductDetail = action.payload;
    },
    [getSearchProducts.pending]: (state) => {
      // state.loading = true;
    },
    [getSearchProducts.fulfilled]: (state, action) => {
      // state.loading.userProductsLoading = false;
      state.searchInput = action.payload;
    },
    [filterProducts.pending]: (state) => {
      state.loading.userProductsLoading = true;
    },
    [filterProducts.fulfilled]: (state, { payload }) => {
      state.loading.userProductsLoading = false;
      state.userProducts = payload
    }
  },
});

export const { handleFilters } = userHomeSlice.actions
export default userHomeSlice.reducer;