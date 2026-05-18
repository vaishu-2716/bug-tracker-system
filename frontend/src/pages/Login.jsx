import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("vaishu@test.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Bug Tracker</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={{ width: "100%", marginTop: "18px" }}>
            Login
          </button>

          <button
            type="button"
            className="secondary-btn"
            style={{ width: "100%", marginTop: "12px" }}
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;