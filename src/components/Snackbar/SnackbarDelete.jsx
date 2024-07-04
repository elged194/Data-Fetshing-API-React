import React, { useContext } from "react";
import { DashboardContext } from "../../pages/ApiContext";
import "./Snackbar.css";

const SnackbarDelete = ({ handelDelete, deletItemCart }) => {
  const { setShowSnackbarDelete } = useContext(DashboardContext); // context Api

  return (
    <div className="snackbar-bg">
      <div className="snackbar show">
        <p>Are you sure you want to delete?</p>
        <div className="snackbar-buttons">
          <button
            className="confirm-btn"
            onClick={() => {
              if (handelDelete) {
                handelDelete();
              } else if (deletItemCart) {
                deletItemCart();
              }
            }}
          >
            Yes
          </button>
          <button
            className="cancel-btn"
            onClick={() => setShowSnackbarDelete(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnackbarDelete;
