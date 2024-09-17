import { useState, MouseEvent } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import {
  setWarrantyModalOpen,
  createWarranty,
  getWarrantiesList,
  updateWarrantyStatus,
} from "../../slice/warrantySlice";

const WarrantyModal = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const {
    modal: { isOpen, type },
    warranties,
    selectedProduct: selectedWarrantyProduct,
  } = useAppSelector((state) => state.warranty);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setWarrantyModalOpen({ type: "", isOpen: false }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let res;
    if (type === "add") {
      res = await dispatch(createWarranty(selectedProduct));
    } else if (type === "approved" || type === "rejected") {
      res = await dispatch(
        updateWarrantyStatus({ claimId: selectedWarranty._id, status: type })
      );
    }

    if (res?.payload.success) {
      await dispatch(getWarrantiesList());
      handleClose();
    }
  };
  const modalTitle = () => {
    switch (type) {
      case "approved":
      case "rejected":
        return "Change Status Modal";
      default:
        return "Add Warranty";
    }
  };

  const selectedWarranty =
    warranties &&
    warranties.length > 0 &&
    warranties.find((warranty) => warranty._id === selectedWarrantyProduct.id);

  const classStatus = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-neutral-900";
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogHeader>{modalTitle()}</DialogHeader>
      <DialogBody>
        {type === "add" ? (
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Name
              </Typography>
              <Select
                label="Select Version"
                value={selectedProduct}
                onChange={(val) => setSelectedProduct(val)}
              >
                {products && products.length > 0
                  ? products.map((product) => (
                      <Option value={product._id}>{product.name}</Option>
                    ))
                  : ""}
              </Select>
            </div>
          </form>
        ) : (
          <Typography>
            Do you want to <span className={classStatus(type)}>{type}</span>{" "}
            this product with name{" "}
            <span className="font-bold">{selectedWarranty?.product?.name}</span>{" "}
            made by{" "}
            <span className="font-bold">{selectedWarranty?.user?.email}</span>
          </Typography>
        )}
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

export default WarrantyModal;
