import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function AddBug() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Low",
    severity: "Minor",
    status: "Open",
    assignedTo: ""
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
    await API.post("/bugs", form);
    navigate("/dashboard");
  };

  return (
    <div className="form-page">
      <h1>Add New Bug</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Bug Title" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Bug Description"
          onChange={handleChange}
        />

        <input name="category" placeholder="Category" onChange={handleChange} />

        <select name="priority" onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <select name="severity" onChange={handleChange}>
          <option>Minor</option>
          <option>Major</option>
          <option>Critical</option>
        </select>

        <input
          name="assignedTo"
          placeholder="Assigned To"
          onChange={handleChange}
        />

        <button style={{ marginTop: "18px" }}>
          Submit Bug
        </button>

        <button
          type="button"
          className="secondary-btn"
          style={{ marginTop: "18px", marginLeft: "10px" }}
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default AddBug;