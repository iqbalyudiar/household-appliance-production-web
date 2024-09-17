import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { Card, Typography, Spinner } from "@material-tailwind/react";
import {
  getProductsList,
  setProductModalOpen,
  getProduct,
} from "../../slice/productSlice";
const TABLE_HEAD = ["Name", "Description", "Price", "Action"];

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products, isFetchingProductsList } = useAppSelector(
    (state) => state.products
  );

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

  if (isFetchingProductsList) {
    return (
      <div className="flex flex-col items-center">
        <Spinner className="h-12 w-12 mb-2" />
        <Typography variant="h3">Loading...</Typography>
      </div>
    );
  }

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
          {products && products.length > 0 ? (
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
                  <td className={`${classes} flex`}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium mr-3"
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
            })
          ) : (
            <Typography variant="h3" className="text-center">Product List Data Not Found</Typography>
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default ProductList;
