import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const user = loginService(email, password);
    if (!user) {
      setError("Invalid credentials");
      return;
    }

    dispatch({ type: "LOGIN", payload: user });
    navigate("/");
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
