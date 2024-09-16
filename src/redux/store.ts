import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/slice/authSlice';
import productSlice from '../features/products/slice/productSlice';
const store = configureStore({
	reducer: {
		auth: authSlice,
		products: productSlice
	}
})

export default store;