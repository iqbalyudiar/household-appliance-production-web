import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWarrantiesListApi } from "../api/warrantyApi";

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

const initialState = {
  isFetchingWarranties: false,
  warranties: [],
};

const warrantySlice = createSlice({
  name: "warranty",
  initialState,
  reducers: {
    setWarrantiesList(state, action) {
      state.warranties = action.payload;
    },
    setIsFetchingWarranties(state, action) {
      state.isFetchingWarranties = action.payload;
    },
  },
});

export const { setWarrantiesList, setIsFetchingWarranties } =
  warrantySlice.actions;

export default warrantySlice.reducer;
