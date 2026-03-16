import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./pages/Menu";
import { Error } from "./pages/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route
            path="/"
            element={<Home />}
          /> */}
          <Route
            path="/menu"
            element={<Menu />}
          />
          <Route
            path="/*"
            element={<Error />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
