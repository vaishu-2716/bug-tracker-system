import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const navigate = useNavigate();

  const getBugs = async () => {
    const res = await API.get("/bugs");
    setBugs(res.data);
  };

  useEffect(() => {
    getBugs();
  }, []);

  const deleteBug = async (id) => {
    await API.delete(`/bugs/${id}`);
    getBugs();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/bugs/${id}`, { status });
    getBugs();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const filteredBugs = bugs.filter((bug) => {
    const matchesSearch =
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || bug.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || bug.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="dashboard">
      <div className="navbar">
        <h1>Bug Tracker Dashboard</h1>

        <div>
          <button onClick={() => navigate("/add-bug")}>Add New Bug</button>
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </div>
      </div>

      <h2>Total Bugs: {filteredBugs.length}</h2>

      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Update Status</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredBugs.map((bug) => (
            <tr key={bug._id}>
              <td>{bug.title}</td>
              <td>{bug.priority}</td>
              <td>{bug.severity}</td>
              <td>{bug.status}</td>
              <td>{bug.assignedTo}</td>

              <td>
                <select
                  value={bug.status}
                  onChange={(e) => updateStatus(bug._id, e.target.value)}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </td>

              <td>
                <button onClick={() => deleteBug(bug._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredBugs.length === 0 && <p>No matching bugs found.</p>}
    </div>
  );
}

export default Dashboard;