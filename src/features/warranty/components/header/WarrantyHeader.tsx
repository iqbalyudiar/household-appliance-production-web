import { useMemo } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useAppDispatch } from "../../../../redux/hooks";
import { setWarrantyModalOpen } from "../../slice/warrantySlice";
import { getProductsList } from "../../../products/slice/productSlice";

const WarrantyHeader = () => {
  const dispatch = useAppDispatch();
  const getProducts = useMemo(async () => {
    return await dispatch(getProductsList());
  }, [dispatch]);

  const handleOpenModal = async () => {
    const res = await getProducts;

    if (res.payload.success) {
      dispatch(setWarrantyModalOpen({ type: "add", isOpen: true }));
    }
  };
  return (
    <div className="flex justify-between items-center mb-3">
      <Typography variant="h2">Warranty List</Typography>
      <Button onClick={handleOpenModal}>+ Add</Button>
    </div>
  );
};

export default WarrantyHeader;
