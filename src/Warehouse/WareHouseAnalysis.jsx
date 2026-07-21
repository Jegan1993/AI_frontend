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

function WareHouseAnalysis() {
  const dispatch = useDispatch();

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

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card
      className="border-0 shadow-sm h-100"
      style={{
        borderRadius: "20px",
      }}
    >
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between">
          <div>
            <p className="text-muted mb-2">{title}</p>

            <h1 className="fw-bold mb-1">{value}</h1>

            <small className="text-muted">{subtitle}</small>
          </div>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: 65,
              height: 65,
              borderRadius: "18px",
              background: `${color}20`,
              color,
              fontSize: 28,
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
          />
        </Col>

        <Col xl={3} md={6}>
          <StatCard
            title="Products"
            value={analytics?.totalProducts || 0}
            subtitle="Total inventory items"
            icon={<FaBoxOpen />}
            color="#16a34a"
          />
        </Col>

        <Col xl={3} md={6}>
          <StatCard
            title="Stock Units"
            value={analytics?.totalStock || 0}
            subtitle="Available quantity"
            icon={<FaBoxes />}
            color="#0891b2"
          />
        </Col>

        <Col xl={3} md={6}>
          <StatCard
            title="Alerts"
            value={(analytics?.lowStock || 0) + (analytics?.outOfStock || 0)}
            subtitle="Need attention"
            icon={<FaExclamationTriangle />}
            color="#dc2626"
          />
        </Col>
      </Row>

      <Row className="g-4">
        {/* HEALTH */}

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
