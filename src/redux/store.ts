import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/slice/authSlice';
import productSlice from '../features/products/slice/productSlice';
import warrantySlice from '../features/warranty/slice/warrantySlice';
const store = configureStore({
	reducer: {
		auth: authSlice,
		products: productSlice,
		warranty: warrantySlice,
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
