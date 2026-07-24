import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Card, Form, Row, Col, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getFleetVehicle,
  deleteFleetVehicle,
  getFleetVehicleById,
} from "../../CreateSlice/FleetVehicleSlice";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

function ViewVehicle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { vehicles, vehicle, loading, total } = useSelector(
    (state) => state.vehicle,
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(
      getFleetVehicle({
        page,
        limit,
        search,
      }),
    );
  }, [dispatch, page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;

    const result = await dispatch(deleteFleetVehicle(id));

    if (deleteFleetVehicle.fulfilled.match(result)) {
      toast.success("Vehicle deleted successfully");
    } else {
      toast.error(result.payload?.message || "Delete failed");
    }
  };

  const columns = [
    {
      name: "Vehicle No",
      selector: (row) => row.vehicleNumber,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.vehicleType,
    },
    {
      name: "Capacity",
      selector: (row) => row.capacity,
    },
    {
      name: "Fuel",
      selector: (row) => row.fuelType,
    },
    {
      name: "Manufacturer",
      selector: (row) => row.manufacturer,
    },
    {
      name: "Model",
      selector: (row) => row.model,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`badge ${
            row.status === "Available"
              ? "bg-success"
              : row.status === "Assigned"
                ? "bg-primary"
                : row.status === "Maintenance"
                  ? "bg-warning"
                  : "bg-danger"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button size="sm" variant="info" onClick={() => handleView(row._id)}>
            <FaEye />
          </Button>

          <Button
            size="sm"
            variant="warning"
            onClick={() => navigate(`/edit-vehicle/${row._id}`)}
          >
            <FaEdit />
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row._id)}
          >
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  const handleView = async (id) => {
    const result = await dispatch(getFleetVehicleById(id));

    if (getFleetVehicleById.fulfilled.match(result)) {
      setShow(true);
    } else {
      toast.error("Unable to fetch vehicle details");
    }
  };

  return (
    <Card className="shadow border-0">
      <Card.Body>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              placeholder="Search Vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>

          <Col className="text-end">
            <Button onClick={() => navigate("/create-vehicle")}>
              <FaPlus className="me-2" />
              Add Vehicle
            </Button>
          </Col>
        </Row>

        <DataTable
          columns={columns}
          data={vehicles}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={total}
          paginationPerPage={limit}
          onChangePage={(page) => setPage(page)}
          highlightOnHover
          striped
          responsive
        />

        {
          <Modal show={show} onHide={() => setShow(false)} centered size="lg">
            <Modal.Header
              closeButton
              className="text-white"
              style={{
                background: "linear-gradient(135deg,#2563eb,#1d4ed8,#0f766e)",
                border: "none",
              }}
            >
              <Modal.Title className="fw-bold">🚚 Vehicle Details</Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4 bg-light">
              {vehicle && (
                <>
                  {/* Top Card */}

                  <div className="bg-white shadow-sm rounded-4 p-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="fw-bold mb-1">
                          {vehicle.vehicleNumber}
                        </h3>

                        <p className="text-muted mb-0">
                          {vehicle.manufacturer} • {vehicle.model}
                        </p>
                      </div>

                      <span
                        className={`badge fs-6 px-3 py-2 ${
                          vehicle.status === "Available"
                            ? "bg-success"
                            : vehicle.status === "Assigned"
                              ? "bg-primary"
                              : vehicle.status === "Maintenance"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="bg-white rounded-4 shadow-sm p-3 h-100">
                        <small className="text-muted">Vehicle Type</small>
                        <h5>{vehicle.vehicleType}</h5>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="bg-white rounded-4 shadow-sm p-3 h-100">
                        <small className="text-muted">Capacity</small>
                        <h5>{vehicle.capacity} Kg</h5>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="bg-white rounded-4 shadow-sm p-3 h-100">
                        <small className="text-muted">Fuel Type</small>
                        <h5>{vehicle.fuelType}</h5>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="bg-white rounded-4 shadow-sm p-3 h-100">
                        <small className="text-muted">Current Odometer</small>
                        <h5>{vehicle.currentOdometer} Km</h5>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="bg-white rounded-4 shadow-sm p-3">
                        <small className="text-muted">Registration Date</small>

                        <h6>
                          {vehicle.registrationDate
                            ? new Date(
                                vehicle.registrationDate,
                              ).toLocaleDateString()
                            : "--"}
                        </h6>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="bg-white rounded-4 shadow-sm p-3">
                        <small className="text-muted">Insurance Expiry</small>

                        <h6>
                          {vehicle.insuranceExpiry
                            ? new Date(
                                vehicle.insuranceExpiry,
                              ).toLocaleDateString()
                            : "--"}
                        </h6>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="bg-white rounded-4 shadow-sm p-3">
                        <small className="text-muted">Pollution Expiry</small>

                        <h6>
                          {vehicle.pollutionExpiry
                            ? new Date(
                                vehicle.pollutionExpiry,
                              ).toLocaleDateString()
                            : "--"}
                        </h6>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="bg-white rounded-4 shadow-sm p-3">
                        <small className="text-muted">Fitness Expiry</small>

                        <h6>
                          {vehicle.fitnessExpiry
                            ? new Date(
                                vehicle.fitnessExpiry,
                              ).toLocaleDateString()
                            : "--"}
                        </h6>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Modal.Body>

            <Modal.Footer className="bg-light border-0">
              <Button
                variant="secondary"
                className="rounded-pill px-4"
                onClick={() => setShow(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        }
      </Card.Body>
    </Card>
  );
}

export default ViewVehicle;
