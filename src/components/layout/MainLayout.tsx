import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import NavbarDefault from "../navbar/Navbar";

const excludedRoutes = ["login", "register"];
const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const handleOpen = () => setisSidebarOpen(true);
  const handleClose = () => setisSidebarOpen(false);
  const isExcluded = excludedRoutes.includes(
    location.pathname.replace("/", "")
  );

  return (
    <>
      {!isExcluded ? (
        <NavbarDefault isOpen={isSidebarOpen} handleOpen={handleOpen} />
      ) : (
        ""
      )}
      <Outlet />
      <Sidebar
        isOpen={isSidebarOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default MainLayout;
