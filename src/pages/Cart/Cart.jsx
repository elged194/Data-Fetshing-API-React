import React, { useContext, useEffect, useState } from "react";
import "./Cart.css"; // استيراد ملف الـ CSS لتنسيق الصفحة
import { DashboardContext } from "../ApiContext";
import Header from "../../components/header";
import { useNavigate } from "react-router";
import SnackbarDelete from "../../components/SnackbarDelete";
import NotLogin from "../not login/notLogin";

const Cart = () => {
  const {
    cart,
    quantityCart,
    deletItemCart,
    showSnackbarDelete,
    setShowSnackbarDelete,
    isLoggedIn,
    totalPrice,
    setTotalPrice,
  } = useContext(DashboardContext);
  const navigate = useNavigate();
  const [deleteItemId, setDeleteItemId] = useState(null); // لإدارة معرف العنصر المراد حذفه
  let total = 0;

  useEffect(() => {
    setTotalPrice(total);
  }, [setTotalPrice, total, totalPrice, deletItemCart]);

  // Render NotLogin component if user is not logged in
  if (!isLoggedIn) {
    return <NotLogin />;
  }

  return (
    <main>
      <Header />

      {/* Show Snackbar Delete*/}
      {showSnackbarDelete && (
        <SnackbarDelete
          deletItemCart={() => deletItemCart(deleteItemId)}
          handelDelete={null} // لا حاجة لدالة الحذف من المنتج هنا
        />
      )}

      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="cart-items">
          {cart.map((item) => {
            total += Number(item.price);

            return (
              <div className="cart-item" key={item.id}>
                <img
                  className="product-image"
                  src={item.image}
                  alt="Product"
                  onClick={() => navigate(`/productItem/${item.id}`)}
                />
                <div
                  className="product-details"
                  onClick={() => navigate(`/productItem/${item.id}`)}
                >
                  <h3 className="product-title">{item.title}</h3>
                  <p className="product-price">${item.price}</p>
                  {/* <p className="product-quantity">Quantity: 1</p> */}
                </div>
                <button
                  className="btn-remove"
                  onClick={() => {
                    setDeleteItemId(item.id); // تعيين معرف العنصر المراد حذفه
                    setShowSnackbarDelete(true); // Show Snackbar Delete
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <p>Total Items: {quantityCart}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button
            className="btn-checkout"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
