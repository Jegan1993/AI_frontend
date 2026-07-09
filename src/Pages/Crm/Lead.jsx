import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaEdit,
  FaTrash,
  FaRobot,
  FaEnvelope,
  FaUserCheck,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLeads, deleteLeads } from "../../CreateSlice/LeadSlice";
import { createCustomer } from "../../CreateSlice/CustomerSlice";
import {
  generateLeadScore,
  generateEmail,
  clearEmail,
} from "../../CreateSlice/AiSlice";
function Lead() {
  const [showModal, setShowModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { leads, total, page, limit, loading } = useSelector(
    (state) => state.lead,
  );
  const {
    leadScore,
    loading: aiLoading,
    email,
  } = useSelector((state) => state.ai);
  const handleAiScore = async (id) => {
    const result = await dispatch(generateLeadScore(id));

    if (generateLeadScore.fulfilled.match(result)) {
      setShowModal(true);
    }
  };
  const handleGenerateEmail = async (leadId) => {
    const result = await dispatch(generateEmail(leadId));
    if (generateEmail.fulfilled.match(result)) {
      setShowEmailModal(true);
    }
  };
  const closeEmailModal = () => {
    setShowEmailModal(false);

    dispatch(clearEmail());
  };
  useEffect(() => {
    dispatch(getLeads());
  }, [dispatch]);

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
      name: "Name",
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
      name: "Total Employees",
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
      minWidth: "260px",
      cell: (row) => (
        <div className="d-flex align-items-center gap-2 flex-nowrap">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <FaEdit />
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row._id)}
            title="Delete"
          >
            <FaTrash />
          </button>

          <button
            className="btn btn-info btn-sm text-nowrap"
            onClick={() => handleAiScore(row._id)}
            title="AI Score"
          >
            AI Score
          </button>

          <button
            className="btn btn-primary btn-sm text-nowrap"
            onClick={() => handleGenerateEmail(row._id)}
            title="AI Email"
          >
            AI Email
          </button>

          {row.isConverted ? (
            <span className="badge bg-success px-3 py-2">Converted</span>
          ) : row.status === "Won" ? (
            <button
              className="btn btn-success btn-sm text-nowrap"
              onClick={() => handleConvert(row._id)}
              title="Convert"
            >
              <FaUserCheck className="me-1" />
              Convert
            </button>
          ) : (
            <span className="badge bg-secondary px-3 py-2">Not Eligible</span>
          )}
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

  const handleConvert = async (leadId) => {
    const result = await dispatch(createCustomer(leadId));

    if (createCustomer.fulfilled.match(result)) {
      dispatch(getLeads());

      navigate("/get-customer");
    } else {
      alert(result.payload?.message || "Customer conversion failed.");
    }
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
        {showModal && leadScore && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              background: "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">AI Lead Analysis</h5>

                  <button
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <h4>Score : {leadScore.score}</h4>

                  <h5>Priority : {leadScore.priority}</h5>

                  <hr />

                  <h6>Reason</h6>

                  <p>{leadScore.reason}</p>

                  <hr />

                  <h6>Next Action</h6>

                  <p>{leadScore.nextAction}</p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showEmailModal && email && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">AI Email Generator</h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowEmailModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Subject</label>

                    <input
                      type="text"
                      className="form-control"
                      value={email.subject}
                      readOnly
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Generated Email
                    </label>

                    <textarea
                      rows={15}
                      className="form-control"
                      value={email.body}
                      readOnly
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `Subject: ${email.subject}\n\n${email.body}`,
                      )
                    }
                  >
                    Copy Email
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowEmailModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lead;
