import api from "../../../utils/api";

export const getProductsApi = async () => {
	const response = await api.get('/products');
	return response.data;
};