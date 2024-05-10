import { API_ROUTES } from "src/app/constant/apiRoutes";
import { APIRequest } from "src/app/utils/APIRequest";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getactiveProducts = createAsyncThunk('activeProducts/getactiveProducts', async () => await APIRequest.get(API_ROUTES.fetchactiveProducts))

export const getExpiredProducts = createAsyncThunk('expiredProducts/getExpiredProducts', async () => await APIRequest.get(API_ROUTES.getExpiredProducts))


export const deleteSubCategory = createAsyncThunk('SubCategory/deleteSubCategory', async (id, { dispatch }) => {
    try {
        const response = await APIRequest.remove(`${API_ROUTES.deleteSubCategory}/${id}`)
    } catch (error) {
        console.log("🚀 ~ deleteSubCategory ~ error:", error)
        return { error: true }
    }
})
export const addSubCategory = createAsyncThunk('activeProducts/deleteSubCategory', async (data, { dispatch }) => {
    try {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "photos") {
                formData.append("image", data[key]);
            } else {
                formData.append(key, data[key]);
            }
        });
        const response = await APIRequest.post(API_ROUTES.addSubCategory, formData)
        return response
    } catch (error) {
        console.log("🚀 ~ addSubCategory ~ error:", error)
        return { error: true, message: error?.error }
    }
})
export const updateSubCategory = createAsyncThunk('activeProducts/deleteSubCategory', async ({ id, data }, { dispatch }) => {
    try {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        const response = await APIRequest.put(`${API_ROUTES.updateSubCategory}/${id}`, formData)
        console.log("🚀 ~ updateSubCategory ~ response:", response)
        dispatch(getactiveProducts())
        return response
    } catch (error) {
        console.log("🚀 ~ updateSubCategory ~ error:", error)
        return { error: true }
    }
})

const initialState = {
    activeProducts: [],
    expiredProducts: [],
    loading: {
        activeProductsLoading: false,
        expiredProductsLoading: false

    }
}
const productStatusSlice = createSlice({
    name: 'productStatus',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // ACTIVE PRODUCTS
            .addCase(getactiveProducts.pending, (state, { payload }) => {
                state.loading.activeProductsLoading = true
            })
            .addCase(getactiveProducts.fulfilled, (state, { payload }) => {
                state.activeProducts = payload.data
                state.loading.activeProductsLoading = false
            })
            // EXPIRED PRODUCTS
            .addCase(getExpiredProducts.pending, (state, { payload }) => {
                state.loading.expiredProductsLoading = true
            })
            .addCase(getExpiredProducts.fulfilled, (state, { payload }) => {
                state.expiredProducts = payload.data
                state.loading.expiredProductsLoading = false
            })
    }
})

export const { } = productStatusSlice.actions
export default productStatusSlice.reducer