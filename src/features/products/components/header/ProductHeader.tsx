import { Typography, Button } from "@material-tailwind/react";
import { setProductModalOpen } from "../../slice/productSlice";
import { useAppDispatch } from "../../../../redux/hooks";
const ProductHeader = () => {
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    dispatch(setProductModalOpen({ type: "add", isOpen: true }));
  };
  return (
    <div className="flex justify-between align-middle mb-3">
      <Typography>Product List</Typography>
      <Button onClick={handleOpen}>+ Add</Button>
    </div>
  );
};

export default ProductHeader;
