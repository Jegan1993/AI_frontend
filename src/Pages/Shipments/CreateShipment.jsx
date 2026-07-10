import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createShipment } from "../../CreateSlice/ShipmentSlice";
import ShipmentForm from "./ShipmentForm";

function CreateShipment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shipmentNo: `SHP-${Date.now()}`,
    orderId: "",
    customerId: "",
    trackingNo: "",
    carrier: "",
    dispatchDate: "",
    expectedDelivery: "",
    shippingAddress: "",
    status: "Pending",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(createShipment(formData));

    if (createShipment.fulfilled.match(result)) {
      navigate("/view-shipment");
    }
  };

  return (
    <ShipmentForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Create Shipment"
    />
  );
}

export default CreateShipment;
