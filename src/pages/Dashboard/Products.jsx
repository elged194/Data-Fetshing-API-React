import React, { useContext, useState } from "react";
import { DashboardContext } from "../ApiContext";
import SnackbarDelete from "../../components/SnackbarDelete";

const Products = () => {
  const {
    products,
    newProduct,
    setNewProduct,
    addProduct,
    deleteProduct,
    setProducts,
    showSnackbarDelete,
    setShowSnackbarDelete,
  } = useContext(DashboardContext);

  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null); // لإدارة معرف العنصر المراد حذفه

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddOrUpdateProduct = () => {
    if (isEditing) {
      updateProduct();
    } else {
      addProduct();
    }
  };

  const updateProduct = async () => {
    const url = `http://localhost:4000/products/${productId}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const updatedProduct = await response.json();

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      setIsEditing(false);
      setNewProduct({ title: "", price: "", description: "", image: "" });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setProductId(product.id);
    setNewProduct(product);
  };

  return (
    <div>

      {/* Show Snackbar Delete*/}
      {showSnackbarDelete && (
        <SnackbarDelete
          deletItemCart={null} // لا حاجة لدالة الحذف من السلة هنا
          handelDelete={() => deleteProduct(deleteItemId)}
        />
      )}

      <h3>Products</h3>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={newProduct.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Price"
        name="price"
        value={newProduct.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={newProduct.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Image URL"
        name="image"
        value={newProduct.image}
        onChange={handleInputChange}
      />

      <button onClick={handleAddOrUpdateProduct}>
        {isEditing ? "Update Product" : "Add Product"}
      </button>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
            <div style={{ display: "flex" }}>
              <button
                onClick={() => handleEdit(product)}
                style={{ backgroundColor: "#444" }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteItemId(product.id); // تعيين معرف العنصر المراد حذفه
                  setShowSnackbarDelete(true); // Show Snackbar Delete
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
