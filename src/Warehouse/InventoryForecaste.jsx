import React, { useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Spinner,
  Badge,
  Alert,
  ProgressBar,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  FaBoxes,
  FaChartLine,
  FaClock,
  FaBell,
  FaBox,
  FaBarcode,
  FaLayerGroup,
  FaWarehouse,
  FaLightbulb,
  FaArrowUp,
} from "react-icons/fa";

import { InventoryForecasting } from "../CreateSlice/InventorySlice";

function InventoryForecaste() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { forecast, loading, error } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(InventoryForecasting(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-4">
        {error}
      </Alert>
    );
  }

  const statusColor =
    forecast?.status === "Critical"
      ? "#dc2626"
      : forecast?.status === "Low Stock"
        ? "#f59e0b"
        : "#16a34a";

  const stockPercentage =
    forecast?.reorderLevel > 0
      ? Math.min((forecast.currentStock / forecast.reorderLevel) * 100, 100)
      : 0;

  const StatCard = ({ title, value, icon, color }) => (
    <Card
      className="border-0 shadow-sm h-100"
      style={{
        borderRadius: "22px",
      }}
    >
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">{title}</small>

            <h2 className="fw-bold mt-2 mb-0">{value}</h2>
          </div>

          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: 65,
              height: 65,
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
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* FORECAST HEADER */}

      <Card
        className="border-0 shadow-lg mb-4"
        style={{
          borderRadius: "30px",

          background: "linear-gradient(135deg,#065f46,#14b8a6,#22c55e)",
        }}
      >
        <Card.Body className="p-5 text-white">
          <Row className="align-items-center">
            <Col md={8}>
              <div className="d-flex align-items-center mb-3">
                <div
                  className="rounded-circle bg-white text-success d-flex justify-content-center align-items-center me-3"
                  style={{
                    width: 70,
                    height: 70,
                    fontSize: 32,
                  }}
                >
                  📈
                </div>

                <div>
                  <h1 className="fw-bold mb-1">Stock Forecast</h1>

                  <p className="mb-0 opacity-75">
                    Predictive inventory planning
                  </p>
                </div>
              </div>

              <h3 className="fw-bold mt-4">{forecast?.productName}</h3>

              <div className="d-flex gap-3 flex-wrap mt-3">
                <Badge bg="light" text="dark" className="px-3 py-2">
                  SKU : {forecast?.sku}
                </Badge>

                <Badge bg="light" text="dark" className="px-3 py-2">
                  {forecast?.daysRemaining} Days Remaining
                </Badge>
              </div>
            </Col>

            <Col md={4} className="text-md-end mt-4 mt-md-0">
              <div
                className="p-4 rounded-4"
                style={{
                  background: "rgba(255,255,255,0.15)",
                }}
              >
                <small>Inventory Status</small>

                <h2 className="fw-bold mt-2">{forecast?.status}</h2>

                <Badge
                  className="px-4 py-2"
                  style={{
                    background: statusColor,
                  }}
                >
                  Stock Alert
                </Badge>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* STAT CARDS */}

      <Row className="g-4 mb-4">
        <Col xl={3} md={6}>
          <StatCard
            title="Current Stock"
            value={forecast?.currentStock}
            icon={<FaBoxes />}
            color="#2563eb"
          />
        </Col>

        <Col xl={3} md={6}>
          <StatCard
            title="Daily Usage"
            value={forecast?.averageDailyUsage}
            icon={<FaChartLine />}
            color="#16a34a"
          />
        </Col>

        <Col xl={3} md={6}>
          <StatCard
            title="Days Remaining"
            value={forecast?.daysRemaining}
            icon={<FaClock />}
            color="#f59e0b"
          />
        </Col>

        <Col xl={3} md={6}>
          <StatCard
            title="Reorder Level"
            value={forecast?.reorderLevel}
            icon={<FaBell />}
            color="#dc2626"
          />
        </Col>
      </Row>

      <Row className="g-4">
        {/* STOCK HEALTH */}

        <Col lg={5}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{
              borderRadius: "25px",
            }}
          >
            <Card.Body className="p-4">
              <h4 className="fw-bold">Stock Health</h4>

              <div className="text-center my-4">
                <div
                  className="mx-auto d-flex justify-content-center align-items-center"
                  style={{
                    width: 180,

                    height: 180,

                    borderRadius: "50%",

                    background: `conic-gradient(${statusColor} ${stockPercentage}%,#e5e7eb ${stockPercentage}%)`,
                  }}
                >
                  <div
                    className="bg-white rounded-circle d-flex flex-column justify-content-center align-items-center"
                    style={{
                      width: 135,

                      height: 135,
                    }}
                  >
                    <h2 className="fw-bold">{Math.round(stockPercentage)}%</h2>

                    <small>Health</small>
                  </div>
                </div>
              </div>

              <ProgressBar
                now={stockPercentage}
                variant={
                  forecast?.status === "Critical"
                    ? "danger"
                    : forecast?.status === "Low Stock"
                      ? "warning"
                      : "success"
                }
              />
            </Card.Body>
          </Card>
        </Col>

        {/* PRODUCT DETAILS */}

        <Col lg={7}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{
              borderRadius: "25px",
            }}
          >
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">Product Information</h4>

              <Row className="g-4">
                <Col md={6}>
                  <div className="bg-light rounded-4 p-3">
                    <FaBox className="text-primary me-2" />
                    Product
                    <h5 className="mt-2">{forecast?.productName}</h5>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="bg-light rounded-4 p-3">
                    <FaBarcode className="text-success me-2" />
                    SKU
                    <h5 className="mt-2">{forecast?.sku}</h5>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="bg-light rounded-4 p-3">
                    <FaLayerGroup className="text-warning me-2" />
                    Category
                    <h5 className="mt-2">{forecast?.category || "--"}</h5>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="bg-light rounded-4 p-3">
                    <FaWarehouse className="text-danger me-2" />
                    Warehouse
                    <h5 className="mt-2">{forecast?.warehouseName || "--"}</h5>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* RECOMMENDATION */}

      <Card
        className="border-0 shadow-sm mt-4"
        style={{
          borderRadius: "25px",
        }}
      >
        <Card.Body className="p-4">
          <h4 className="fw-bold text-warning">
            <FaLightbulb className="me-2" />
            Smart Recommendation
          </h4>

          <p className="text-muted mb-0">{forecast?.recommendation}</p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default InventoryForecaste;
