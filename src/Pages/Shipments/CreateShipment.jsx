import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createShipment } from "../../CreateSlice/ShipmentSlice";
import ShipmentForm from "./ShipmentForm";

function CreateShipment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shipmentNo: `SHP-${Date.now()}`,
    orderId: "",
    customerId: "",
    trackingNumber: `DL-${Date.now()}`,
    courierName: "",
    shipmentDate: "",
    expectedDelivery: "",
    routeFrom: "",
    routeTo: "",
    status: "Created",
    remarks: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(createShipment(formData));

    if (createShipment.fulfilled.match(result)) {
      navigate("/view-shipment");
    }
    if (createShipment.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      navigate("/view-shipment");
    } else if (createShipment.rejected.match(result)) {
      toast.error(
        result.payload?.message ||
          result.error?.message ||
          "Failed to update shipment.",
      );
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
