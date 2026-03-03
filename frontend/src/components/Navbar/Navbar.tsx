import type { FC } from "react";
import { routes } from "../../router/paths";
import { NavLink } from "react-router-dom";



export const Navbar: FC = () => {
    const selectedUser = localStorage.getItem('name');

    return (
        <div>
        {selectedUser && 
      <nav style={{borderColor: "black", backgroundColor: "hsl(0, 77%, 28%)"}} className="navbar mb-5 navbar-expand-lg navbar-light navbar-background">
        <h2 className="navbar-brand">
          {`Shama | ${selectedUser}`}
        </h2>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {routes.map((page) => ( page.path !== "/login" &&
              (<li className="nav-item" key={page.path}>
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
              </li>)
            ))}
          </ul>
          <div className="btn-group">
            
          </div>
        </div>
      </nav>
    }
    </div>
    )
}