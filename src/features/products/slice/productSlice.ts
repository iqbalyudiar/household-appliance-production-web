import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsApi } from "../api/productApi";

export const getProductsList = createAsyncThunk('products/getProductsList', async (_, { dispatch, rejectWithValue }) => {
  try {
    const data = await getProductsApi()
    dispatch(productSlice.actions.setProductsList(data.products))
    return data
  } catch (error) {
    const rejectValue = rejectWithValue(error?.response?.data?.message || 'Login failed');
    return rejectValue
  }
})

const initialState = {
  products: []
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsList(state, action) {
      state.products = action.payload
    }
  }
})

export default productSlice.reducer