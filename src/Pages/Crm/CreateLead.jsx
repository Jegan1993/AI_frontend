import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLeads } from "../CreateSlice/LeadSlice.jsx";
function CreateLead() {
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
    notes: "",
  });
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3131/api/create-lead",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("response", response);

      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        industry: "",
        country: "",
        employees: "",
        estimatedBudget: "",
        source: "Website",
        notes: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddButtonClick = () => {
    navigate("/lead");
  };
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleAddButtonClick}>
          Back
        </button>
      </div>
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0 ">Create Lead</h4>
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
              <button className="btn btn-primary px-4">Create Lead</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateLead;
