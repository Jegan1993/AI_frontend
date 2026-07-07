import React from "react";
import QuotationItems from "./QuotationItems";
import QuotationSummary from "./QuotationSummary";

function QuotationForm({
  formData,
  setFormData,
  customers,
  loading = false,
  onSubmit,
  submitText ,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "tax" || name === "discount" ? Number(value) : value,
    }));
  };

  return (
    <div className="card shadow border-0">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">{submitText}</h4>
      </div>

      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="row">
            {/* Lead */}

            <select
              className="form-select"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
            >
              <option value="">Select Customer</option>

              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.companyName}
                </option>
              ))}
            </select>

            {/* Quotation Number */}

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Quotation Number</label>

              <input
                type="text"
                className="form-control"
                name="quotationNo"
                value={formData.quotationNo}
                onChange={handleChange}
                placeholder="QT-1001"
                required
              />
            </div>

            {/* Valid Until */}

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Valid Until</label>

              <input
                type="date"
                className="form-control"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleChange}
                required
              />
            </div>

            {/* Tax */}

            <div className="col-md-3 mb-3">
              <label className="form-label fw-semibold">Tax</label>

              <input
                type="number"
                className="form-control"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
              />
            </div>

            {/* Discount */}

            <div className="col-md-3 mb-3">
              <label className="form-label fw-semibold">Discount</label>

              <input
                type="number"
                className="form-control"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr className="my-4" />

          {/* Dynamic Item Table */}

          <QuotationItems formData={formData} setFormData={setFormData} />

          <hr className="my-4" />

          {/* Summary */}
          <QuotationSummary formData={formData} setFormData={setFormData} />

          <div className="mb-4">
            <label className="form-label fw-semibold">Notes</label>

            <textarea
              rows="4"
              className="form-control"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="text-end">
            <button className="btn btn-primary px-5" disabled={loading}>
              {loading ? "Saving..." : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuotationForm;
