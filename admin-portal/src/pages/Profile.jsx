import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const location = useLocation();
  const { state, dispatch } = useContext(AuthContext);
  const userData = location.state || state.user;

  const [form, setForm] = useState(userData);

  const handleSave = () => {
    dispatch({ type: "UPDATE_USER", payload: form });
    alert("Profile Updated Successfully");
  };

  return (
    <div className="page">
      <h2>Profile</h2>

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option>Admin</option>
        <option>User</option>
      </select>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Profile;
