import React, { MouseEventHandler } from "react";
import { Drawer, Typography, List, ListItem } from "@material-tailwind/react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../features/auth/slice/authSlice";
import { onClose } from "@material-tailwind/react/types/components/alert";
import routes from "../../utils/routesConfig";
import { STORAGE_AUTH_TOKEN } from "../../features/auth/constant";
import { normalizedName } from "../../utils/helper";
interface IProps {
  isOpen: boolean;
  handleOpen?: MouseEventHandler<HTMLButtonElement>;
  handleClose?: onClose;
}

const excludedRoutes = ["notfound", "login", "register"];

const Sidebar: React.FC<IProps> = ({ isOpen, handleClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const sidebarRoutes = routes.filter((route) => {
    return !excludedRoutes.includes(normalizedName(route?.name));
  });

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose && handleClose();
  };
  const handleLogout = () => {
    handleClose && handleClose();
    setTimeout(() => {
      dispatch(logout());
    }, 100);
  };
  const isActive = (path: string) => {
    const queryPath = location.pathname.replace("/", "");
    return queryPath === path;
  };

  const token = localStorage.getItem(STORAGE_AUTH_TOKEN);
  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} className="p-4">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Household Appliance Production
          </Typography>
        </div>
        <List>
          {sidebarRoutes.map(({ name, path, icon }, index) => (
            <ListItem
              className={isActive(path) ? "bg-black text-white" : ""}
              key={index}
              onClick={() => handleNavigate(path)}
            >
              {name}
            </ListItem>
          ))}
          {token ? (
            <ListItem className="text-red-900" onClick={handleLogout}>
              Logout
            </ListItem>
          ) : (
            <>
              <ListItem
                className="text-blue-700"
                onClick={() => handleNavigate("login")}
              >
                Login
              </ListItem>
              <ListItem
                className="bg-blue-700/25 text-white w-1/2"
                onClick={() => handleNavigate("register")}
              >
                Register
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
