import api from "../../../utils/api";


export const loginApi = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerApi = async (userData: { name: string; email: string; password: string }) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};