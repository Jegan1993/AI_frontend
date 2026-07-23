import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./CreateSlice/AuthSlice";
import { useState } from "react";

import {
  FaHome,
  FaUserTie,
  FaUsers,
  FaFileInvoice,
  FaShoppingCart,
  FaTruck,
  FaWarehouse,
  FaBox,
  FaChartBar,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "12px",
    width: "100%",
    padding: "12px 15px",
    marginBottom: "8px",
    borderRadius: "10px",
    textDecoration: "none",
    backgroundColor: active ? "#0f766e" : "transparent",
    color: active ? "#ffffff" : "#e5e7eb",
    fontWeight: active ? "600" : "500",
    fontSize: "15px",
    transition: "all 0.3s ease",
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#111827,#030712)",
        padding: "22px 18px",
        boxShadow: "3px 0 15px rgba(0,0,0,0.2)",
        flexShrink: 0,
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "12px",
            background: "#ffdf2a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: "800",
            color: "#111827",
          }}
        >
          C
        </div>

        <div>
          <h4
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            CRM
          </h4>

          <span
            style={{
              color: "#9ca3af",
              fontSize: "12px",
            }}
          >
            Management System
          </span>
        </div>
      </div>

      <NavLink to="/" style={linkStyle(dashboardActive)}>
        <FaHome />
        Dashboard
      </NavLink>

      <NavLink to="/lead" style={linkStyle(leadActive)}>
        <FaUserTie />
        Lead Management
      </NavLink>

      <NavLink to="/get-customer" style={linkStyle(customerActive)}>
        <FaUsers />
        Customer Management
      </NavLink>

      <NavLink to="/view-quotation" style={linkStyle(quotationActive)}>
        <FaFileInvoice />
        Quotation
      </NavLink>

      <NavLink to="/view-order" style={linkStyle(getorderActive)}>
        <FaShoppingCart />
        Order Management
      </NavLink>

      <NavLink to="/view-shipment" style={linkStyle(shipmentActive)}>
        <FaTruck />
        Shipment
      </NavLink>

      {/* Warehouse */}
      <div>
        <div
          onClick={() => setWarehouseOpen(!warehouseOpen)}
          style={linkStyle(wareHouseActive)}
        >
          <FaWarehouse />

          <span style={{ flex: 1 }}>Warehouse</span>

          {warehouseOpen ? (
            <FaChevronUp size={12} />
          ) : (
            <FaChevronDown size={12} />
          )}
        </div>

        {warehouseOpen && (
          <div
            style={{
              marginLeft: "10px",
              paddingLeft: "12px",
              borderLeft: "2px solid #374151",
            }}
          >
            <NavLink
              to="/view-warehouse"
              style={linkStyle(location.pathname.startsWith("/view-warehouse"))}
            >
              <FaWarehouse />
              Warehouse List
            </NavLink>

            <NavLink
              to="/view-bin"
              style={linkStyle(location.pathname.startsWith("/view-bin"))}
            >
              <FaBox />
              Bin
            </NavLink>
            <NavLink
              to="/view-inventory"
              style={linkStyle(location.pathname.startsWith("/view-inventory"))}
            >
              <FaBox />
              Inventory
            </NavLink>

            <NavLink
              to="/view-stock"
              style={linkStyle(location.pathname.startsWith("/view-stock"))}
            >
              <FaBox />
              Stock
            </NavLink>

            <NavLink
              to="/warehouse-analysis"
              style={linkStyle(
                location.pathname.startsWith("/warehouse-analysis"),
              )}
            >
              <FaChartBar />
              Analytics
            </NavLink>
          </div>
        )}
      </div>

      {/* Logout */}
      {/* Logout */}
      <button
        onClick={handleLogout}
        onMouseEnter={() => setLogoutHover(true)}
        onMouseLeave={() => setLogoutHover(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          padding: "12px 15px",
          marginTop: "25px",
          border: "none",
          borderRadius: "10px",
          backgroundColor: logoutHover ? "#dc2626" : "rgba(255,255,255,0.08)",
          color: "#ffffff",
          fontWeight: "600",
          fontSize: "15px",
          textAlign: "left",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default SideBar;
