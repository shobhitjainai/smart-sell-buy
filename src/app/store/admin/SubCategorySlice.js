import { API_ROUTES } from "src/app/constant/apiRoutes";
import { APIRequest, getAccessToken } from "src/app/utils/APIRequest";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getSubCategories = createAsyncThunk('SubCategory/getSubCategories', async () => await APIRequest.get(API_ROUTES.fetchSubCategories))

export const deleteSubCategory = createAsyncThunk('SubCategory/deleteSubCategory', async (id, { dispatch }) => {
    try {
        const response = await APIRequest.remove(`${API_ROUTES.deleteSubCategory}/${id}`)
    } catch (error) {
        console.log("🚀 ~ deleteSubCategory ~ error:", error)
        return { error: true }
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
        return { error: true, message: error?.error }
    }
})
export const updateSubCategory = createAsyncThunk('SubCategory/deleteSubCategory', async ({ id, data }, { dispatch }) => {
    try {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        const response = await APIRequest.put(`${API_ROUTES.updateSubCategory}/${id}`, formData)
        console.log("🚀 ~ updateSubCategory ~ response:", response)
        dispatch(getSubCategories())
        return response
    } catch (error) {
        console.log("🚀 ~ updateSubCategory ~ error:", error)
        return { error: true }
    }
})

export const GetSubcategoryByCategoryId = createAsyncThunk('filterSubcategories/GetSubcategoryByCategoryId', async (id) => {
    const response = await fetch(`https://reileadsapi.exerboost.in/api/subcategory/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      },
    });
    const data = await response.json();
    return data.data;
  })

const initialState = {
    subCategories: [],
    filterSubcategories: [],
    loading: {
        subCategoriesLoading: false,
        filterSubcategoriesLoading: false,
    },
    searchCategory: '',
}
const SubCategorySlice = createSlice({
    name: 'SubCategory',
    initialState,
    reducers: {
        getSearchSubcategory: (state, { payload } ) => {
            console.log(payload, "slice serach")
            state.searchCategory = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubCategories.pending, (state, { payload }) => {
                state.loading.subCategoriesLoading = true
            })
            .addCase(getSubCategories.fulfilled, (state, { payload }) => {
                state.subCategories = payload.data.filter(item =>
                    item.name.toLowerCase().includes(state.searchCategory.toLowerCase()) ||
                    // item.category.toLowerCase().includes(state.searchCategory.toLowerCase()) ||
                    item.description.toLowerCase().includes(state.searchCategory.toLowerCase())
                  )
                state.loading.subCategoriesLoading = false
            })

            .addCase(GetSubcategoryByCategoryId.pending, (state, { payload }) => {
                state.loading.filterSubcategoriesLoading = true
            })
            .addCase(GetSubcategoryByCategoryId.fulfilled, (state, { payload }) => {
                state.filterSubcategories = payload
                state.loading.filterSubcategoriesLoading = false
            })
    }
})

export const {getSearchSubcategory } = SubCategorySlice.actions
export default SubCategorySlice.reducer