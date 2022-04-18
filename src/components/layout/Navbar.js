import React, { useContext } from "react";
import "./Navbar.scss";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import { UserContext } from "../../UserContext";

const Navbar = ({ menu }) => {
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout", {
        credentials: "include",
      });
      const data = res.json();
      console.log("logout data", data);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <MenuIcon className="menu__icon" />
      <div className="nav__title">
        <NavLink className="nav__link" to="/">
          <h2>Chatroom</h2>
        </NavLink>
      </div>
      <div className="nav__menu">
        {menu.map((nav_item) => (
          <NavLink
            key={nav_item.title}
            exact={nav_item.link === "/"}
            to={nav_item.link}
            className="nav__link"
          >
            <p>{nav_item.title}</p>
          </NavLink>
        ))}
      </div>
      <div className="nav__btn">
        {user ? (
          <Button className="btn btn__logout" onClick={logout}>
            Logout
          </Button>
        ) : (
          <>
            <NavLink to="/login" className="nav__link">
              <Button className="btn btn__login">Login</Button>
            </NavLink>
            <NavLink to="/signup" className="nav__link">
              <Button className="btn btn__signup">Signup</Button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
