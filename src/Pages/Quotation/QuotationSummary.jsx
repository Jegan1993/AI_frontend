import React, { useEffect } from "react";

function QuotationSummary({ formData, setFormData }) {
  useEffect(() => {
    const subtotal = formData.items.reduce((sum, item) => {
      return sum + Number(item.total || 0);
    }, 0);

    const tax = Number(formData.tax || 0);

    const discount = Number(formData.discount || 0);

    const grandTotal = subtotal + tax - discount;

    // Prevent infinite re-render
    if (subtotal !== formData.subtotal || grandTotal !== formData.grandTotal) {
      setFormData((prev) => ({
        ...prev,
        subtotal,
        grandTotal,
      }));
    }
  }, [
    formData.items,
    formData.tax,
    formData.discount,
    formData.subtotal,
    formData.grandTotal,
    setFormData,
  ]);

  return (
    <div className="row justify-content-end">
      <div className="col-md-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">Quotation Summary</h5>
          </div>

          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <strong>Subtotal</strong>

              <span>₹ {Number(formData.subtotal || 0).toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <strong>Tax</strong>

              <span>₹ {Number(formData.tax || 0).toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <strong>Discount</strong>

              <span className="text-danger">
                - ₹ {Number(formData.discount || 0).toFixed(2)}
              </span>
            </div>

            <hr />

            <div className="d-flex justify-content-between">
              <h5 className="fw-bold">Grand Total</h5>

              <h5 className="fw-bold text-primary">
                ₹ {Number(formData.grandTotal || 0).toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuotationSummary;
