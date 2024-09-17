import { ReactNode } from "react";
import LoginPage from "../pages/auth/LoginPage.tsx";
import RegisterPage from "../pages/auth/RegisterPage.tsx";
import ProductPage from "../pages/products/ProductPage";
import WarrantyPage from "../pages/warranty/WarrantyPage";
import HomePage from "../pages/Home/HomePage.tsx";
import NotFoundPage from "../pages/notfound/NotFoundPage";

import {
    HomeIcon
  } from "@heroicons/react/24/solid";


interface RouteConfig {
  name: string;
  path: string;
  element?: ReactNode;
  component?: React.FC;
  layout?: ReactNode;
  icon?: any;
}

const routes: RouteConfig[] = [
  { name: "Home", path: "", component: HomePage, icon: HomeIcon },
  { name: "Login", path: "login", component: LoginPage },
  { name: "Register", path: "register", component: RegisterPage },
  { name: "Product", path: "products", component: ProductPage },
  { name: "Warranty", path: "warranty", component: WarrantyPage },
  { name: "Not Found", path: "*", component: NotFoundPage },
];

export default routes;
