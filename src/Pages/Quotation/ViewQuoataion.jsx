import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash, FaPlus, FaSyncAlt, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getQuotation,
  deleteQuotation,
} from "../../CreateSlice/QuotationSlice";

function ViewQuotation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quotations, loading, total, page, limit } = useSelector(
    (state) => state.quotation,
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getQuotation({
        page: 1,
        limit: 10,
      }),
    );
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(
      getQuotation({
        page: 1,
        limit: 10,
      }),
    );
  };

  const handleCreate = () => {
    navigate("/create-quotation");
  };

  const handleEdit = (row) => {
    navigate(`/edit-quotation/${row._id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quotation?",
    );

    if (!confirmDelete) return;

    const result = await dispatch(deleteQuotation(id));

    if (deleteQuotation.fulfilled.match(result)) {
      dispatch(getQuotation());
    }
  };

  const filteredQuotation = quotations.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.quotationNo?.toLowerCase().includes(value) ||
      item.leadId?.companyName?.toLowerCase().includes(value) ||
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
      name: "Quotation No",
      selector: (row) => row.quotationNo,
      sortable: true,
      grow: 1.5,
    },

    {
      name: "Customer",
      selector: (row) => row.customerId?.companyName || "--",
      sortable: true,
    },

    {
      name: "Contact Person",
      selector: (row) => row.customerId?.contactPerson || "--",
    },

    {
      name: "Email",
      selector: (row) => row.customerId?.email || "--",
    },

    {
      name: "Grand Total",
      selector: (row) => `₹ ${row.grandTotal?.toLocaleString()}`,
      sortable: true,
    },

    {
      name: "Valid Until",
      selector: (row) => new Date(row.validUntil).toLocaleDateString("en-GB"),
    },

    {
      name: "Status",
      center: true,
      cell: (row) => (
        <span
          className={`badge px-3 py-2 ${
            row.status === "Accepted"
              ? "bg-success"
              : row.status === "Rejected"
                ? "bg-danger"
                : row.status === "Sent"
                  ? "bg-primary"
                  : row.status === "Expired"
                    ? "bg-dark"
                    : "bg-warning text-dark"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      name: "Action",
      center: true,
      width: "170px",
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
            <h4 className="mb-0">Quotation Management</h4>

            <div className="d-flex gap-2">
              <button className="btn btn-light" onClick={handleRefresh}>
                <FaSyncAlt />
              </button>

              <button
                className="btn btn-warning fw-bold"
                onClick={handleCreate}
              >
                <FaPlus className="me-2" />
                Create Quotation
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
                  placeholder="Search quotation..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-8 text-end">
              <strong>Total Quotations : {filteredQuotation.length}</strong>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredQuotation}
            pagination
            highlightOnHover
            striped
            responsive
            persistTableHead
            progressPending={loading}
            noDataComponent={
              <div className="py-5">
                <h5>No Quotations Found</h5>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ViewQuotation;
