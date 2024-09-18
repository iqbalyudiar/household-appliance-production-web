import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductApi,
  updateProductApi,
  deleteProductApi,
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
    dispatch(setIsFetchingProductsList(true));
    try {
      const data = await getProductsApi();
      dispatch(setProductsList(data.products));
      return data;
    } catch (error: any) {
      const rejectValue = rejectWithValue(
        error?.response?.data?.message || "Get Products Failed"
      );
      return rejectValue;
    } finally {
      dispatch(setIsFetchingProductsList(false));
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
      dispatch(setSelectedProduct(selectedData));
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
    dispatch(setProductModal({ type, isOpen }));
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productParam: IProductParam, { dispatch, rejectWithValue }) => {
    try {
      const data = await createProductApi(productParam);
      if (data.success) {
        dispatch(setNewProduct({ _id: data.id, ...productParam }));
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
        dispatch(setUpdatedProduct({ id, ...productParam }));
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const data = await deleteProductApi(id);
      if (data.success) {
        dispatch(setDeletedProduct({ id }));
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

export const removeSelectedProduct = createAsyncThunk(
  "product/removeSelectedProduct",
  (_, { dispatch }) => {
    dispatch(
      setSelectedProduct({
        id: "",
        name: "",
        description: "",
        price: 0,
      })
    );
  }
);

const initialState = {
  isFetchingProductsList: false,
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
    setProductModal(state, action) {
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
    setDeletedProduct(state, action) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.id
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
    setIsFetchingProductsList(state, action) {
      state.isFetchingProductsList = action.payload;
    },
  },
});

export const {
  setProductsList,
  setProductModal,
  setNewProduct,
  setUpdatedProduct,
  setDeletedProduct,
  setSelectedProduct,
  setIsFetchingProductsList,
} = productSlice.actions;

export default productSlice.reducer;
