/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import NoPageFound from "./pages/404/NoPageFound";
import MyState from "./context/myState";
import Fashions from "./pages/items/Fashions/Fashions";
import Electronics from "./pages/items/Electronics/Electronics";
import MobilesAndTablets from "./pages/items/MobileAndTablets/MobilesAndTablets";
import AllItems from "./pages/items/AllItems/AllItems";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Order/Orders";
import Order from "./pages/Order/Order";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import Dashboard from "./pages/Admin/Dashboard/dashboard";
import { ToastContainer } from "react-toastify";
import UpdateModal from "./components/Modals/UpdateProducts";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <>
      <MyState>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fashions" element={<Fashions />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/mobile-and-tablets" element={<MobilesAndTablets />} />
          <Route path="/all-items" element={<AllItems />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoutes>
                <Orders />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoutes>
                <Checkout />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoutes>
                <Order />
              </ProtectedRoutes>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductInfo />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoutesForAdmin>
                <Dashboard />
              </ProtectedRoutesForAdmin>
            }
          />
          <Route
            path="/admin/update-product"
            element={
              <ProtectedRoutesForAdmin>
                <UpdateModal />
              </ProtectedRoutesForAdmin>
            }
          />
          <Route path="/*" element={<NoPageFound />} />
        </Routes>
      </MyState>
    </>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (
    localStorage.getItem("user") &&
    admin.user.email == import.meta.env.VITE_ADMIN_EMAIL
  ) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
