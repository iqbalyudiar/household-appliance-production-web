import { useEffect, useCallback } from "react";
import { Card, Typography, Spinner } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  getWarrantiesList,
  setWarrantyModal,
  setSelectedProduct,
} from "../../slice/warrantySlice";

interface IChangeStatus {
  id: string;
  type: string;
}

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
  const { warranties, isFetchingWarranties } = useAppSelector(
    (state) => state.warranty
  );
  const dispatch = useAppDispatch();

  const getWarranties = useCallback(async () => {
    await dispatch(getWarrantiesList());
  }, [dispatch]);

  useEffect(() => {
    getWarranties();
  }, [getWarranties]);

  const handleChangeStatus = ({ id, type }: IChangeStatus) => {
    dispatch(setSelectedProduct({ id }));
    dispatch(setWarrantyModal({ type, isOpen: true }));
  };

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

  if (isFetchingWarranties) {
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
                        {status === "pending" ? (
                          <>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium mr-3"
                              onClick={() =>
                                handleChangeStatus({
                                  id: _id,
                                  type: "approved",
                                })
                              }
                            >
                              Approve
                            </Typography>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="red"
                              className="font-medium"
                              onClick={() =>
                                handleChangeStatus({
                                  id: _id,
                                  type: "rejected",
                                })
                              }
                            >
                              Reject
                            </Typography>
                          </>
                        ) : (
                          "-"
                        )}
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
