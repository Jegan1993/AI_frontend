import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import DriverForm from "./DriverForm";

import {
  getFleetDriverById,
  updateFleetDriver,
} from "../../CreateSlice/FleetDriveSlice.jsx";

function EditDriver() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { driver, loading } = useSelector((state) => state.driver);

  useEffect(() => {
    dispatch(getFleetDriverById(id));
  }, [dispatch, id]);

  const handleSubmit = async (values) => {
    const result = await dispatch(
      updateFleetDriver({
        id,
        data: values,
      }),
    );

    if (updateFleetDriver.fulfilled.match(result)) {
      toast.success(result.payload.message);
      navigate("/view-driver");
    } else {
      toast.error(
        result.payload?.message ||
          result.error?.message ||
          "Failed to update Driver.",
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h5>Loading...</h5>
      </div>
    );
  }

  if (!driver) return null;

  return (
    <DriverForm
      initialValues={{
        name: driver.name || "",
        phone: driver.phone || "",
        email: driver.email || "",
        licenseNumber: driver.licenseNumber || "",
        licenseExpiry: driver.licenseExpiry
          ? driver.licenseExpiry.slice(0, 10)
          : "",
        address: driver.address || "",
        experience: driver.experience || "",
        status: driver.status || "Available",
      }}
      onSubmit={handleSubmit}
      buttonText="Update Driver"
      enableReinitialize={true}
    />
  );
}

export default EditDriver;
