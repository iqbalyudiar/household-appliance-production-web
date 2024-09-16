import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, getProductsApi } from "../api/productApi";

interface IModal {
  type: string;
  isOpen: boolean
}

export interface IProductParam {
  name: string;
  description: string;
  price: number;
}

export const getProductsList = createAsyncThunk('products/getProductsList', async (_, { dispatch, rejectWithValue }) => {
  try {
    const data = await getProductsApi()
    dispatch(productSlice.actions.setProductsList(data.products))
    return data
  } catch (error: any) {
    const rejectValue = rejectWithValue(error?.response?.data?.message || 'Get Products Failed');
    return rejectValue
  }
})

export const setProductModalOpen = createAsyncThunk('product/setProductModalOpen', ({ type, isOpen }: IModal, { dispatch }) => {
  dispatch(productSlice.actions.setProductModalOpen({ type, isOpen }))
})

export const addProduct = createAsyncThunk('product/addProduct', async (productParam: IProductParam, { dispatch, rejectWithValue }) => {
  try {
    const data = await createProduct(productParam)
    if (data.success) {
      dispatch(productSlice.actions.setNewProduct(productParam))
    }
    return data
  } catch (error: any) {
    const rejectValue = rejectWithValue(error?.response?.data?.message || 'Create Failed');
    return rejectValue
  }
})

const initialState = {
  products: [],
  modal: {
    type: '',
    isOpen: false
  }
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsList(state, action) {
      state.products = action.payload
    },
    setProductModalOpen(state, action) {
      state.modal.type = action.payload.type
      state.modal.isOpen = action.payload.isOpen
    },
    setNewProduct(state, action) {
      state.products = [
        ...state.products,
        action.payload
      ]
    }
  }
})

export default productSlice.reducer