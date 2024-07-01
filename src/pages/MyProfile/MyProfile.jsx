import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/header";
import './MyProfile.css'
import { DashboardContext } from "../ApiContext";
import NotLogin from "../not login/notLogin";

const MyProfile = () => {
  const { currentUser, setCurrentUser, isLoggedIn } =
    useContext(DashboardContext);

  const [profileImage, setProfileImage] = useState(
    currentUser?.image || "https://via.placeholder.com/85"
  );

  useEffect(() => {
    if (currentUser?.image) {
      setProfileImage(currentUser.image);
    }
  }, [currentUser]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl);
        // Update the image in currentUser
        setCurrentUser((prevUser) => ({ ...prevUser, image: imageUrl }));
        // Store the updated user in localStorage
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...currentUser, image: imageUrl })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Render NotLogin component if user is not logged in
  if (!isLoggedIn) {
    return <NotLogin />;
  }

  // Render MyProfile component if user is logged in
  return (
    <main className="profile-container">
      <Header />

      <div className="profile-card">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="file-input"
          style={{ display: "none" }}
        />
        <label htmlFor="file-input">
          <i className="bx bx-edit"></i>
          <img
            src={profileImage}
            alt="Profile"
            className="profile-image"
            style={{ cursor: "pointer" }}
          />
        </label>
        <div className="profile-details">
          <h2>{currentUser.username}</h2>
          <p>Email: {currentUser.email}</p>
          <p>Password: {currentUser.password}</p>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
