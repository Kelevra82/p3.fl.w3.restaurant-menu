import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./pages/Menu";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { OrderPage } from "./pages/OrderPage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/menu"
            element={<Menu />}
          />
          <Route
            path="/order"
            element={<OrderPage />}
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
