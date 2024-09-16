import api from "../../../utils/api";
import { IProductParam } from "../slice/productSlice";

export const getProductsApi = async () => {
	const response = await api.get('/products');
	return response.data;
};

export const createProduct = async (product: IProductParam) => {
	const response = await api.post('/products', product)

	return response.data
}