import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from './utils/routesConfig'
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, component }) => (
          <Route key={path} path={path} Component={component} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
