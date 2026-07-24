import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createFleetVehicle } from "../../CreateSlice/FleetVehicleSlice";
import VehicleForm from "./VehicleForm";

function CreateVehicle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    capacity: "",
    fuelType: "",
    manufacturer: "",
    model: "",
    registrationDate: "",
    insuranceExpiry: "",
    pollutionExpiry: "",
    fitnessExpiry: "",
    currentOdometer: "",
    status: "Available",
  });

  const handleSubmit = async (values) => {
    const result = await dispatch(createFleetVehicle(values));

    if (createFleetVehicle.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      navigate("/view-vehicle");
    } else {
      toast.error(
        result.payload?.message ||
          result.error?.message ||
          "Failed to create vehicle.",
      );
    }
  };

  return (
    <VehicleForm
      initialValues={formData}
      onSubmit={handleSubmit}
      buttonText="Create Vehicle"
    />
  );
}

export default CreateVehicle;
