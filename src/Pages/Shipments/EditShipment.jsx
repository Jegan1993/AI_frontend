import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getShipmentById,
  updateShipment,
} from "../../CreateSlice/ShipmentSlice";

import ShipmentForm from "./ShipmentForm";

function EditShipment() {
  const { id } = useParams();

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

  useEffect(() => {
    fetchShipment();
  }, []);

  const fetchShipment = async () => {
    const result = await dispatch(getShipmentById(id));

    if (getShipmentById.fulfilled.match(result)) {
      const shipment = result.payload.data;

      setFormData({
        shipmentNo: shipment.shipmentNo || "",
        orderId: shipment.orderId?._id || shipment.orderId,
        customerId: shipment.customerId?._id || shipment.customerId,
        trackingNo: shipment.trackingNo || "",
        carrier: shipment.carrier || "",
        dispatchDate: shipment.dispatchDate
          ? shipment.dispatchDate.substring(0, 10)
          : "",
        expectedDelivery: shipment.expectedDelivery
          ? shipment.expectedDelivery.substring(0, 10)
          : "",
        shippingAddress: shipment.shippingAddress || "",
        status: shipment.status || "Pending",
        notes: shipment.notes || "",
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const result = await dispatch(
  //     updateShipment({
  //       id,
  //       data: formData,
  //     }),
  //   );

  //   if (updateShipment.fulfilled.match(result)) {
  //     navigate("/view-shipment");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateShipment({
        id,
        data: formData,
      }),
    );

    if (updateShipment.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      navigate("/view-shipment");
    } else if (updateShipment.rejected.match(result)) {
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
      buttonText="Update Shipment"
    />
  );
}

export default EditShipment;
