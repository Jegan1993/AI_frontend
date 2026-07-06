import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLeadById, updateLeads } from "../../CreateSlice/LeadSlice";
function EditLead() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "",
    country: "",
    employees: "",
    estimatedBudget: "",
    source: "Website",
    status: "New",
    notes: "",
  });

  const dispatch = useDispatch();

  const { lead, loading } = useSelector((state) => state.lead);
  const { id } = useParams();

  console.log("Router id", id);

  useEffect(() => {
    console.log("Redux lead:", lead);
  }, [lead]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateLeads({
        id,
        data: formData,
      }),
    );
    console.log("result------", result);

    if (updateLeads.fulfilled.match(result)) {
      navigate("/lead");
    }
  };
  const handleAddButtonClick = () => {
    navigate("/lead");
  };

  useEffect(() => {
    dispatch(getLeadById(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (lead) {
      setFormData({
        companyName: lead.companyName || "",
        contactPerson: lead.contactPerson || "",
        email: lead.email || "",
        phone: lead.phone || "",
        industry: lead.industry || "",
        country: lead.country || "",
        employees: lead.employees || "",
        estimatedBudget: lead.estimatedBudget || "",
        source: lead.source || "Website",
        status: lead.status || "New",
        notes: lead.notes || "",
      });
    }
  }, [lead]);
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleAddButtonClick}>
          Back
        </button>
      </div>
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0 ">Edit Lead</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Contact Person</label>
                <input
                  type="text"
                  className="form-control"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Industry</label>
                <input
                  type="text"
                  className="form-control"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Employees</label>
                <input
                  type="number"
                  className="form-control"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Estimated Budget</label>
                <input
                  type="number"
                  className="form-control"
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Lead Source</label>
                <select
                  className="form-select"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                >
                  <option>Website</option>
                  <option>LinkedIn</option>
                  <option>Facebook</option>
                  <option>Referral</option>
                  <option>Manual</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Lead Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-end">
              <button className="btn btn-primary px-4">Update Lead</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditLead;
