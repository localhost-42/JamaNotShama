import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../../api";
import axios from "axios";

// Login page collecting ID and name, authenticating via backend
export const Login: FC = () => {
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
      setError("חובה להכניס שם ומספר חניך");
      setIsLoading(false);
      return;
    }
    

    try {
      await api.users().postUser(parseInt(id), name);

      // Save user info to localStorage
      localStorage.setItem("name", name);
      localStorage.setItem("id", id);

      // Clear form
      setId("");
      setName("");

      // redirect to home after success
      navigate("/home");
    } catch (err: unknown) {
      let msg = "An error occurred. Maybe you are an idiot.";

      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.error || err.message || msg;
      }

      setError(msg);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // redirect immediately if already signed in
  useEffect(() => {
    const userName = localStorage.getItem("name");
    if (userName) navigate("/home");
  }, [navigate]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>התחברות</h1>
        {error && <div className="error">{error}</div>}
        <label>
          מספר חניך
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={isLoading}
          />
        </label>
        <label>
          שם מלא
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
};
