import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES, getAccessToken } from "src/app/constant/apiRoutes";
import { APIRequest } from "src/app/utils/APIRequest";

export const getProduct = createAsyncThunk(
    "product/getProduct",
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

export const createProduct = createAsyncThunk(
    "newProduct/createProduct",
    async (categoryData) => {
        const formData = new FormData();
        // Append form data fields to the FormData object
        Object.keys(categoryData).forEach((key) => {
            if (key === "photos") {
                formData.append("image", categoryData[key]);
            } else {
                formData.append(key, categoryData[key]);
            }
        });


        const response = await fetch("https://reileadsapi.exerboost.in/api/product", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            body: formData
        });
        const data = await response.json();
        return data.data;
    }
);

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ productData, id }) => {
        const formData = new FormData();
        // Append form data fields to the FormData object
        Object.keys(productData).forEach((key) => {
            formData.append(key, productData[key]);
        });
        const response = await fetch(`https://reileadsapi.exerboost.in/api/update-product/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            body: formData
        });
        const data = await response.json();
        return data.data;
    }
);

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
    try {
        const response = await APIRequest.remove(`${API_ROUTES.deleteProduct}/${id}`)
    } catch (error) {
        console.log("🚀 ~ deleteSubCategory ~ error:", error)
        return { error: true }
    }
})

const categorySlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        loading: false,
        newProduct: [],
        editDialog: false,
    },

    reducers: {
        handleEditProductDialog: (state, action) => {
            state.editDialog = action.payload;
        }
    },


    extraReducers: {
        [createProduct.pending]: (state) => {
            state.loading = true;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.newCategory = action.payload;
        },
        [createProduct.rejected]: (state) => {
            state.loading = false;
        },

        [getProduct.pending]: (state) => {
            state.loading = true;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        [getProduct.rejected]: (state) => {
            state.loading = false;
        },

    },
});


export const { handleEditProductDialog } = categorySlice.actions
export default categorySlice.reducer;