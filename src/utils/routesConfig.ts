import { ReactNode } from "react";
import LoginPage from "../pages/auth/LoginPage.tsx";
import RegisterPage from "../pages/auth/RegisterPage.tsx";
import ProductPage from "../pages/products/ProductPage";
import WarrantyPage from "../pages/warranty/WarrantyPage";
import HomePage from "../pages/Home/HomePage.tsx";
import NotFoundPage from "../pages/notfound/NotFoundPage";

interface RouteConfig {
    path: string;
    element?: ReactNode;
    component?: React.FC;
    layout?: ReactNode;
}

const routes: RouteConfig[] = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/products', component: ProductPage },
    { path: '/warranty', component: WarrantyPage },
    { path: '*', component: NotFoundPage }
]

export default routes