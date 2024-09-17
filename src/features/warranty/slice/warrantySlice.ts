import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWarrantiesListApi,
  createWarrantyClaim,
  updateWarrantyClaimStatus,
} from "../api/warrantyApi";

interface IModal {
  type: string;
  isOpen: boolean;
}

interface IProduct {
  id: string;
}

export interface IClaimStatus {
  claimId: string;
  status: string;
}

export const getWarrantiesList = createAsyncThunk(
  "warranty/getWarrantiesList",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setIsFetchingWarranties(true));
    try {
      const data = await getWarrantiesListApi();
      dispatch(setWarrantiesList(data.claims));
      return data;
    } catch (error: any) {
      const rejectValue = rejectWithValue(
        error?.response?.data?.message || "Get Warranty Failed"
      );
      return rejectValue;
    } finally {
      dispatch(setIsFetchingWarranties(false));
    }
  }
);

export const createWarranty = createAsyncThunk(
  "warranty/createWarranty",
  async (productId: string, { dispatch, rejectWithValue }) => {
    try {
      const data = await createWarrantyClaim(productId);
      dispatch(setNewWarranty(data));
      return data;
    } catch (error: any) {
      const rejectValue = rejectWithValue(
        error?.response?.data?.message || "Get Warranty Failed"
      );
      return rejectValue;
    }
  }
);

export const updateWarrantyStatus = createAsyncThunk(
  "warranty/updateWarrantyStatus",
  async (claimParams: IClaimStatus, { rejectWithValue }) => {
    try {
      const data = await updateWarrantyClaimStatus(claimParams);
      return data;
    } catch (error: any) {
      const rejectValue = rejectWithValue(
        error?.response?.data?.message || "Get Warranty Failed"
      );
      return rejectValue;
    }
  }
);

export const setWarrantyModalOpen = createAsyncThunk(
  "product/setWarrantyModalOpen",
  ({ type, isOpen }: IModal, { dispatch }) => {
    dispatch(setWarrantyModal({ type, isOpen }));
  }
);

export const setSelectedWarrantyProduct = createAsyncThunk(
  "product/setSelectedWarrantyProduct",
  ({ id }: IProduct, { dispatch }) => {
    dispatch(setSelectedProduct({ id }));
  }
);

const initialState = {
  isFetchingWarranties: false,
  warranties: [],
  modal: {
    type: "",
    isOpen: false,
  },
  selectedProduct: {
    id: "",
  },
};

const warrantySlice = createSlice({
  name: "warranty",
  initialState,
  reducers: {
    setWarrantiesList(state, action) {
      state.warranties = action.payload;
    },
    setNewWarranty(state, action) {
      state.warranties = [...state.warranties, action.payload];
    },
    setIsFetchingWarranties(state, action) {
      state.isFetchingWarranties = action.payload;
    },
    setWarrantyModal(state, action) {
      state.modal.type = action.payload.type;
      state.modal.isOpen = action.payload.isOpen;
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = {
        id: action.payload.id,
      };
    },
  },
});

export const {
  setWarrantiesList,
  setIsFetchingWarranties,
  setWarrantyModal,
  setNewWarranty,
  setSelectedProduct,
} = warrantySlice.actions;

export default warrantySlice.reducer;
