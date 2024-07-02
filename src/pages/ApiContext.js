import React, { createContext, useState, useEffect } from "react";
import UseFetsh from "../useFetsh";

const DashboardContext = createContext();

const Provider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  // ---------------------- / Get User && Product /----------------------------
  // ---- / Get User /-----
  const {
    data: usersData,
    loading: usersLoading,
    errMsg: usersErrMsg,
  } = UseFetsh("http://localhost:4000/users");

  useEffect(() => {
    if (usersData) setUsers(usersData);
  }, [usersData]);

  // ---- / Get products /-----
  const {
    data: productsData,
    loading: productsLoading,
    errMsg: productsErrMsg,
  } = UseFetsh("http://localhost:4000/products");

  useEffect(() => {
    if (productsData) setProducts(productsData);
  }, [productsData]);

  // ---------------------- / Add User && Product /----------------------------
  // ---- / Add User /-----
  const addUser = async () => {
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();
    setUsers([...users, data]);
    setNewUser({ username: "", email: "", password: "" });
  };

  // ---- / Add Product /-----
  const addProduct = async () => {
    const response = await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    setProducts([...products, data]);
    setNewProduct({ title: "", price: "", description: "", image: "" });
  };

  // ---------------------- / Delete User && Product /----------------------------
  // ---- / Delete User /-----
  const deleteUser = async (id) => {
    await fetch(`http://localhost:4000/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((user) => user.id !== id));
  };

  // ---- / Delete Product /-----
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:4000/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((product) => product.id !== id));
    setShowSnackbarDelete(false); // Show Snackbar Delete
  };

  // ---------------------- / check User Account && Login /----------------------------
  const [isLoginEnabled, setIsLoginEnabled] = useState(true); // متغير حالة لتفعيل أو إيقاف تسجيل الدخول
  const alwaysAllowedUser = "elged194@gmail.com"; // البريد الإلكتروني للمستخدم الذي يُسمح له دائمًا بتسجيل الدخول

  const [checkUser, setCheckUser] = useState({
    email: "",
    password: "",
  });

  const checkUserAcc = () => {
    if (checkUser.email === alwaysAllowedUser || isLoginEnabled) {
      const user = users.find(
        (user) =>
          user.email === checkUser.email && user.password === checkUser.password
      );

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // تخزين معلومات المستخدم في localStorage
        setCurrentUser(user);
        setIsLoggedIn(true);
        return true;
      } else {
        setIsLoggedIn(false);
        return false;
      }
    } else {
      alert("تم إيقاف تسجيل الدخول حالياً.");
      return false;
    }
  };

  // ---------------------- / Show User Account in My Profile /----------------------------
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(loggedInUser)); // تعيين المستخدم الحالي في حالة التطبيق
    }
  }, [setIsLoggedIn, setCurrentUser]);

  // ---------------------- / LogOut User in Account /----------------------------
  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCart([]); // حزف محتوي الcart
    localStorage.removeItem("loggedInUser"); // إزالة بيانات المستخدم من localStorage
  };

  // ---------------------- / Show Cart /----------------------------
  const [cart, setCart] = useState([]);
  let quantityCart = cart.length;
  const [totalPrice, setTotalPrice] = useState(0);

  const addCart = (id) => {
    const product = products.find((product) => product.id === id);

    const isProductInCart = cart.some((cartItem) => cartItem.id === id);

    if (!isProductInCart) {
      setCart([...cart, product]);
    }
  };

  const deletItemCart = (id) => {
    const product = cart.filter((product) => product.id !== id);
    setCart(product);
    setShowSnackbarDelete(false);
  };

  // ---------------------- / Show snackbar Cart /----------------------------
  const [showSnackbarCart, setShowSnackbarCart] = useState(false);

  const handleAddToCart = (id) => {
    addCart(id);
    setShowSnackbarCart(true);

    setTimeout(() => {
      setShowSnackbarCart(false);
    }, 2500); // Hide the snackbar after 3 seconds
  };

  // ---------------------- / Show snackbar Delete /----------------------------
  const [showSnackbarDelete, setShowSnackbarDelete] = useState(false);

  // ------------------------------------------------------------------------------
  return (
    <DashboardContext.Provider
      value={{
        users,
        setUsers,
        products,
        setProducts,
        newUser,
        setNewUser,
        newProduct,
        setNewProduct,
        addUser,
        addProduct,
        deleteUser,
        deleteProduct,
        usersLoading,
        productsLoading,
        usersErrMsg,
        productsErrMsg,

        // user
        checkUser,
        setCheckUser,
        checkUserAcc,
        isLoggedIn,
        currentUser,
        setCurrentUser,
        setIsLoggedIn,
        logout,
        setIsLoginEnabled,
        isLoginEnabled,

        // Show Cart
        cart,
        addCart,
        quantityCart,
        totalPrice,
        setTotalPrice,

        // total,
        deletItemCart,

        // show Snackbar
        showSnackbarCart,
        handleAddToCart,

        // show Snackbar Delete
        showSnackbarDelete,
        setShowSnackbarDelete,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, Provider };
