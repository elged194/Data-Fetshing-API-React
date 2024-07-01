import React, { useContext } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./addProduct.css";
import { DashboardContext } from "../ApiContext";
import NotLogin from "../not login/notLogin";

const AddProduct = () => {
  const { newProduct, setNewProduct, addProduct, isLoggedIn } =
    useContext(DashboardContext);

  const navigate = useNavigate();

  // addProductItem
  const addProductItem = async (e) => {
    e.preventDefault();

    await addProduct();

    navigate("/");
  };

  if (isLoggedIn) {
    return (
      <>
        <Header />

        <div className={` model `}>
          <form action="" onSubmit={addProductItem}>
            <label htmlFor="">Title: </label>
            <input
              type="text"
              placeholder="Search..."
              required
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
            />

            <label htmlFor="">Image: </label>
            <input
              type="url"
              required
              placeholder="Search..."
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <label htmlFor="">Description: </label>
            <textarea
              rows="5"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            ></textarea>

            <label htmlFor="">Price: </label>
            <input
              type="text"
              placeholder="Search..."
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <button type="submit">Search</button>
          </form>
        </div>
        <Footer />
      </>
    );
  }else{
    return <NotLogin/>
  }
};

export default AddProduct;
