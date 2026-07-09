import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../../CreateSlice/CustomerSlice";
import { getQuotation } from "../../CreateSlice/QuotationSlice";

function OrderForm({
  formData,
  setFormData,
  onSubmit,
  buttonText = "Save Order",
}) {
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.customer.customer || []);

  const quotations = useSelector(
    (state) => state.quotation.quotations || []
  );
  useEffect(() => {
    dispatch(getCustomer());
    dispatch(getQuotation());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuotationChange = (e) => {
    const quotationId = e.target.value;

    const quotation = quotations.find((item) => item._id === quotationId);

    if (!quotation) return;

    setFormData((prev) => ({
      ...prev,
      quotationId,
      customerId: quotation.customerId?._id,
      totalAmount: quotation.grandTotal,
    }));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">{buttonText}</h4>
        </div>

        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Order Number</label>

                <input
                  type="text"
                  className="form-control"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Order Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="orderDate"
                  value={formData.orderDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Select Accepted Quotation</label>

                <select
                  className="form-select"
                  value={formData.quotationId}
                  onChange={handleQuotationChange}
                >
                  <option value="">Select Quotation</option>

                  {quotations
                    .filter((q) => q.status === "Accepted")
                    .map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.quotationNo}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Customer</label>

                <select
                  className="form-select"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                >
                  <option value="">Select Customer</option>

                  {customer.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Delivery Address</label>

                <input
                  type="text"
                  className="form-control"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Payment Method</label>

                <select
                  className="form-select"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Payment Status</label>

                <select
                  className="form-select"
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Partially Paid">Partially Paid</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Total Amount</label>

                <input
                  type="number"
                  className="form-control"
                  name="totalAmount"
                  value={formData.totalAmount}
                  readOnly
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Notes</label>

                <textarea
                  rows="4"
                  className="form-control"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-end">
              <button className="btn btn-success px-4">{buttonText}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
