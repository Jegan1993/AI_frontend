import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./CreateSlice/AuthSlice";
import { useState } from "react";
function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [warehouseOpen, setWarehouseOpen] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);
  const dashboardActive = location.pathname === "/";

  const leadActive =
    location.pathname.startsWith("/lead") ||
    location.pathname.startsWith("/create-lead") ||
    location.pathname.startsWith("/edit-lead");

  const customerActive =
    location.pathname.startsWith("/get-customer") ||
    location.pathname.startsWith("/edit-customer");

  const quotationActive =
    location.pathname.startsWith("/view-quotation") ||
    location.pathname.startsWith("/edit-quotation") ||
    location.pathname.startsWith("/create-quotation");

  const getorderActive =
    location.pathname.startsWith("/view-order") ||
    location.pathname.startsWith("/create-order") ||
    location.pathname.startsWith("/edit-order");

  const shipmentActive =
    location.pathname.startsWith("/view-shipment") ||
    location.pathname.startsWith("/create-shipment") ||
    location.pathname.startsWith("/edit-shipment");

  const wareHouseActive =
    location.pathname.startsWith("/view-warehouse") ||
    location.pathname.startsWith("/view-inventory") ||
    location.pathname.startsWith("/create-inventory") ||
    location.pathname.startsWith("/edit-inventory") ||
    location.pathname.startsWith("/view-stock") ||
    location.pathname.startsWith("/create-stock") ||
    location.pathname.startsWith("/edit-stock");

  const linkStyle = (active) => ({
    display: "block",
    padding: "12px 16px",
    marginBottom: "10px",
    textDecoration: "none",
    borderRadius: "8px",
    backgroundColor: active ? "#ffdf2a" : "transparent",
    fontWeight: active ? "600" : "400",
    color: active ? "#000" : "#fff",
    transition: "0.3s",
    cursor: "pointer",
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#060606",
        padding: "20px",
      }}
    >
      <h4 style={{ color: "#fff", marginBottom: "20px" }}>CRM</h4>

      <NavLink to="/" style={linkStyle(dashboardActive)}>
        Dashboard
      </NavLink>

      <NavLink to="/lead" style={linkStyle(leadActive)}>
        Lead Management
      </NavLink>

      <NavLink to="/get-customer" style={linkStyle(customerActive)}>
        Customer Management
      </NavLink>

      <NavLink to="/view-quotation" style={linkStyle(quotationActive)}>
        Quotation
      </NavLink>

      <NavLink to="/view-order" style={linkStyle(getorderActive)}>
        Order Management
      </NavLink>
      <NavLink to="/view-shipment" style={linkStyle(shipmentActive)}>
        Shipment
      </NavLink>
      <div>
        <div
          onClick={() => setWarehouseOpen(!warehouseOpen)}
          style={linkStyle(wareHouseActive)}
        >
          Warehouse {warehouseOpen ? "▲" : "▼"}
        </div>

        {warehouseOpen && (
          <div style={{ marginLeft: "15px" }}>
            <NavLink
              to="/view-warehouse"
              style={linkStyle(location.pathname.startsWith("/view-warehouse"))}
            >
              Warehouse List
            </NavLink>

            <NavLink
              to="/view-inventory"
              style={linkStyle(location.pathname.startsWith("/view-inventory"))}
            >
              Inventory
            </NavLink>

            <NavLink
              to="/view-stock"
              style={linkStyle(location.pathname.startsWith("/view-stock"))}
            >
              Stock
            </NavLink>

            <NavLink
              to="/warehouse-analysis"
              style={linkStyle(
                location.pathname.startsWith("/warehouse-analysis"),
              )}
            >
              Analytics
            </NavLink>
          </div>
        )}
      </div>
      <button
        onClick={handleLogout}
        onMouseEnter={() => setLogoutHover(true)}
        onMouseLeave={() => setLogoutHover(false)}
        style={{
          display: "block",
          width: "100%",
          padding: "12px 16px",
          marginBottom: "10px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: logoutHover ? "#ffdf2a" : "transparent",
          color: logoutHover ? "#000" : "#fff",
          fontWeight: logoutHover ? "600" : "400",
          textAlign: "left",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default SideBar;
