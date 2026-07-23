import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaWarehouse,
  FaBoxOpen,
  FaBoxes,
  FaExclamationTriangle,
  FaBan,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

import {
  Card,
  Row,
  Col,
  Badge,
  Spinner,
  ProgressBar,
  Table,
} from "react-bootstrap";

import { warehouseAnalytics } from "../CreateSlice/WareHouseSlice.jsx";
import { useNavigate } from "react-router-dom";

function WareHouseAnalysis() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { analytics, loading } = useSelector((state) => state.warehouse);

  useEffect(() => {
    dispatch(warehouseAnalytics());
  }, [dispatch]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const totalItems =
    (analytics?.totalProducts || 0) + (analytics?.outOfStock || 0);

  const health = totalItems
    ? Math.round((analytics?.totalProducts / totalItems) * 100)
    : 0;
  const StatCard = ({ title, value, subtitle, icon, color, onClick }) => (
    <Card
      onClick={onClick}
      className="border-0 shadow-sm h-100"
      style={{
        borderRadius: "20px",
        cursor: "pointer",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">{title}</small>

            <h2 className="fw-bold">{value}</h2>

            <small>{subtitle}</small>
          </div>

          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: `${color}20`,
              color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
            }}
          >
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}

      <Card
        className="border-0 shadow mb-4"
        style={{
          borderRadius: "25px",
          background: "linear-gradient(135deg,#111827,#2563eb)",
        }}
      >
        <Card.Body className="p-5 text-white">
          <Row className="align-items-center">
            <Col md={8}>
              <h1 className="fw-bold">Warehouse Intelligence</h1>

              <p className="mb-0 opacity-75">
                Real-time inventory monitoring and warehouse performance
              </p>
            </Col>

            <Col md={4} className="text-md-end mt-3">
              <Badge bg="success" className="px-4 py-3 fs-6">
                <FaCheckCircle className="me-2" />
                System Healthy
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* STATISTICS */}

      <Row className="g-4 mb-4">
        <Col xl={3} md={6}>
          <StatCard
            title="Warehouses"
            value={analytics?.warehouses || 0}
            subtitle="Active locations"
            icon={<FaWarehouse />}
            color="#2563eb"
            onClick={() => navigate("/view-warehouse")}
          />
        </Col>

        <Col xl={3} md={6}>
          <StatCard
            title="Products"
            value={analytics?.totalProducts || 0}
            subtitle="Total inventory items"
            icon={<FaBoxOpen />}
            color="#16a34a"
            onClick={() => navigate("/view-inventory")}
          />
        </Col>

        <Col xl={3} md={6}>
          <StatCard
            title="Stock Units"
            value={analytics?.totalStock || 0}
            subtitle="Available quantity"
            icon={<FaBoxes />}
            color="#0891b2"
            onClick={() => navigate("/view-stock")}
          />
        </Col>

        <Col xl={3} md={6}>
          <StatCard
            title="Alerts"
            value={(analytics?.lowStock || 0) + (analytics?.outOfStock || 0)}
            subtitle="Need attention"
            icon={<FaExclamationTriangle />}
            color="#dc2626"
            // onClick={() => navigate("/inventory-alerts")}
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={5}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{
              borderRadius: "25px",
            }}
          >
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">Inventory Health</h4>

              <div className="text-center">
                <div
                  className="mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    background: `conic-gradient(#16a34a ${health}%, #e5e7eb ${health}%)`,
                  }}
                >
                  <div
                    className="bg-white rounded-circle d-flex flex-column justify-content-center align-items-center"
                    style={{
                      width: 130,
                      height: 130,
                    }}
                  >
                    <h1 className="fw-bold mb-0">{health}%</h1>

                    <small>Healthy</small>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="d-flex justify-content-between mb-3">
                  <span>Low Stock</span>

                  <Badge bg="warning">{analytics?.lowStock || 0}</Badge>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Out Of Stock</span>

                  <Badge bg="danger">{analytics?.outOfStock || 0}</Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* SUMMARY */}

        <Col lg={7}>
          <Card
            className="border-0 shadow-sm"
            style={{
              borderRadius: "25px",
            }}
          >
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">Warehouse Summary</h4>

              <Table responsive hover borderless>
                <tbody>
                  <tr>
                    <th>Total Warehouses</th>

                    <td className="text-end fw-bold">
                      {analytics?.warehouses}
                    </td>
                  </tr>

                  <tr>
                    <th>Total Products</th>

                    <td className="text-end fw-bold">
                      {analytics?.totalProducts}
                    </td>
                  </tr>

                  <tr>
                    <th>Total Stock</th>

                    <td className="text-end fw-bold">
                      {analytics?.totalStock}
                    </td>
                  </tr>

                  <tr>
                    <th>Low Stock</th>

                    <td className="text-end">
                      <Badge bg="warning">{analytics?.lowStock}</Badge>
                    </td>
                  </tr>

                  <tr>
                    <th>Out Of Stock</th>

                    <td className="text-end">
                      <Badge bg="danger">{analytics?.outOfStock}</Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* STOCK STATUS */}

      <Card
        className="border-0 shadow-sm mt-4"
        style={{
          borderRadius: "25px",
        }}
      >
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={8}>
              <h4 className="fw-bold">Stock Availability</h4>

              <ProgressBar
                now={health}
                variant="success"
                style={{
                  height: "14px",
                  borderRadius: "20px",
                }}
              />
            </Col>

            <Col md={4} className="text-md-end mt-3">
              <h3 className="fw-bold text-success">{health}%</h3>

              <small>Inventory efficiency</small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default WareHouseAnalysis;
