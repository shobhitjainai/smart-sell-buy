import { API_ROUTES } from "src/app/constant/apiRoutes";
import { APIRequest } from "src/app/utils/APIRequest";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getSubCategories = createAsyncThunk('SubCategory/getSubCategories', async () => await APIRequest.get(API_ROUTES.fetchSubCategories))

export const deleteSubCategory = createAsyncThunk('SubCategory/deleteSubCategory', async (id, { dispatch }) => {
    try {
        const response = await APIRequest.remove(`${API_ROUTES.deleteSubCategory}/${id}`)
    } catch (error) {
        console.log("🚀 ~ deleteSubCategory ~ error:", error)
    }
})
export const addSubCategory = createAsyncThunk('SubCategory/deleteSubCategory', async (data, { dispatch }) => {
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
    }
})
export const updateSubCategory = createAsyncThunk('SubCategory/deleteSubCategory', async ({ id, data }, { dispatch }) => {
    try {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        const response = await APIRequest.post(`${API_ROUTES.updateSubCategory}/${id}`, formData)
        console.log("🚀 ~ updateSubCategory ~ response:", response)
        dispatch(getSubCategories())
        return response
    } catch (error) {
        console.log("🚀 ~ updateSubCategory ~ error:", error)
    }
})

const initialState = {
    subCategories: [],
    loading: {
        subCategoriesLoading: false
    }
}
const SubCategorySlice = createSlice({
    name: 'SubCategory',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubCategories.pending, (state, { payload }) => {
                state.loading.subCategoriesLoading = true
            })
            .addCase(getSubCategories.fulfilled, (state, { payload }) => {
                state.subCategories = payload.data
                state.loading.subCategoriesLoading = false
            })
    }
})

export const { } = SubCategorySlice.actions
export default SubCategorySlice.reducer