import api from "../../../utils/api";

export const getWarrantiesListApi = async () => {
  const response = await api.get("/warranty/claims/all");
  return response.data;
};
