import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// When a user hits the root path, decide whether to send them to login or home
export function EntryRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      navigate("/home", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return null;
}
