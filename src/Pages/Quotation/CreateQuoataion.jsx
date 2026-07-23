import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import QuotationForm from "./QuotationForm";
import { toast } from "react-toastify";

import { getCustomer } from "../../CreateSlice/CustomerSlice";
import { createQuotation } from "../../CreateSlice/QuotationSlice";

function CreateQuotation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lead Redux
  // const { leads } = useSelector((state) => state.lead);
  const { customers } = useSelector((state) => state.customer);

  // Quotation Redux
  const { loading } = useSelector((state) => state.quotation);

  const [formData, setFormData] = useState({
    // leadId: "",
    customerId: "",
    quotationNo: `QT-${Date.now()}`,

    validUntil: "",

    tax: 0,

    discount: 0,

    subtotal: 0,

    grandTotal: 0,

    notes: "",

    items: [
      {
        service: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ],
  });

  // Load Leads
  useEffect(() => {
    // dispatch(getLeads());
    dispatch(getCustomer());
  }, [dispatch]);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(createQuotation(formData));
    if (createQuotation.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      navigate("/view-quotation");
    } else if (createQuotation.rejected.match(result)) {
      toast.error(result.payload?.message || result.error?.message);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Create Quotation</h2>

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
        submitText="Create Quotation"
      />
    </div>
  );
}

export default CreateQuotation;
