import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import routes from "./utils/routesConfig";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map(({ path, component, name }) => (
            <Route index={name === 'Home'} key={path} path={path} Component={component} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
