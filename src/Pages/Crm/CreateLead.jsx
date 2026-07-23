import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLeads } from "../../CreateSlice/LeadSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
function CreateLead() {
  const navigate = useNavigate();

  const initialValues = {
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
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),

    contactPerson: Yup.string().required("Contact Person is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone is required"),

    industry: Yup.string().required("Industry is required"),

    country: Yup.string().required("Country is required"),

    employees: Yup.number()
      .typeError("Employees must be a number")
      .required("Employees is required")
      .min(1, "Minimum 1 employee"),

    estimatedBudget: Yup.number()
      .typeError("Estimated Budget must be a number")
      .required("Estimated Budget is required")
      .min(0, "Budget cannot be negative"),

    source: Yup.string().required("Lead Source is required"),

    notes: Yup.string().max(500, "Maximum 500 characters"),
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.lead);

  const handleSubmit = async (values, { resetForm }) => {
    const result = await dispatch(createLeads(values));

    if (createLeads.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      navigate("/lead");
    } else if (createLeads.rejected.match(result)) {
      toast.error(result.payload?.message || result.error?.message);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });
  const handleAddButtonClick = () => {
    navigate("/lead");
  };
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-secondary" onClick={handleAddButtonClick}>
          Back
        </button>
      </div>
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0 ">Create Lead</h4>
        </div>

        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.companyName && formik.errors.companyName
                      ? "is-invalid"
                      : ""
                  }`}
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.companyName && formik.errors.companyName && (
                  <div className="invalid-feedback">
                    {formik.errors.companyName}
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Contact Person</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.contactPerson && formik.errors.contactPerson
                      ? "is-invalid"
                      : ""
                  }`}
                  name="contactPerson"
                  value={formik.values.contactPerson}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.contactPerson &&
                  formik.errors.contactPerson && (
                    <div className="invalid-feedback">
                      {formik.errors.contactPerson}
                    </div>
                  )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.phone && formik.errors.phone
                      ? "is-invalid"
                      : ""
                  }`}
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Industry</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.industry && formik.errors.industry
                      ? "is-invalid"
                      : ""
                  }`}
                  name="industry"
                  value={formik.values.industry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.industry && formik.errors.industry && (
                  <div className="invalid-feedback">
                    {formik.errors.industry}
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.country && formik.errors.country
                      ? "is-invalid"
                      : ""
                  }`}
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="invalid-feedback">
                    {formik.errors.country}
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Employees</label>
                <input
                  type="number"
                  className={`form-control ${
                    formik.touched.employees && formik.errors.employees
                      ? "is-invalid"
                      : ""
                  }`}
                  name="employees"
                  value={formik.values.employees}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.employees && formik.errors.employees && (
                  <div className="invalid-feedback">
                    {formik.errors.employees}
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Estimated Budget</label>
                <input
                  type="number"
                  className={`form-control ${
                    formik.touched.estimatedBudget &&
                    formik.errors.estimatedBudget
                      ? "is-invalid"
                      : ""
                  }`}
                  name="estimatedBudget"
                  value={formik.values.estimatedBudget}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.estimatedBudget &&
                  formik.errors.estimatedBudget && (
                    <div className="invalid-feedback">
                      {formik.errors.estimatedBudget}
                    </div>
                  )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Lead Source</label>
                <select
                  className={`form-select ${
                    formik.touched.source && formik.errors.source
                      ? "is-invalid"
                      : ""
                  }`}
                  name="source"
                  value={formik.values.source}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  className={`form-control ${
                    formik.touched.notes && formik.errors.notes
                      ? "is-invalid"
                      : ""
                  }`}
                  rows="4"
                  name="notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.notes && formik.errors.notes && (
                  <div className="invalid-feedback">{formik.errors.notes}</div>
                )}
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
