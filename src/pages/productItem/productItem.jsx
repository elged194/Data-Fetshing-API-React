import React, { useContext } from "react";
import UseFetsh from "../../useFetsh";
import { useNavigate, useParams } from "react-router";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { DashboardContext } from "../ApiContext";
import "./productItem.css";
import NotLogin from "../not login/notLogin";
import SnackbarCart from "../../components/SnackbarCart";
import SnackbarDelete from "../../components/SnackbarDelete";

const ProductItem = () => {
  const {
    deleteProduct,
    isLoggedIn,
    handleAddToCart,
    showSnackbarCart,
    showSnackbarDelete,
    setShowSnackbarDelete,
  } = useContext(DashboardContext); // context Api
  let { id } = useParams(); // get id from Params
  const navigate = useNavigate(); // Navigate

  // Get Data Product Item
  const { data, loding, errMsg } = UseFetsh(
    `http://localhost:4000/products/${id}`
  );

  // Handel Delete Item
  const handelDelete = (id) => {
    deleteProduct(id); //Delete Item Of Product
    setShowSnackbarDelete(false); // End Snackbar Delete
    navigate("/");
  };

  // errMsg
  if (errMsg) {
    return <div>Error...</div>;
  }

  // loding
  if (loding) {
    return <div>Loding.....</div>;
  }

  // Not Login
  if (!isLoggedIn) {
    return <NotLogin />;
  }

  // isLoggedIn
  if (isLoggedIn) {
    return (
      <main className="productItem">
        <Header />

        {/* Show Snackbar Cart*/}
        {showSnackbarCart && <SnackbarCart />}

        {/* Show Snackbar Delete*/}
        {showSnackbarDelete && (
          <SnackbarDelete handelDelete={() => handelDelete(data.id)} deletItemCart={null} />
        )}

        <section>
          <article>
            <figure>
              <img src={data.image} alt="" />
            </figure>

            <div className="productItemDetel">
              <div>
                <h3>{data.title}</h3>
                <h5> price: ${data.price}</h5>
                <p>Course • Mindful Mike</p>
                <p>{data.description}</p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setShowSnackbarDelete(true); // Show Snackbar Delete
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(data.id); // Add Item In Cart
                  }}
                  style={{ marginLeft: "10px", backgroundColor: "#444" }}
                >
                  <i className="bx bx-cart-alt"></i> Add To Cart
                </button>
              </div>
            </div>
          </article>
        </section>

        <Footer />
      </main>
    );
  }
};

export default ProductItem;
