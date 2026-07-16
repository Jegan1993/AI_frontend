import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { getCustomer } from "../../CreateSlice/CustomerSlice";
import { getQuotation } from "../../CreateSlice/QuotationSlice";
import { orderValidationSchema } from "../../helper/ValidationSchema";
import { useNavigate } from "react-router-dom";

function OrderForm({ initialValues, onSubmit, buttonText = "Save Order" }) {
  const dispatch = useDispatch();

  const customers = useSelector((state) => state.customer.customers || []);

  console.log("customers", customers);

  const quotations = useSelector((state) => state.quotation.quotations || []);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCustomer());
    dispatch(getQuotation());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: orderValidationSchema,

    onSubmit: (values) => {
      console.log("Submitted");
      console.log("values", values);
      onSubmit(values);
    },
  });

  useEffect(() => {
    console.log("Errors:", formik.errors);
    console.log("Touched:", formik.touched);
  }, [formik.errors, formik.touched]);

  const handleQuotationChange = (e) => {
    const quotationId = e.target.value;

    const quotation = quotations.find((item) => item._id === quotationId);

    if (!quotation) return;

    formik.setValues({
      ...formik.values,
      quotationId,
      customerId: quotation.customerId?._id || "",
      totalAmount: quotation.grandTotal || 0,
    });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/view-order")}
        >
          Back
        </button>
      </div>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>{buttonText}</h4>
        </div>

        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form Submitted");
              formik.handleSubmit(e);
            }}
          >
            <div className="row">
              {/* Order Number */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Order Number</label>

                <input
                  type="text"
                  name="orderNumber"
                  className="form-control"
                  value={formik.values.orderNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.orderNumber && formik.errors.orderNumber && (
                  <small className="text-danger">
                    {formik.errors.orderNumber}
                  </small>
                )}
              </div>

              {/* Order Date */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Order Date</label>

                <input
                  type="date"
                  name="orderDate"
                  className="form-control"
                  value={formik.values.orderDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.orderDate && formik.errors.orderDate && (
                  <small className="text-danger">
                    {formik.errors.orderDate}
                  </small>
                )}
              </div>

              {/* Quotation */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Accepted Quotation</label>

                <select
                  name="quotationId"
                  className="form-select"
                  value={formik.values.quotationId}
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

                {formik.touched.quotationId && formik.errors.quotationId && (
                  <small className="text-danger">
                    {formik.errors.quotationId}
                  </small>
                )}
              </div>

              {/* Customer */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Customer</label>

                <select
                  name="customerId"
                  className="form-select"
                  value={formik.values.customerId}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Customer</option>

                  {customers.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.companyName}
                    </option>
                  ))}
                </select>

                {formik.touched.customerId && formik.errors.customerId && (
                  <small className="text-danger">
                    {formik.errors.customerId}
                  </small>
                )}
              </div>

              {/* Delivery Address */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Delivery Address</label>

                <input
                  type="text"
                  name="deliveryAddress"
                  className="form-control"
                  value={formik.values.deliveryAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.deliveryAddress &&
                  formik.errors.deliveryAddress && (
                    <small className="text-danger">
                      {formik.errors.deliveryAddress}
                    </small>
                  )}
              </div>

              {/* Payment Method */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Payment Method</label>

                <select
                  name="paymentMethod"
                  className="form-select"
                  value={formik.values.paymentMethod}
                  onChange={formik.handleChange}
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              {/* Payment Status */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Payment Status</label>

                <select
                  name="paymentStatus"
                  className="form-select"
                  value={formik.values.paymentStatus}
                  onChange={formik.handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                </select>
              </div>

              {/* Total */}

              <div className="col-md-6 mb-3">
                <label className="form-label">Total Amount</label>

                <input
                  type="number"
                  className="form-control"
                  value={formik.values.totalAmount}
                  readOnly
                />
              </div>

              {/* Notes */}

              <div className="col-12 mb-3">
                <label className="form-label">Notes</label>

                <textarea
                  rows="4"
                  name="notes"
                  className="form-control"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="text-end">
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => console.log("Button Clicked")}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
