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

        <NavLink to="/categories">Catalog / Product</NavLink>
        {/* Products, Categories, Suppliers  */}

        {/* <NavLink to="/Sales">Sales / Order</NavLink> */}
        {/* Orders,OrderDetails */}

        {/* <NavLink to="/customer">Customer</NavLink> */}
        {/* Customers,CustomerDemographics   */}

        {/* <NavLink to="/employee">Employee / HR domain</NavLink> */}
        {/* Employees,EmployeeTerritories */}

        {/* <NavLink to="/shipping">Shipping / Logistics</NavLink> */}
        {/* Shippers , Shipments*/}

        <NavLink to="/regions">Geography</NavLink>
        {/* Regions,Territories */}

        <NavLink to="/reports">Input Form</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </header>
  );
}
