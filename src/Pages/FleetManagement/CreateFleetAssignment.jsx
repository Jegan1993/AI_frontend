import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createFleetAssignment } from "../../CreateSlice/FleetAssingmentSlice.jsx";
import { getShipments } from "../../CreateSlice/ShipmentSlice.jsx";
import { getFleetVehicle } from "../../CreateSlice/FleetVehicleSlice.jsx";
import { getFleetDriver } from "../../CreateSlice/FleetDriveSlice.jsx";

import FleetAssignmentForm from "./FleetAssignmentForm";

function CreateFleetAssignment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getShipments());
    dispatch(
      getFleetVehicle({
        status: "Available",
      }),
    );
    dispatch(
      getFleetDriver({
        status: "Available",
      }),
    );
  }, [dispatch]);

  const initialValues = {
    shipmentId: "",
    vehicleId: "",
    driverId: "",
    dispatchDate: "",
    remarks: "",
  };

  const handleSubmit = async (values) => {
    const result = await dispatch(createFleetAssignment(values));

    if (createFleetAssignment.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate("/view-fleet-assignment");
    } else {
      toast.error(
        result.payload?.message ||
          result.error?.message ||
          "Fleet Assignment failed.",
      );
    }
  };

  return (
    <FleetAssignmentForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      buttonText="Assign Fleet"
    />
  );
}

export default CreateFleetAssignment;
