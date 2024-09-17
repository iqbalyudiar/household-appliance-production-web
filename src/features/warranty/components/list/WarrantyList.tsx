import { useEffect, useCallback } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getWarrantiesList } from "../../slice/warrantySlice";

const TABLE_HEAD = [
  "Claim ID",
  "Product Name",
  "User Email",
  "Issued Date",
  "Expired Date",
  "Status",
  "Action",
];
const WarrantyList = () => {
  const { warranties } = useAppSelector((state) => state.warranty);
  const dispatch = useAppDispatch();

  const getWarranties = useCallback(async () => {
    await dispatch(getWarrantiesList());
  }, [dispatch]);

  useEffect(() => {
    getWarranties();
  }, [getWarranties]);

  const handleApprove = (id) => {};
  const handleReject = (id) => {};

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

  console.log(warranties);
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
          {warranties && warranties.length > 0 ? (
            warranties
              .map(({ _id, product, user, issueDate, expiryDate, status }) => ({
                _id,
                issueDate,
                expiryDate,
                status,
                productName: product?.name,
                productId: product?.id,
                userId: user?.id,
                userEmail: user?.email,
              }))
              .map(
                (
                  {
                    _id,
                    productName,
                    userEmail,
                    issueDate,
                    expiryDate,
                    status,
                  },
                  index
                ) => {
                  const isLast = index === warranties.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {_id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {productName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {userEmail}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {issueDate}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {expiryDate}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`font-normal uppercase ${classStatus(
                            status
                          )}`}
                        >
                          {status}
                        </Typography>
                      </td>
                      <td className={`${classes} flex`}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium mr-3"
                          onClick={() => handleApprove(_id)}
                        >
                          Approve
                        </Typography>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="red"
                          className="font-medium"
                          onClick={() => handleReject(_id)}
                        >
                          Reject
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )
          ) : (
            <Typography variant="paragraph" className="text-center text-lg">
              Warranty List Data Not Found
            </Typography>
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default WarrantyList;
