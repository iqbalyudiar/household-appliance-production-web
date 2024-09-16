import { useState, MouseEvent } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setProductModalOpen, addProduct } from "../../slice/productSlice";

const ProductAddEditModal = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const dispatch = useAppDispatch();
  const { type, isOpen } = useAppSelector((state) => state.products.modal);
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const param = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
    };
    const res = await dispatch(addProduct(param));

    if (res.payload.success) {
      handleClose()
    }
  };
  const handleClose = () => {
    dispatch(setProductModalOpen({ type: "", isOpen: false }));
  };

  const modalTitle = type === "add" ? "Add A Product" : "Edit Product";

  return (
    <Dialog open={isOpen}>
      <DialogHeader>{modalTitle}</DialogHeader>
      <DialogBody>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              size="lg"
              placeholder="Product Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Textarea
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Price
            </Typography>
            <Input
              size="lg"
              placeholder="Product Price"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1"
        >
          <span>Close</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit}>
          <span>Submit</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ProductAddEditModal;
