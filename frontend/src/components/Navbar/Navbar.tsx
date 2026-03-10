import type { FC } from "react";
import { routes } from "../../router/paths";
import { NavLink } from "react-router-dom";

export const Navbar: FC = () => {
  const selectedUser = localStorage.getItem("name");

  return (
    <div>
      {selectedUser && (
        <nav
          style={{ borderColor: "black", backgroundColor: "hsl(0, 77%, 28%)" }}
          className="navbar mb-4 navbar-expand-lg navbar-light navbar-background"
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
                <NavLink
                  to={"/login"}
                  className={"nav-link"}
                  style={{ textDecoration: "none" }}
                  onClick={() => localStorage.clear()}
                >
                  Logout
                </NavLink>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};
