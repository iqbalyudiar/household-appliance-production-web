import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import routes from "./utils/routesConfig";
import { normalizedName } from "./utils/helper";
import ProtectedRoute from "./components/route/ProtectedRoute";
import PublicRoute from "./components/route/PublicRoute";
import "./App.css";

const protectedRoutes = ["warranty"];
const publicRoutes = ["login", "register"];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map(({ path, name, component: Component }) => {
            if (protectedRoutes.includes(normalizedName(name))) {
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedRoute>
                      <Component />
                    </ProtectedRoute>
                  }
                />
              );
            } else if (publicRoutes.includes(normalizedName(name))) {
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PublicRoute>
                      <Component />
                    </PublicRoute>
                  }
                />
              );
            } else {
              return (
                <Route
                  index={name === "Home"}
                  key={path}
                  path={path}
                  element={<Component />} // Use element instead of Component
                />
              );
            }
          })}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
