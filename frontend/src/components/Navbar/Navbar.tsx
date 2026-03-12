import type { FC } from "react";
import { useRef, useState } from "react";
import { routes } from "../../router/paths";
import { NavLink } from "react-router-dom";

export const Navbar: FC = () => {
  const selectedUser = localStorage.getItem("name");
  const clickCountRef = useRef(0);
  const [showModal, setShowModal] = useState(false);

  const handleNavbarClick = () => {
    clickCountRef.current += 1;

    if (clickCountRef.current === 5) {
      setShowModal(true);
      clickCountRef.current = 0;
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {selectedUser && (
        <>
          <nav
            style={{
              borderColor: "black",
              backgroundColor: "hsl(0, 77%, 28%)",
            }}
            className="navbar mb-4 navbar-expand-lg navbar-light navbar-background"
            onClick={handleNavbarClick}
          >
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1">
                {`Jama - Open Shama Version | ${selectedUser} | Alpaca`}
              </span>

              <div className="d-flex " id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  {routes.map(
                    (page) =>
                      page.path !== "/login" && (
                        <li className="nav-item h5" key={page.path}>
                          <NavLink
                            to={page.path}
                            style={({ isActive }) => ({
                              textDecoration: isActive ? "underline" : "none",
                            })}
                            className={({ isActive }) =>
                              `nav-link ${isActive ? "active" : ""}`
                            }
                          >
                            {page.name}
                          </NavLink>
                        </li>
                      ),
                  )}
                  <li className="nav-item h5">
                    <NavLink
                      to={"/login"}
                      className={"nav-link"}
                      style={{ textDecoration: "none" }}
                      onClick={() => localStorage.clear()}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {showModal && (
            <div
              onClick={closeModal}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1050,
              }}
            >
              <div
                onClick={(event) => event.stopPropagation()}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "24px",
                  maxWidth: "600px",
                  width: "90%",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Default Method in Java</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  />
                </div>
                <p className="mb-3">
                  מתודה ברירת מחדל ב-Java היא מתודה בתוך ממשק שכוללת מימוש. היא
                  מאפשרת הוספת התנהגות חדשה לממשקים מבלי לשבור מחלקות קיימות
                  שכבר מיישמות אותן.
                </p>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
