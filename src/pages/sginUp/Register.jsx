import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/header";
import "./style.css";
import { DashboardContext } from "../ApiContext";

const Register = () => {
  const { newUser, setNewUser, addUser, usersErrMsg } =
    useContext(DashboardContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const addUsers = addUser();

    if (addUsers) {
      setIsLoading(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      usersErrMsg();
    }
  };

  return (
    <>
      <Header />
      <div className="register">
        <h2>Register</h2> <br />
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            required
          />

          <input
            type="email"
            name="email"
            placeholder="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />
          <button type="submit">{isLoading ? "Loading..." : "SginUp"}</button>
        </form>
      </div>
    </>
  );
};

export default Register;
