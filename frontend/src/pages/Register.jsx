import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "tester"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Registration Successful");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange} />

          <input name="email" placeholder="Email" onChange={handleChange} />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <select name="role" onChange={handleChange}>
            <option>tester</option>
            <option>developer</option>
            <option>admin</option>
          </select>

          <button style={{ width: "100%", marginTop: "18px" }}>
            Register
          </button>

          <button
            type="button"
            className="secondary-btn"
            style={{ width: "100%", marginTop: "12px" }}
            onClick={() => navigate("/")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;