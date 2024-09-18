import { Typography, Button } from "@material-tailwind/react";
import { setProductModalOpen } from "../../slice/productSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { STORAGE_AUTH_TOKEN } from "../../../auth/constant";

const ProductHeader = () => {
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    dispatch(setProductModalOpen({ type: "add", isOpen: true }));
  };
  const isAuthenticated = localStorage.getItem(STORAGE_AUTH_TOKEN);

  return (
    <div className="flex justify-between align-middle mb-3">
      <Typography variant="h2">Product List</Typography>
      {isAuthenticated ? <Button onClick={handleOpen}>+ Add</Button> : ""}
    </div>
  );
};

export default ProductHeader;
