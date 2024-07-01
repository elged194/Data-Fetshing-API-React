import React, { useContext, useState } from "react";
import { DashboardContext } from "../ApiContext";

const Users = () => {
  const { users, newUser, setNewUser, addUser, deleteUser, setUsers } =
    useContext(DashboardContext);

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleAddOrUpdateUser = () => {
    if (isEditingUser) {
      updateUser();
    } else {
      addUser();
    }
  };

  const updateUser = async () => {
    const url = `http://localhost:4000/users/${userId}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const updatedUser = await res.json();

      setUsers((prevUser) =>
        prevUser.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );

      setIsEditingUser(false);
      setNewUser({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleEdit = (user) => {
    setIsEditingUser(true);
    setUserId(user.id);
    setNewUser(user);
  };

  return (
    <div>
      <h3>Users</h3>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={handleAddOrUpdateUser}>
        {isEditingUser ? "Update User" : "Add User"}
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id} : {user.username}
            <div style={{ display: "flex" }}>
              <button
                onClick={() => handleEdit(user)}
                style={{ backgroundColor: "#444" }}
              >
                Edit
              </button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
