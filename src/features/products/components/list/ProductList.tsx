import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Card, Typography } from "@material-tailwind/react";
import {
  getProductsList,
  setProductModalOpen,
  getProduct,
} from "../../slice/productSlice";
const TABLE_HEAD = ["Name", "Description", "Price", ""];

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products).products;

  useEffect(() => {
    const getProducts = async () => {
      await dispatch(getProductsList());
    };

    getProducts();
  }, []);

  const handleEdit = async (id: string) => {
    const res = await dispatch(getProduct(id));
    if (res.payload.success) {
      dispatch(setProductModalOpen({ type: "edit", isOpen: true }));
    }
  };

  const handleDelete = async (id: string) => {
    const res = await dispatch(getProduct(id));
    if (res.payload.success) {
      dispatch(setProductModalOpen({ type: "delete", isOpen: true }));
    }
  };

  return (
    <Card className="h-full w-full overflow-scroll justify-start">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products &&
            products.length > 0 &&
            products.map(({ name, description, price, _id }, index) => {
              const isLast = index === products.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {price}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      onClick={() => handleEdit(_id)}
                    >
                      Edit
                    </Typography>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="red"
                      className="font-medium"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </Typography>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Card>
  );
};

export default ProductList;
