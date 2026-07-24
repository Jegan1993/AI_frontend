import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button, Badge, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getFleetDriver,
  deleteFleetDriver,
} from "../../CreateSlice/FleetDriveSlice.jsx";

import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaIdCard,
} from "react-icons/fa";

function Driver() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { drivers, total, loading } = useSelector((state) => state.driver);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [show, setShow] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    dispatch(
      getFleetDriver({
        page,
        limit,
        search,
      }),
    );
  }, [dispatch, page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Driver?")) return;

    const result = await dispatch(deleteFleetDriver(id));

    if (deleteFleetDriver.fulfilled.match(result)) {
      toast.success("Driver deleted successfully");
    } else {
      toast.error(result.payload?.message || "Delete failed");
    }
  };

  const columns = [
    {
      name: "Driver",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Email",
      selector: (row) => row.email || "--",
    },
    {
      name: "License",
      selector: (row) => row.licenseNumber,
    },
    {
      name: "Experience",
      selector: (row) => `${row.experience || 0} Years`,
    },
    {
      name: "Status",
      cell: (row) => (
        <Badge
          bg={
            row.status === "Available"
              ? "success"
              : row.status === "On Trip"
                ? "primary"
                : row.status === "Leave"
                  ? "warning"
                  : "danger"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="info"
            onClick={() => {
              setSelectedDriver(row);
              setShow(true);
            }}
          >
            <FaEye />
          </Button>

          <Button
            size="sm"
            variant="warning"
            onClick={() => navigate(`/update-driver/${row._id}`)}
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

  return (
    <>
      <Card className="shadow border-0 rounded-4">
        <Card.Body>
          <Row className="mb-4 align-items-center">
            <Col md={4}>
              <Form.Control
                placeholder="Search Driver..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col className="text-end">
              <Button onClick={() => navigate("/create-driver")}>
                <FaPlus className="me-2" />
                Add Driver
              </Button>
            </Col>
          </Row>

          <DataTable
            columns={columns}
            data={drivers}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={total}
            paginationPerPage={limit}
            onChangePage={(page) => setPage(page)}
            striped
            responsive
            highlightOnHover
          />
        </Card.Body>
      </Card>

      {/* Driver Details */}

      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Driver Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedDriver && (
            <Card className="border-0">
              <Card.Body>
                <div className="text-center mb-4">
                  <div
                    className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center"
                    style={{
                      width: 90,
                      height: 90,
                      fontSize: 35,
                    }}
                  >
                    <FaUserTie />
                  </div>

                  <h3 className="mt-3">{selectedDriver.name}</h3>

                  <Badge
                    bg={
                      selectedDriver.status === "Available"
                        ? "success"
                        : selectedDriver.status === "On Trip"
                          ? "primary"
                          : selectedDriver.status === "Leave"
                            ? "warning"
                            : "danger"
                    }
                  >
                    {selectedDriver.status}
                  </Badge>
                </div>

                <Row className="g-4">
                  <Col md={6}>
                    <Card className="bg-light border-0">
                      <Card.Body>
                        <FaPhone className="text-success me-2" />
                        <strong>Phone</strong>
                        <h6 className="mt-2">{selectedDriver.phone}</h6>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="bg-light border-0">
                      <Card.Body>
                        <FaEnvelope className="text-danger me-2" />
                        <strong>Email</strong>
                        <h6 className="mt-2">{selectedDriver.email || "--"}</h6>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="bg-light border-0">
                      <Card.Body>
                        <FaIdCard className="text-warning me-2" />
                        <strong>License No</strong>
                        <h6 className="mt-2">{selectedDriver.licenseNumber}</h6>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6}>
                    <Card className="bg-light border-0">
                      <Card.Body>
                        <strong>Experience</strong>
                        <h6 className="mt-2">
                          {selectedDriver.experience || 0} Years
                        </h6>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={12}>
                    <Card className="bg-light border-0">
                      <Card.Body>
                        <strong>Address</strong>
                        <h6 className="mt-2">
                          {selectedDriver.address || "--"}
                        </h6>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={12}>
                    <Card className="bg-light border-0">
                      <Card.Body>
                        <strong>License Expiry</strong>
                        <h6 className="mt-2">
                          {selectedDriver.licenseExpiry
                            ? new Date(
                                selectedDriver.licenseExpiry,
                              ).toLocaleDateString()
                            : "--"}
                        </h6>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Driver;
