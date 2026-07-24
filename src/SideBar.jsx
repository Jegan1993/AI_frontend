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
    location.pathname.startsWith("/create-quotation") ||
    location.pathname.startsWith("/edit-quotation");

  const orderActive =
    location.pathname.startsWith("/view-order") ||
    location.pathname.startsWith("/create-order") ||
    location.pathname.startsWith("/edit-order");

  const shipmentActive =
    location.pathname.startsWith("/view-shipment") ||
    location.pathname.startsWith("/create-shipment") ||
    location.pathname.startsWith("/edit-shipment");

  // Warehouse Active
  const warehouseActive =
    location.pathname.startsWith("/view-warehouse") ||
    location.pathname.startsWith("/view-bin") ||
    location.pathname.startsWith("/view-inventory") ||
    location.pathname.startsWith("/create-inventory") ||
    location.pathname.startsWith("/edit-inventory") ||
    location.pathname.startsWith("/view-stock") ||
    location.pathname.startsWith("/create-stock") ||
    location.pathname.startsWith("/edit-stock") ||
    location.pathname.startsWith("/warehouse-analysis");

  // Fleet Active
  const fleetActive =
    location.pathname.startsWith("/view-vehicle") ||
    location.pathname.startsWith("/view-driver") ||
    location.pathname.startsWith("/view-fleet-assingnment") ||
    location.pathname.startsWith("/gps-tracking");

  // Keep dropdown open when inside its routes
  const [warehouseOpen, setWarehouseOpen] = useState(warehouseActive);
  const [fleetOpen, setFleetOpen] = useState(fleetActive);

  const [logoutHover, setLogoutHover] = useState(false);

  const linkStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "12px 15px",
    marginBottom: "8px",
    borderRadius: "10px",
    textDecoration: "none",
    backgroundColor: active ? "#0f766e" : "transparent",
    color: active ? "#fff" : "#e5e7eb",
    fontWeight: active ? "600" : "500",
    fontSize: "15px",
    transition: "all .3s ease",
    cursor: "pointer",
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
        boxShadow: "3px 0 15px rgba(0,0,0,.2)",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
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
          }}
        />

        <div>
          <h4
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "22px",
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

      <NavLink to="/view-order" style={linkStyle(orderActive)}>
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
          style={linkStyle(warehouseActive)}
        >
          <FaWarehouse />
          <span style={{ flex: 1 }}>Warehouse</span>

          {warehouseOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {warehouseOpen && (
          <div
            style={{
              marginLeft: "12px",
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

      {/* Fleet */}
      <div>
        <div
          onClick={() => setFleetOpen(!fleetOpen)}
          style={linkStyle(fleetActive)}
        >
          <FaTruck />
          <span style={{ flex: 1 }}>Fleet Management</span>

          {fleetOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {fleetOpen && (
          <div
            style={{
              marginLeft: "12px",
              paddingLeft: "12px",
              borderLeft: "2px solid #374151",
            }}
          >
            <NavLink
              to="/view-vehicle"
              style={linkStyle(location.pathname.startsWith("/view-vehicle"))}
            >
              <FaTruck />
              Vehicle Management
            </NavLink>

            <NavLink
              to="/view-driver"
              style={linkStyle(location.pathname.startsWith("/view-driver"))}
            >
              <FaUsers />
              Driver Management
            </NavLink>

            <NavLink
              to="/view-fleet-assingnment"
              style={linkStyle(
                location.pathname.startsWith("/view-fleet-assingnment"),
              )}
            >
              <FaBox />
              Fleet Assignment
            </NavLink>

            <NavLink
              to="/gps-tracking"
              style={linkStyle(location.pathname.startsWith("/gps-tracking"))}
            >
              <FaChartBar />
              GPS Tracking
            </NavLink>
          </div>
        )}
      </div>

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
          background: logoutHover ? "#dc2626" : "rgba(255,255,255,0.08)",
          color: "#fff",
          fontWeight: "600",
          fontSize: "15px",
          cursor: "pointer",
          transition: ".3s",
        }}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}

export default SideBar;
