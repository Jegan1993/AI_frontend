import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createFleetDriver } from "../../CreateSlice/FleetDriveSlice.jsx";
import DriverForm from "./DriverForm";

function CreateDriver() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    licenseNumber: "",
    licenseExpiry: "",
    address: "",
    experience: "",
    status: "Available",
  };

  const handleSubmit = async (values) => {
    const result = await dispatch(createFleetDriver(values));

    if (createFleetDriver.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate("/view-driver");
    } else {
      toast.error(
        result.payload?.message ||
          result.error?.message ||
          "Failed to create Driver.",
      );
    }
  };

  return (
    <DriverForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      buttonText="Create Driver"
    />
  );
}

export default CreateDriver;
