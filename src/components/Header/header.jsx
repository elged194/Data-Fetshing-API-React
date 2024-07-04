import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { DashboardContext } from "../../pages/ApiContext";
import { useContext } from "react";

const Header = () => {
  const { quantityCart, logout, isLoggedIn, currentUser } =
    useContext(DashboardContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1>
        <Link to="/">Sons...</Link>
      </h1>

      <ul className="nav-links">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        {isLoggedIn ? (
          ""
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">SignUp</Link>
            </li>
          </>
        )}

        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

      <div className="header-icons">
        {isLoggedIn ? (
          <i className="bx bx-log-out" onClick={logout}></i>
        ) : (
          <i className="bx bx-log-in" onClick={() => navigate("/login")}></i>
        )}

        <div className="MyProfile-header">
          <i
            className="bx bx-user-pin"
            onClick={() => navigate("/MyProfile")}
          ></i>

          {isLoggedIn && (
            <div className="profile-card">
              <img
                src={currentUser?.image || "https://via.placeholder.com/85"}
                alt="Profile"
                className="profile-image"
              />
              <div className="profile-details">
                <h2>{currentUser?.username}</h2>
              </div>
            </div>
          )}
        </div>

        <i
          className="bx bx-heart"
          onClick={() => navigate("/favoriteProducts")}
        ></i>

        <i className="bx bx-cart-alt" onClick={() => navigate("/cart")}>
          <span>{quantityCart}</span>
        </i>

        <button onClick={() => navigate("/AddItem")}>New Product</button>
      </div>
    </header>
  );
};

export default Header;
