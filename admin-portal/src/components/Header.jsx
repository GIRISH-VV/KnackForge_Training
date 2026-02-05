import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <h2 className="logo" onClick={() => navigate("/")}>
        Admin Portal
      </h2>

      <div className="header-right">
        <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
          Toggle Theme
        </button>

        <div className="profile">
          <span onClick={() => setOpen(!open)}>👤</span>

          {open && (
            <div className="dropdown">
              <p onClick={() => navigate("/profile")}>Profile</p>
              <p onClick={() => dispatch({ type: "LOGOUT" })}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
