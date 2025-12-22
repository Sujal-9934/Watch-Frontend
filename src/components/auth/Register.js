import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import 'assets/styles/register.css';

const Register = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    city: "",
    dob: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState(null); // null | 'checking' | 'ok' | 'down'
  const [mockMode, setMockMode] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkServer = async () => {
    setServerStatus('checking');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    try {
      const res = await fetch('http://localhost:5000/', { method: 'GET', signal: controller.signal });
      clearTimeout(timeout);
      if (res.ok) {
        setServerStatus('ok');
      } else {
        setServerStatus('down');
      }
    } catch (err) {
      console.error('Server check failed', err);
      setServerStatus('down');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      if (mockMode) {
        // Simulate a server delay + success
        await new Promise((r) => setTimeout(r, 500));
        alert("Mock registration successful!");
        setFormData({ username: "", email: "", city: "", password: "", confirmPassword: "" });
      } else {
        const url = "http://localhost:5000/api/harsh/register";
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            city: formData.city,
            dob: formData.dob,
            address: formData.address,
            password: formData.password,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || `Registration failed (${res.status})`);
        }

        alert(data.message || "Registration Successful!");
        setFormData({ username: "", email: "", city: "", dob: "", address: "", password: "", confirmPassword: "" });
      }
      // Optionally redirect: history.push('/');
    } catch (err) {
      console.error("Register error:", err);
      // Network errors (server unreachable, CORS, DNS) throw a TypeError in fetch
      if (err instanceof TypeError) {
        setError(`Network error: Failed to reach http://localhost:5000/api/harsh/register — is the server running?`);
      } else {
        setError(err.message || "An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <div className="two-column">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="two-column">
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="two-column">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error-message" style={{ color: "#ef4444", marginBottom: "8px" }}>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
    </div>
  );
};

export default Register;
