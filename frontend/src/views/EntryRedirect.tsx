import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// When a user hits the root path, decide whether to send them to login or home
export function EntryRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home", { replace: true });
    } else {
      navigate("/func/login", { replace: true });
    }
  }, [navigate]);

  return null;
}
