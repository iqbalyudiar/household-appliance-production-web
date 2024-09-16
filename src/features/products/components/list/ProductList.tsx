import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography } from "@material-tailwind/react";
import { getProductsList } from "../../slice/productSlice";
const TABLE_HEAD = ["Name", "Description", "Price", ""];

const TABLE_ROWS = [
  {
    name: "Mirror",
    description: "Mirror on the wall",
    price: 1,
  },
  {
    name: "Broom",
    description: "Broom on the wall",
    price: 2,
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products).products;

  useEffect(() => {
    const getProducts = async () => {
      await dispatch(getProductsList());
    };

    getProducts();
  }, []);

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
            products.map(({ name, description, price }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
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
                    >
                      Edit
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
