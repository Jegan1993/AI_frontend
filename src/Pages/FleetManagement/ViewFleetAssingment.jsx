import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button, Badge } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getFleetAssignment,
  deleteFleetAssignment,
} from "../../CreateSlice/FleetAssingmentSlice.jsx";

import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

function ViewFleetAssignment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { assignments, loading, total } = useSelector(
    (state) => state.fleetAssing,
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {
    dispatch(
      getFleetAssignment({
        page,
        limit,
        search,
      }),
    );
  }, [dispatch, page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Fleet Assignment?")) return;

    const result = await dispatch(deleteFleetAssignment(id));

    if (deleteFleetAssignment.fulfilled.match(result)) {
      toast.success("Fleet Assignment deleted successfully");
    } else {
      toast.error(result.payload?.message || "Delete failed");
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Assigned":
        return <Badge bg="primary">{status}</Badge>;

      case "Dispatched":
        return <Badge bg="warning">{status}</Badge>;

      case "In Transit":
        return <Badge bg="info">{status}</Badge>;

      case "Completed":
        return <Badge bg="success">{status}</Badge>;

      default:
        return <Badge bg="danger">{status}</Badge>;
    }
  };

  const columns = [
    {
      name: "Shipment",
      selector: (row) => row.shipmentId?.shipmentNo || "--",
      sortable: true,
    },
    {
      name: "Vehicle",
      selector: (row) => row.vehicleId?.vehicleNumber || "--",
    },
    {
      name: "Driver",
      selector: (row) => row.driverId?.name || "--",
    },
    {
      name: "Assigned Date",
      selector: (row) =>
        row.assignedDate
          ? new Date(row.assignedDate).toLocaleDateString()
          : "--",
    },
    {
      name: "Dispatch Date",
      selector: (row) =>
        row.dispatchDate
          ? new Date(row.dispatchDate).toLocaleDateString()
          : "--",
    },
    {
      name: "Status",
      cell: (row) => statusBadge(row.status),
    },
    {
      name: "Actions",
      width: "220px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="info"
            onClick={() => navigate(`/view-fleet-assignment/${row._id}`)}
          >
            <FaEye />
          </Button>

          <Button
            size="sm"
            variant="warning"
            onClick={() => navigate(`/edit-fleet-assignment/${row._id}`)}
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
    <div className="container-fluid py-4">
      <Card className="shadow border-0 rounded-4">
        <Card.Header className="bg-white border-0 py-3">
          <Row className="align-items-center">
            <Col md={4}>
              <h3 className="fw-bold mb-0">Fleet Assignment</h3>
            </Col>

            <Col md={4}>
              <Form.Control
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col className="text-end">
              <Button onClick={() => navigate("/create-fleet-assignment")}>
                <FaPlus className="me-2" />
                Assign Fleet
              </Button>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <DataTable
            columns={columns}
            data={assignments}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={total}
            paginationPerPage={limit}
            onChangePage={(page) => setPage(page)}
            highlightOnHover
            striped
            responsive
            persistTableHead
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewFleetAssignment;
