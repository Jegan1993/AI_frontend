import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getOrder,
  deleteOrder,
  updateOrderStatus,
} from "../../CreateSlice/OrderSlice";

function ViewOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order, loading } = useSelector((state) => state.order);
  console.log("order", order);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getOrder());
  };

  const handleCreate = () => {
    navigate("/create-order");
  };

  const handleEdit = (row) => {
    navigate(`/edit-order/${row._id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    const result = await dispatch(deleteOrder(id));

    if (deleteOrder.fulfilled.match(result)) {
      dispatch(getOrder());
    }
  };

  const handleStatusChange = async (id, status) => {
    const result = await dispatch(
      updateOrderStatus({
        id,
        data: { status },
      }),
    );

    if (updateOrderStatus.fulfilled.match(result)) {
      dispatch(getOrder());
    }
  };

  const filteredOrder = order.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.orderNumber?.toLowerCase().includes(value) ||
      item.customerId?.companyName?.toLowerCase().includes(value) ||
      item.status?.toLowerCase().includes(value)
    );
  });

  const columns = [
    {
      name: "S.No",
      width: "80px",
      cell: (row, index) => index + 1,
    },

    {
      name: "Order No",
      selector: (row) => row.orderNumber,
      sortable: true,
    },

    {
      name: "Customer",
      selector: (row) => row.customerId?.companyName || "--",
      sortable: true,
    },

    {
      name: "Amount",
      selector: (row) => `₹ ${row.totalAmount?.toLocaleString()}`,
      sortable: true,
    },

    {
      name: "Order Date",
      selector: (row) => new Date(row.orderDate).toLocaleDateString("en-GB"),
    },

    {
      name: "Status",
      center: true,
      cell: (row) => (
        <select
          className={`form-select form-select-sm
          ${
            row.status === "Delivered"
              ? "border-success text-success"
              : row.status === "Cancelled"
                ? "border-danger text-danger"
                : row.status === "Shipped"
                  ? "border-primary text-primary"
                  : row.status === "Packed"
                    ? "border-info text-info"
                    : row.status === "Confirmed"
                      ? "border-warning text-warning"
                      : "border-secondary"
          }`}
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Packed">Packed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      ),
    },

    {
      name: "Action",
      center: true,
      width: "150px",
      cell: (row) => (
        <div className="d-flex gap-2">
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
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h4 className="mb-0">Order Management</h4>

            <div className="d-flex gap-2">
              <button className="btn btn-light" onClick={handleRefresh}>
                <FaSyncAlt />
              </button>

              <button
                className="btn btn-warning fw-bold"
                onClick={handleCreate}
              >
                <FaPlus className="me-2" />
                Create Order
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
                  type="text"
                  className="form-control"
                  placeholder="Search Order..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-8 text-end">
              <strong>Total Orders : {filteredOrder.length}</strong>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredOrder}
            pagination
            responsive
            striped
            highlightOnHover
            persistTableHead
            progressPending={loading}
            noDataComponent={
              <div className="py-5">
                <h5>No Orders Found</h5>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
