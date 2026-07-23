import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import QuotationForm from "./QuotationForm";

import {
  getQuotationById,
  updateQuotation,
} from "../../CreateSlice/QuotationSlice";
import { toast } from "react-toastify";
import { getCustomer } from "../../CreateSlice/CustomerSlice";

function EditQuotation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { quotation, loading } = useSelector((state) => state.quotation);

  const { customers } = useSelector((state) => state.customer);

  const [formData, setFormData] = useState({
    customerId: "",

    quotationNo: "",

    validUntil: "",

    tax: 0,

    discount: 0,

    subtotal: 0,

    grandTotal: 0,

    currency: "USD",

    notes: "",

    items: [
      {
        service: "",
        description: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ],
  });

  useEffect(() => {
    dispatch(getCustomer());
    dispatch(getQuotationById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!quotation) return;

    setFormData({
      customerId: quotation.customerId?._id || "",

      quotationNo: quotation.quotationNo || "",

      validUntil: quotation.validUntil
        ? quotation.validUntil.substring(0, 10)
        : "",

      tax: quotation.tax || 0,

      discount: quotation.discount || 0,

      subtotal: quotation.subtotal || 0,

      grandTotal: quotation.grandTotal || 0,

      currency: quotation.currency || "USD",

      notes: quotation.notes || "",

      items:
        quotation.items && quotation.items.length > 0
          ? quotation.items
          : [
              {
                service: "",
                description: "",
                quantity: 1,
                unitPrice: 0,
                total: 0,
              },
            ],
    });
  }, [quotation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateQuotation({
        id,
        data: formData,
      }),
    );

    if (updateQuotation.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      navigate("/view-quotation");
    } else if (updateQuotation.rejected.match(result)) {
      toast.error(result.payload?.message || result.error?.message);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Edit Quotation</h2>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/view-quotation")}
        >
          Back
        </button>
      </div>

      <QuotationForm
        formData={formData}
        setFormData={setFormData}
        customers={customers}
        loading={loading}
        onSubmit={handleSubmit}
        submitText="Update Quotation"
      />
    </div>
  );
}

export default EditQuotation;
