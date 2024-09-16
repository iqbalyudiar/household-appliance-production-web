import { useState, useEffect, MouseEvent } from "react";
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
import {
  setProductModalOpen,
  addProduct,
  editProduct,
  deleteProduct,
} from "../../slice/productSlice";

const ProductAddEditModal = () => {
  const {
    modal: { type, isOpen },
    selectedProduct,
  } = useAppSelector((state) => state.products);
  const [productName, setProductName] = useState(selectedProduct.name);
  const [productDescription, setProductDescription] = useState(
    selectedProduct.description
  );
  const [productPrice, setProductPrice] = useState(selectedProduct.price);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setProductName(selectedProduct.name);
    setProductDescription(selectedProduct.description);
    setProductPrice(selectedProduct.price);
  }, [selectedProduct]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const param = {
      name: productName,
      description: productDescription,
      price:
        typeof productPrice === "string"
          ? parseFloat(productPrice)
          : productPrice,
    };

    let res;
    if (type === "add") {
      res = await dispatch(addProduct(param));
    } else if (type === "edit") {
      res = await dispatch(
        editProduct({ id: selectedProduct.id, productParam: param })
      );
    } else if (type === "delete") {
      res = await dispatch(deleteProduct(selectedProduct.id));
    }

    if (res?.payload.success) {
      handleClose();
    }
  };
  const handleClose = () => {
    dispatch(setProductModalOpen({ type: "", isOpen: false }));
  };

  const modalTitle = () => {
    switch (type) {
      case "delete":
        return "Delete Product";
      case "edit":
        return "Edit Product";
      default:
        return "Add A Product";
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogHeader>{modalTitle()}</DialogHeader>
      <DialogBody>
        {type === "delete" ? (
          <Typography>Do you want to delete this product?</Typography>
        ) : (
          ""
        )}
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
              value={productName}
              disabled={type === "delete"}
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
              value={productDescription}
              disabled={type === "delete"}
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
              value={productPrice}
              disabled={type === "delete"}
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
