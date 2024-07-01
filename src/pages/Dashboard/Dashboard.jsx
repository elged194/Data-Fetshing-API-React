import { useContext } from "react";
import "./Dashboard.css";
import Header from "../../components/header";
import { DashboardContext } from "../ApiContext";
import Users from "./Users";
import Products from "./Products";
import NotLogin from "../not login/notLogin";

const Dashboard = () => {
  const {
    usersLoading,
    productsLoading,
    usersErrMsg,
    productsErrMsg,
    isLoggedIn,
    isLoginEnabled,
    setIsLoginEnabled,
  } = useContext(DashboardContext);

  if (usersLoading || productsLoading) {
    return <div>Loading...</div>;
  }

  if (usersErrMsg || productsErrMsg) {
    return <div>Error: {usersErrMsg || productsErrMsg}</div>;
  }

  const toggleLogin = () => {
    setIsLoginEnabled(!isLoginEnabled);
  };

  if (isLoggedIn) {
    return (
      <>
        <Header />
        <div className="dashboard">
          <h2 style={{ textAlign: "center" }}>Dashboard</h2>

          <div className="LoginEnabled">
            <button onClick={toggleLogin}
            style={
              isLoginEnabled
                ? { backgroundColor: "#28a745" }
                : { backgroundColor: "#c82333" }
            }
            >
              {isLoginEnabled ?  "Activate Login" : "Deactivate Login" }
            </button>
          </div>
          <Users />
          <Products />
        </div>
      </>
    );
  } else {
    return <NotLogin />;
  }
};
export default Dashboard;
