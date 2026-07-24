import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getFleetVehicleById,
  updateFleetVehicle,
} from "../../CreateSlice/FleetVehicleSlice";

import VehicleForm from "./VehicleForm";

function UpdateVehicle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { vehicle } = useSelector((state) => state.vehicle);
  console.log("vehicle", vehicle);
  useEffect(() => {
    dispatch(getFleetVehicleById(id));
  }, [dispatch, id]);

  const handleSubmit = async (values) => {
    const result = await dispatch(
      updateFleetVehicle({
        id,
        data: values,
      }),
    );

    if (updateFleetVehicle.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate("/view-vehicle");
    } else {
      toast.error(
        result.payload?.message ||
          result.error?.message ||
          "Vehicle update failed.",
      );
    }
  };

  if (!vehicle) return null;

  return (
    <VehicleForm
      initialValues={{
        vehicleNumber: vehicle.vehicleNumber || "",
        vehicleType: vehicle.vehicleType || "",
        capacity: vehicle.capacity || "",
        fuelType: vehicle.fuelType || "",
        manufacturer: vehicle.manufacturer || "",
        model: vehicle.model || "",
        registrationDate: vehicle.registrationDate
          ? vehicle.registrationDate.slice(0, 10)
          : "",
        insuranceExpiry: vehicle.insuranceExpiry
          ? vehicle.insuranceExpiry.slice(0, 10)
          : "",
        pollutionExpiry: vehicle.pollutionExpiry
          ? vehicle.pollutionExpiry.slice(0, 10)
          : "",
        fitnessExpiry: vehicle.fitnessExpiry
          ? vehicle.fitnessExpiry.slice(0, 10)
          : "",
        currentOdometer: vehicle.currentOdometer || 0,
        status: vehicle.status || "Available",
      }}
      onSubmit={handleSubmit}
      buttonText="Update Vehicle"
      enableReinitialize={true}
    />
  );
}

export default UpdateVehicle;
