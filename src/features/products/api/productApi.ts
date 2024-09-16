import api from "../../../utils/api";
import { IProductParam } from "../slice/productSlice";

export const getProductsApi = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductApi = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProductApi = async (product: IProductParam) => {
  const response = await api.post("/products", product);

  return response.data;
};

export const updateProductApi = async (id: string, product: IProductParam) => {
  const response = await api.put(`/products/${id}`, product);

  return response.data;
};
