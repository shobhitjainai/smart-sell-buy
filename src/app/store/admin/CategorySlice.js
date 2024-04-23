import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "src/app/constant/apiRoutes";

export const getCategory = createAsyncThunk(
    "category/getCategory",
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

export const createCategory = createAsyncThunk(
    "newCategory/createCategory",
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

        const response = await fetch("https://reileadsapi.exerboost.in/api/category", {
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

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({ categoryData, updateCategoryId }) => {
        // console.log(propertyData)

        const formData = new FormData();

        // Append form data fields to the FormData object
        Object.keys(categoryData).forEach(key => {
            formData.append(key, categoryData[key]);
        });
        const response = await fetch(`https://reileadsapi.exerboost.in/api/category/${updateCategoryId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
                // 'Content-Type': 'application/json'
            },
            body: formData
        });
        const data = await response.json();
        return data; // You can handle the response as needed
        //comment
    }
);

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (deleteCategoryId) => {
        const response = await fetch(`https://reileadsapi.exerboost.in/api/category/${deleteCategoryId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
        });
        const data = await response.json();
        return data;
    }
)

const categorySlice = createSlice({
    name: "category",
    initialState: {
        category: [],
        loading: false,
        newCategory: [],
        editCategotyDialog: false,
        deleteCategotyDialog: false,
    },
    reducers: {
        handleEditDialog: (state, action) => {
            state.editCategotyDialog = action.payload;
        },
        handleDeleteDialog: (state, action) => {
            state.deleteCategotyDialog = action.payload;
        }
    },

    extraReducers: {
        [createCategory.pending]: (state) => {
            state.loading = true;
        },
        [createCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.newCategory = action.payload;
        },
        [createCategory.rejected]: (state) => {
            state.loading = false;
        },

        [getCategory.pending]: (state) => {
            state.loading = true;
        },
        [getCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.category = action.payload;
        },
        [getCategory.rejected]: (state) => {
            state.loading = false;
        },

        [updateCategory.pending]: (state) => {
            state.loading = true;
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [updateCategory.rejected]: (state) => {
            state.loading = false;
        },

        [deleteCategory.pending]: (state) => {
            state.loading = true;
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [deleteCategory.rejected]: (state) => {
            state.loading = false;
        },

    },
});


export const { handleEditDialog, handleDeleteDialog } = categorySlice.actions
export default categorySlice.reducer;