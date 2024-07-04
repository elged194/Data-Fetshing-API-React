import React, { useContext } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import "./FavoriteProducts.css";
import { DashboardContext } from "../ApiContext";
import NotLogin from "../not login/notLogin";

const FavoriteProducts = () => {
  const { isLoggedIn, favProduct, deletItemFavorit } =
    useContext(DashboardContext);

  // Not Login
  if (!isLoggedIn) {
    return <NotLogin />;
  }

  // is LoggedIn
  //   if (isLoggedIn) {
  return (
    <main className="favorite-products-container">
      <Header />
      <h3>Favorite Products</h3>
      <section className="products-list">
        {favProduct.length > 0 ? (
          favProduct.map((item) => (
            <article className="product-item" key={item.id}>
              <figure>
                <img src={item.image} alt={item.title} />
              </figure>
              <div className="product-details">
                <h3>{item.title}</h3>

                <div className="">
                  <p>${item.price}</p>
                  <i
                    className="bx bx-trash"
                    onClick={() => deletItemFavorit(item.id)}
                  ></i>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p>You haven't added Any favorite products yet.</p>
        )}

        {/* <p>لم تقم بإضافة أي منتجات مفضلة حتى الآن.</p> */}
      </section>
      <Footer />
    </main>
  );
};
// };

export default FavoriteProducts;
