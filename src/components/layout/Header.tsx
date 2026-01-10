import { NavLink } from "react-router-dom";
import "../../components/layout/Layout.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">Northwind Service</div>

      <nav className="menu">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
}
