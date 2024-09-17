import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../api/authApi";
import { STORAGE_AUTH_TOKEN } from "../constant";

interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

interface IAuthParam {
  email: string;
  password: string;
}

interface IAuthRegister extends IAuthParam {
  name: string;
  roles: string;
}

const initialState: AuthState = {
  token: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: IAuthParam, { dispatch, rejectWithValue }) => {
    try {
      const data = await loginApi(credentials);
      localStorage.setItem(STORAGE_AUTH_TOKEN, data.auth_token);
      dispatch(authSlice.actions.login({ token: data?.auth_token }));
      return data;
    } catch (error: any) {
      const rejectValue = rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
      return rejectValue;
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData: IAuthRegister, { rejectWithValue }) => {
    try {
      const data = await registerApi(userData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem(STORAGE_AUTH_TOKEN);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      state.status = "succeeded";
      state.error = null;
    },
    logout(state) {
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
    register(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      state.status = "succeeded";
      state.error = null;
    },
  },
});

export default authSlice.reducer;
