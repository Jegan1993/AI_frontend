import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaSyncAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getShipments,
  deleteShipment,
  updateShipment,
  updateShipmentStatus,
} from "../../CreateSlice/ShipmentSlice";

function ViewShipment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    shipments = [],
    loading,
    page,
    limit,
  } = useSelector((state) => state.shipment);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getShipments({
        page: 1,
        limit: 10,
      }),
    );
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(
      getShipments({
        page: 1,
        limit: 10,
      }),
    );
  };

  const handleCreate = () => {
    navigate("/create-shipment");
  };

  const handleEdit = (row) => {
    navigate(`/edit-shipment/${row._id}`);
  };
  const handleTrack = (row) => {
    navigate(`/route-monitoring/${row._id}`);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Shipment?")) return;

    const result = await dispatch(deleteShipment(id));

    if (deleteShipment.fulfilled.match(result)) {
      dispatch(getShipments());
    }
  };

  const handleStatusChange = async (id, status) => {
    const result = await dispatch(
      updateShipmentStatus({
        id,
        data: {
          status,
        },
      }),
    );
    if (updateShipment.fulfilled.match(result)) {
      dispatch(getShipments());
    }
  };

  const filteredShipment = shipments.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.shipmentNo?.toLowerCase().includes(value) ||
      item.orderId?.orderNumber?.toLowerCase().includes(value) ||
      item.customerId?.companyName?.toLowerCase().includes(value) ||
      item.courierName?.toLowerCase().includes(value) ||
      item.trackingNumber?.toLowerCase().includes(value) ||
      item.status?.toLowerCase().includes(value)
    );
  });
  const columns = [
    {
      name: "S.No",
      width: "80px",
      cell: (row, index) => (page - 1) * limit + index + 1,
    },

    {
      name: "Shipment No",
      selector: (row) => row.shipmentNo || "--",
      sortable: true,
    },

    {
      name: "Order No",
      selector: (row) => row.orderId?.orderNumber || "--",
      sortable: true,
    },

    {
      name: "Customer",
      selector: (row) => row.customerId?.companyName || "--",
      sortable: true,
    },

    {
      name: "Courier",
      selector: (row) => row.courierName || "--",
      sortable: true,
    },

    {
      name: "Tracking No",
      selector: (row) => row.trackingNumber || "--",
      sortable: true,
    },

    {
      name: "Shipment Date",
      selector: (row) =>
        row.shipmentDate
          ? new Date(row.shipmentDate).toLocaleDateString("en-GB")
          : "--",
    },

    {
      name: "ETA",
      selector: (row) =>
        row.expectedDelivery
          ? new Date(row.expectedDelivery).toLocaleDateString("en-GB")
          : "--",
    },

    {
      name: "Current Location",
      selector: (row) => row.currentLocation || "--",
    },

    {
      name: "Status",
      center: true,
      cell: (row) => (
        <select
          className="form-select form-select-sm"
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
        >
          <option value="Created">Created</option>
          <option value="Picked Up">Picked Up</option>
          <option value="In Transit">In Transit</option>
          <option value="Out For Delivery">Out For Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Returned">Returned</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      ),
    },

    {
      name: "Action",
      center: true,
      width: "220px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleTrack(row)}
            title="Track Route"
          >
            <FaMapMarkedAlt />
          </button>

          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleEdit(row)}
          >
            <FaEdit />
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Shipment Management</h4>

            <div className="d-flex gap-2">
              <button className="btn btn-light" onClick={handleRefresh}>
                <FaSyncAlt />
              </button>

              <button
                className="btn btn-warning fw-bold"
                onClick={handleCreate}
              >
                <FaPlus className="me-2" />
                Create Shipment
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>

                <input
                  className="form-control"
                  placeholder="Search Shipment..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-8 text-end">
              <strong>Total Shipments : {filteredShipment.length}</strong>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredShipment}
            pagination
            responsive
            striped
            highlightOnHover
            persistTableHead
            progressPending={loading}
            noDataComponent={
              <div className="py-5">
                <h5>No Shipment Found</h5>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ViewShipment;
