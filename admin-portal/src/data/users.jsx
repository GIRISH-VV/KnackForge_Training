import { useState } from "react";
import usersData from "./users";
import UserModal from "../components/UserModal";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const filteredUsers = usersData.filter(
    (u) =>
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())) &&
      (role ? u.role === role : true)
  );

  return (
    <div className="page">
      <h2>Users</h2>

      <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="">All</option>
        <option>Admin</option>
        <option>User</option>
      </select>

      {filteredUsers.map((u) => (
        <div key={u.id} className="list-item">
          {u.name}
          <button onClick={() => setSelectedUser(u)}>View</button>
          <button onClick={() => navigate("/profile", { state: u })}>
            View Profile
          </button>
        </div>
      ))}

      {selectedUser && (
        <UserModal user={selectedUser} close={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default Users;
