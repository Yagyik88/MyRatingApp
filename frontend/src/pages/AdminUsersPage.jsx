import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  // ADMIN ONLY CHECK
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/login");
    // eslint-disable-next-line
  }, []);

  const loadUsers = () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          ...filters,
          sortBy,
          order,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, [sortBy, order]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsers();
  };

  const openUserDetails = (id) => {
    navigate(`/admin/users/${id}`);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="h1">Users List</h1>

        {/* FILTER SECTION */}
        <form className="filter-grid" onSubmit={handleSearch}>
          <div className="field">
            <label>Name</label>
            <input
              className="input"
              placeholder="Search Name"
              value={filters.name}
              onChange={(e) =>
                setFilters({ ...filters, name: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              className="input"
              placeholder="Search Email"
              value={filters.email}
              onChange={(e) =>
                setFilters({ ...filters, email: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>Address</label>
            <input
              className="input"
              placeholder="Search Address"
              value={filters.address}
              onChange={(e) =>
                setFilters({ ...filters, address: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>Role</label>
            <select
              className="select"
              value={filters.role}
              onChange={(e) =>
                setFilters({ ...filters, role: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="admin">Admin</option>
              <option value="normal">Normal</option>
              <option value="store_owner">Store Owner</option>
            </select>
          </div>

          <button className="btn" style={{ marginTop: "26px" }}>
            Search
          </button>
        </form>

        {/* SORTING SECTION */}
        <div className="sort-bar">
          <label>Sort By:</label>

          <select
            className="select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="address">Address</option>
          </select>

          <select
            className="select"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>

        {/* USER LIST */}
        <div className="list-container">
          {users.map((user) => (
            <div
              key={user.id}
              className="list-card"
              onClick={() => openUserDetails(user.id)}
            >
              <h2 className="list-title">{user.name}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
