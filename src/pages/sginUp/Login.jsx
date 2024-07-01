import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { DashboardContext } from "../ApiContext";

const Login = () => {
  const { checkUser, setCheckUser, checkUserAcc } =
    useContext(DashboardContext);

  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // معالجة إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const isUserValid = checkUserAcc();

    if (!isUserValid) {
      setErrorMsg("Invalid email or password");
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/");
        setCheckUser({ email: "", password: "" });
      }, 1000);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={checkUser.email}
          onChange={(e) =>
            setCheckUser({ ...checkUser, email: e.target.value })
          }
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={checkUser.password}
          onChange={(e) =>
            setCheckUser({ ...checkUser, password: e.target.value })
          }
          required
        />

        {errorMsg && (
          <p className="error" style={{ color: "red" }}>
            {errorMsg}
          </p>
        )}

        <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
