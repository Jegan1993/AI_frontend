import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getWarehouseById,
  updateWarehouse,
} from "../CreateSlice/WareHouseSlice.jsx";

function EditWarehouse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { selectedWarehouse, loading } = useSelector(
    (state) => state.warehouse,
  );
  console.log("selectedWarehouse", selectedWarehouse);
  useEffect(() => {
    dispatch(getWarehouseById(id));
  }, [dispatch, id]);

  const validationSchema = Yup.object({
    warehouseCode: Yup.string().required("Warehouse Code is required"),
    warehouseName: Yup.string().required("Warehouse Name is required"),
    managerName: Yup.string().required("Manager Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    capacity: Yup.number().required("Capacity is required"),
  });

  if (loading || !selectedWarehouse) {
    return (
      <div className="container mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h4 className="mb-0">Edit Warehouse</h4>
        </div>

        <div className="card-body">
          <Formik
            enableReinitialize
            initialValues={{
              warehouseCode: selectedWarehouse.warehouseCode || "",
              warehouseName: selectedWarehouse.warehouseName || "",
              managerName: selectedWarehouse.managerName || "",
              email: selectedWarehouse.email || "",
              phone: selectedWarehouse.phone || "",
              address: selectedWarehouse.address || "",
              city: selectedWarehouse.city || "",
              state: selectedWarehouse.state || "",
              country: selectedWarehouse.country || "",
              capacity: selectedWarehouse.capacity || "",
              description: selectedWarehouse.description || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const result = await dispatch(
                updateWarehouse({
                  id,
                  data: values,
                }),
              );

              if (updateWarehouse.fulfilled.match(result)) {
                navigate("/view-warehouse");
              }
            }}
          >
            <Form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Warehouse Code</label>
                  <Field name="warehouseCode" className="form-control" />
                  <ErrorMessage
                    name="warehouseCode"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Warehouse Name</label>
                  <Field name="warehouseName" className="form-control" />
                  <ErrorMessage
                    name="warehouseName"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Manager Name</label>
                  <Field name="managerName" className="form-control" />
                  <ErrorMessage
                    name="managerName"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Phone</label>
                  <Field name="phone" className="form-control" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Capacity</label>
                  <Field
                    name="capacity"
                    type="number"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="capacity"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label>Address</label>
                  <Field name="address" className="form-control" />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>City</label>
                  <Field name="city" className="form-control" />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>State</label>
                  <Field name="state" className="form-control" />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Country</label>
                  <Field name="country" className="form-control" />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label>Description</label>
                  <Field
                    as="textarea"
                    rows="4"
                    name="description"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/view-warehouse")}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-warning">
                  Update Warehouse
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EditWarehouse;
