import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductApi,
  updateProductApi,
  getProductsApi,
  getProductApi,
} from "../api/productApi";

interface IModal {
  type: string;
  isOpen: boolean;
}

export interface IProductParam {
  name: string;
  description: string;
  price: number;
}

export const getProductsList = createAsyncThunk(
  "products/getProductsList",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await getProductsApi();
      dispatch(productSlice.actions.setProductsList(data.products));
      return data;
    } catch (error: any) {
      const rejectValue = rejectWithValue(
        error?.response?.data?.message || "Get Products Failed"
      );
      return rejectValue;
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const data = await getProductApi(id);
      const selectedData = {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
      };
      dispatch(productSlice.actions.setSelectedProduct(selectedData));
      return data;
    } catch (error: any) {
      const rejectValue = rejectWithValue(
        error?.response?.data?.message || "Get Products Failed"
      );
      return rejectValue;
    }
  }
);

export const setProductModalOpen = createAsyncThunk(
  "product/setProductModalOpen",
  ({ type, isOpen }: IModal, { dispatch }) => {
    dispatch(productSlice.actions.setProductModalOpen({ type, isOpen }));
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productParam: IProductParam, { dispatch, rejectWithValue }) => {
    try {
      const data = await createProductApi(productParam);
      if (data.success) {
        dispatch(productSlice.actions.setNewProduct(productParam));
      }
      return data;
    } catch (error: any) {
      const rejectValue = rejectWithValue(
        error?.response?.data?.message || "Create Failed"
      );
      return rejectValue;
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (
    params: { id: string; productParam: IProductParam },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { id, productParam } = params;
      const data = await updateProductApi(id, productParam);
      if (data.success) {
        dispatch(
          productSlice.actions.setUpdatedProduct({ id, ...productParam })
        );
      }
      return data;
    } catch (error: any) {
      const rejectValue = rejectWithValue(
        error?.response?.data?.message || "Create Failed"
      );
      return rejectValue;
    }
  }
);

const initialState = {
  products: [],
  selectedProduct: {
    id: "",
    name: "",
    description: "",
    price: 0,
  },
  modal: {
    type: "",
    isOpen: false,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsList(state, action) {
      state.products = action.payload;
    },
    setProductModalOpen(state, action) {
      state.modal.type = action.payload.type;
      state.modal.isOpen = action.payload.isOpen;
    },
    setNewProduct(state, action) {
      state.products = [...state.products, action.payload];
    },
    setUpdatedProduct(state, action) {
      state.products = state.products.map((product) =>
        product._id === action.payload.id
          ? { _id: action.payload.id, ...action.payload }
          : product
      );
    },
    setSelectedProduct(state, action) {
      const { id, name, description, price } = action.payload;

      state.selectedProduct = {
        id,
        name,
        description,
        price,
      };
    },
  },
});

export default productSlice.reducer;
