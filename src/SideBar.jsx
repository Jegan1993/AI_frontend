import { NavLink, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();

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
    location.pathname.startsWith("/edit-quotation");

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
  });

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
    </div>
  );
}

export default SideBar;
