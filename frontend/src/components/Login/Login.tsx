import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Login.css";

// Login page collecting ID and name, authenticating via backend
export default function Login() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!id || !name) {
      setError("Both ID and name are required");
      setIsLoading(false);
      return;
    }

    try {
      await api.convoys().postUser(parseInt(id), name);

      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify({
        id: parseInt(id),
        name: name
      }));

      // Clear form
      setId("");
      setName("");

      // redirect to home after success
      navigate("/home");
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred. Make sure the server is running.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // redirect immediately if already signed in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/home");
  }, [navigate]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className="error">{error}</div>}
        <label>
          ID
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={isLoading}
          />
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}