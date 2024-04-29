import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "src/app/constant/apiRoutes";

export const getProductSelling = createAsyncThunk(
    "productSelling/getProductSelling",
    async () => {
        const response = await fetch(`https://reileadsapi.exerboost.in/api/product-selling`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}` // Include the token in the Authorization header
            }
        });
        const data = await response.json();
        return data.data;
    }
);

export const createProduct = createAsyncThunk(
    "newProduct/createProduct",
    async ({ productData }) => {
        const formData = new FormData();

        // Append form data fields to the FormData object
        Object.keys(productData).forEach(key => {
            // If the key is 'photos', it means it's an array of images
            if (key === 'photos') {
                // Loop through each photo and append them to FormData
                productData[key].forEach((photo, index) => {
                    formData.append(`images[${index}]`, photo); // Use 'images' as the key
                });
            } else {
                formData.append(key, productData[key]);
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
export const deleteItem = createAsyncThunk(
    "posts/deleteItem",
    async (id) => {
        const response = await fetch(`https://reileadsapi.exerboost.in/api/delete-product/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
        const data = await response.json();
        return data;
    }
);

// UPDATE PRODUCT

export const updateProduct = createAsyncThunk(
    "adminLandlords/updateProperty",
    async ({ productData, updateproductId }) => {

        const response = await fetch(`https://reileadsapi.exerboost.in/api/update-product/${updateproductId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        const data = await response.json();
        return data
    }
);



const userSellingSlice = createSlice({
    name: "userHome",
    initialState: {
        productSelling: [],
        loading: false,
        latlong: "",
        newProduct: [],
        subcategory: '',
        category: ''
    },
    reducers: {
        handlelatlong: (state, action) => {
            state.latlong = action.payload;
        },
        handleSubcategory: (state, action) => {
            state.subcategory = action.payload;
        },
        handleCategory: (state, action) => {
            state.category = action.payload
        }
    },
    extraReducers: {
        [getProductSelling.pending]: (state) => {
            state.loading = true;
        },
        [getProductSelling.fulfilled]: (state, action) => {
            state.loading = false;
            state.productSelling = action.payload;
        },
        [getProductSelling.rejected]: (state) => {
            state.loading = false;
        },


        [createProduct.pending]: (state) => {
            state.loading = true;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.newProduct = action.payload;
        },
        [createProduct.rejected]: (state) => {
            state.loading = false;
        },
        [deleteItem.pending]: (state) => {
            state.loading = true;
        },
        [deleteItem.fulfilled]: (state, action) => {
            state.loading = false;
            // Remove the deleted property from the state
        },
        [deleteItem.rejected]: (state) => {
            state.loading = false;
        },


    },
});


export const { handlelatlong, handleSubcategory, handleCategory } = userSellingSlice.actions
export default userSellingSlice.reducer;