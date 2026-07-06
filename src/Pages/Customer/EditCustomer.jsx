import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getCustomerById,
  updateCustomer,
} from "../../CreateSlice/CustomerSlice";

function EditCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { customer, loading } = useSelector((state) => state.customer);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "",
    country: "",
    employees: "",
    estimatedBudget: "",
    customerStatus: "Active",
    notes: "",
  });

  useEffect(() => {
    dispatch(getCustomerById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (customer) {
      setFormData({
        companyName: customer.companyName || "",
        contactPerson: customer.contactPerson || "",
        email: customer.email || "",
        phone: customer.phone || "",
        industry: customer.industry || "",
        country: customer.country || "",
        employees: customer.employees || "",
        estimatedBudget: customer.estimatedBudget || "",
        customerStatus: customer.customerStatus || "Active",
        notes: customer.notes || "",
      });
    }
  }, [customer]);

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
      updateCustomer({
        id,
        data: formData,
      }),
    );

    if (updateCustomer.fulfilled.match(result)) {
      navigate("/get-customer");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/get-customer")}
        >
          Back
        </button>
      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h4>Edit Customer</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Company Name</label>
                <input
                  className="form-control"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Contact Person</label>
                <input
                  className="form-control"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Industry</label>
                <input
                  className="form-control"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Country</label>
                <input
                  className="form-control"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Employees</label>
                <input
                  className="form-control"
                  type="number"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Estimated Budget</label>
                <input
                  className="form-control"
                  type="number"
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Customer Status</label>

                <select
                  className="form-select"
                  name="customerStatus"
                  value={formData.customerStatus}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blacklisted">Blacklisted</option>
                </select>
              </div>

              <div className="col-12 mb-3">
                <label>Notes</label>

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
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Update Customer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCustomer;
