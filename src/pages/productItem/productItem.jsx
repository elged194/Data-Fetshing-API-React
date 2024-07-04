import React, { useContext } from "react";
import UseFetsh from "../../useFetsh";
import { useNavigate, useParams } from "react-router";
import { DashboardContext } from "../ApiContext";
import "./productItem.css";
import NotLogin from "../not login/notLogin";
import SnackbarCart from "../../components/Snackbar/SnackbarCart";
import SnackbarDelete from "../../components/Snackbar/SnackbarDelete";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";

const ProductItem = () => {
  const {
    deleteProduct,
    isLoggedIn,
    handleAddToCart,
    showSnackbarCart,
    showSnackbarDelete,
    setShowSnackbarDelete,
    // favProduct,
    // deletItemFavorit,
    // addMyFavorite,
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
          <SnackbarDelete
            handelDelete={() => handelDelete(data.id)}
            deletItemCart={null}
          />
        )}

        <section>
          <article>
            <figure>
              <img src={data.image} alt="" />
            </figure>

            <div className="productItemDetel">
              <div>
                <h3>{data.title}</h3>
                <h5> ${data.price}</h5>

                <div className="ratings">
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i>
                  <i class="bx bxs-star-half"></i>
                </div>
                <p>Course • Mindful Mike</p>
                <p>{data.description}</p>
              </div>

              <div className="actions">
                <button
                  onClick={() => {
                    setShowSnackbarDelete(true); // Show Snackbar Delete
                  }}
                >
                  Delete
                </button>

                {/* {favProduct.some((favItem) => favItem.id === data.id) ? (
                  <i
                    class="bx bxs-heart-circle"
                    onClick={() => deletItemFavorit(data.id)}
                  ></i>
                ) : (
                  <i
                    class="bx bx-heart-circle"
                    onClick={() => addMyFavorite(data.id)}
                  ></i>
                )} */}

                <button
                  onClick={() => {
                    handleAddToCart(data.id); // Add Item In Cart
                  }}
                  className="add-to-cart"
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
