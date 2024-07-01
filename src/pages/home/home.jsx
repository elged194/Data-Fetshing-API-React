import { useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import PriceFilter from "./PriceFilter";
import Footer from "../../components/footer";
import "./home.css";
import { DashboardContext } from "../ApiContext";
import NotLogin from "../not login/notLogin";
import SnackbarCart from "../../components/SnackbarCart";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const {
    products,
    productsLoading,
    productsErrMsg,
    isLoggedIn,
    handleAddToCart,
    showSnackbarCart,
  } = useContext(DashboardContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    // يمكنك استخدام هذا المؤثر الجانبي لإعادة الاستعلام عن المنتجات عند الحاجة
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      .filter((item) => {
        switch (priceFilter) {
          case "range1":
            return item.price <= 30;
          case "range2":
            return item.price > 15 && item.price <= 50;
          case "range3":
            return item.price > 50 && item.price <= 200;
          default:
            return true;
        }
      });
  }, [products, search, priceFilter]);

  // productsErrMsg
  if (productsErrMsg) {
    return <div className="error-message">Error...</div>;
  }

  // productsLoading
  if (productsLoading) {
    return <Loading/>
  }

  // Render NotLogin component if user is not logged in
  if (!isLoggedIn) {
    return <NotLogin />;
  }

  // Render Home Page component if user is logged in
  return (
    <main className="home">
      <Header />

      {/* Show Snackbar */}
      {showSnackbarCart && <SnackbarCart />}

      <div className="search-filter-container" style={{ textAlign: "center" }}>
        <PriceFilter
          setPriceFilter={setPriceFilter}
          priceFilter={priceFilter}
        />

        <input
          type="text"
          placeholder="Search for a product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <hr />

      <section className="products-list">
        {filteredProducts.map((product) => (
          <article key={product.id} className="product-item">
            <figure onClick={() => navigate(`/productItem/${product.id}`)}>
              <img src={product.image} alt={product.title} />
            </figure>

            <div className="product-details">
              <div>
                <h3>{product.title}</h3>
                <p>Course • Mindful Mike</p>
              </div>

              <div>
                <h5>${product.price}</h5>
                <button onClick={() => handleAddToCart(product.id)}>
                  <i className="bx bx-cart-alt"></i> Add To Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
      <Footer />
    </main>
  );
};

export default Home;
