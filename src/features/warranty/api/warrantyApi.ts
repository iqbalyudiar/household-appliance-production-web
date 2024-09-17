import api from "../../../utils/api";
import { IClaimStatus } from "../slice/warrantySlice";

export const getWarrantiesListApi = async () => {
  const response = await api.get("/warranty/claims/all");
  return response.data;
};

export const createWarrantyClaim = async (productId: string) => {
  const response = await api.post("/warranty/claim", { productId });
  return response.data;
};

export const updateWarrantyClaimStatus = async ({
  claimId,
  status,
}: IClaimStatus) => {
  const response = await api.post(`/warranty/claims/${claimId}/status`, {
    status,
  });
  return response.data;
};
