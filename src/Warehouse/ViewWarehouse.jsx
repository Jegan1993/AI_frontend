import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getWarehouses,
  deleteWarehouse,
} from "../CreateSlice/WareHouseSlice.jsx";

function ViewWarehouse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    warehouses = [],
    loading,
    page,
    limit,
  } = useSelector((state) => state.warehouse);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getWarehouses({
        page: 1,
        limit: 10,
      }),
    );
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(
      getWarehouses({
        page: 1,
        limit: 10,
      }),
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Warehouse?")) return;

    const result = await dispatch(deleteWarehouse(id));

    if (deleteWarehouse.fulfilled.match(result)) {
      handleRefresh();
    }
  };

  const filteredWarehouse = warehouses.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.warehouseName?.toLowerCase().includes(value) ||
      item.warehouseCode?.toLowerCase().includes(value) ||
      item.managerName?.toLowerCase().includes(value) ||
      item.city?.toLowerCase().includes(value)
    );
  });

  const columns = [
    {
      name: "S.No",
      width: "80px",
      cell: (row, index) => (page - 1) * limit + index + 1,
    },

    {
      name: "Warehouse",
      selector: (row) => row.warehouseName,
      sortable: true,
    },

    {
      name: "Code",
      selector: (row) => row.warehouseCode,
      sortable: true,
    },

    {
      name: "Manager",
      selector: (row) => row.managerName || "--",
    },

    {
      name: "Email",
      selector: (row) => row.email || "--",
    },

    {
      name: "Phone",
      selector: (row) => row.phone || "--",
    },

    {
      name: "City",
      selector: (row) => row.city,
    },

    {
      name: "Capacity",
      selector: (row) => row.capacity,
      center: true,
    },

    {
      name: "Available",
      selector: (row) => row.availableSpace,
      center: true,
    },

    {
      name: "Status",
      center: true,
      cell: (row) => (
        <span
          className={`badge ${
            row.status === "Active" ? "bg-success" : "bg-danger"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      name: "Action",
      width: "180px",
      center: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-info btn-sm"
            onClick={() => navigate(`/warehouse-details/${row._id}`)}
          >
            <FaEye />
          </button>

          <button
            className="btn btn-warning btn-sm"
            onClick={() => navigate(`/edit-warehouse/${row._id}`)}
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
    <div className="container mt-4">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Warehouse Management</h4>

            <div className="d-flex gap-2">
              <button className="btn btn-light" onClick={handleRefresh}>
                <FaSyncAlt />
              </button>

              <button
                className="btn btn-warning fw-bold"
                onClick={() => navigate("/create-warehouse")}
              >
                <FaPlus className="me-2" />
                Create Warehouse
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
                  placeholder="Search Warehouse..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-8 text-end">
              <strong>Total Warehouses : {filteredWarehouse.length}</strong>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredWarehouse}
            pagination
            responsive
            striped
            highlightOnHover
            persistTableHead
            progressPending={loading}
            noDataComponent={
              <div className="py-5">
                <h5>No Warehouse Found</h5>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ViewWarehouse;
