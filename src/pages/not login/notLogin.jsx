import { Link } from "react-router-dom";
import Header from "../../components/header";
import "./notLogin.css";

const NotLogin = () => {
  return (
    <main>
      <Header />
      <div className="login-redirect">
        <i className="bx bx-log-in"></i>
        <h1>Please Login to Continue</h1>
        <div>
          <Link to="/login">LogIn </Link> or
          <Link to="/register"> Register</Link>
        </div>
      </div>
    </main>
  );
};

export default NotLogin;
