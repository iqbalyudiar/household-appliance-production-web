import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/slice/authSlice';
import productSlice from '../features/products/slice/productSlice';
const store = configureStore({
	reducer: {
		auth: authSlice,
		products: productSlice
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
