import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/notFound";
// import Update from "./pages/Update/Update";
import Register from "./pages/sginUp/Register";
import ProductItem from "./pages/productItem/productItem";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddProduct from "./pages/AddProduct/addProduct";
import Home from "./pages/home/home";
import Login from "./pages/sginUp/Login";
import { Provider } from "./pages/ApiContext";
import Cart from "./pages/Cart/Cart";
import MyProfile from "./pages/MyProfile/MyProfile";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* API Context */}
        <Provider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/productItem/:id" element={<ProductItem />} />
            <Route path="/AddItem" element={<AddProduct />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
