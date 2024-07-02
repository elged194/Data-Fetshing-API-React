import { useContext } from "react";
import "./Comp.css";
import { DashboardContext } from "../pages/ApiContext";

const SnackbarCart = () => {
  const { showSnackbarCart } = useContext(DashboardContext); // context Api

  return (
    <div className={` snackbar-cart  ${showSnackbarCart ? "show" : "hide"}`}>
      Added to the shopping cart <i className="bx bx-check-circle"></i>
    </div>
  );
};

export default SnackbarCart;
