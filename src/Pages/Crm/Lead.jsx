import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLeads, deleteLeads } from "../../CreateSlice/LeadSlice";
function Lead() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { leads, total, page, limit, loading } = useSelector(
    (state) => state.lead,
  );

  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);
  console.log("leads", leads);
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: "Contact Person",
      selector: (row) => row.contactPerson,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Industry",
      selector: (row) => row.industry,
    },
    {
      name: "Country",
      selector: (row) => row.country,
    },
    {
      name: "Employees",
      selector: (row) => row.employees,
      sortable: true,
    },
    {
      name: "Budget",
      selector: (row) => `$${row.estimatedBudget}`,
      sortable: true,
    },
    {
      name: "AI Score",
      selector: (row) => row.aiLeadScore,
      sortable: true,
    },
    {
      name: "Priority",
      cell: (row) => (
        <span
          className={`badge ${
            row.aiPriority === "High"
              ? "bg-danger"
              : row.aiPriority === "Medium"
                ? "bg-warning text-dark"
                : "bg-success"
          }`}
        >
          {row.aiPriority}
        </span>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => handleEdit(row)}
          >
            <FaEdit />
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];
  const handleEdit = (row) => {
    navigate(`/edit-lead/${row._id}`);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteLeads(id));
  };
  const handleAddButtonClick = () => {
    navigate("/create-lead");
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleAddButtonClick}>
          Add Lead
        </button>
      </div>
      <div className="card shadow">
        <div className="card-header">
          <h4 className="mb-0 text-center">Lead Management</h4>
        </div>

        <div className="card-body">
          <DataTable
            columns={columns}
            data={leads}
            progressPending={loading}
            pagination
            highlightOnHover
            responsive
            striped
            persistTableHead
            noDataComponent="No Leads Found"
          />
        </div>
      </div>
    </div>
  );
}

export default Lead;
