import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { createWarehouse } from "../CreateSlice/WareHouseSlice.jsx";

function CreateWarehouse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    warehouseCode: "",
    warehouseName: "",
    managerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    capacity: "",
    description: "",
  };

  const validationSchema = Yup.object({
    warehouseCode: Yup.string().required("Warehouse Code is required"),
    warehouseName: Yup.string().required("Warehouse Name is required"),
    managerName: Yup.string().required("Manager Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    phone: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State StockControlleris required"),
    country: Yup.string().required("Country is required"),
    capacity: Yup.number()
      .typeError("Capacity must be number")
      .required("Capacity is required"),
  });

  const handleSubmit = async (values) => {
    const result = await dispatch(createWarehouse(values));
    console.log("create result", result);
    if (createWarehouse.fulfilled.match(result)) {
      navigate("/view-warehouse");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Create Warehouse</h4>
        </div>

        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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

                <button type="submit" className="btn btn-primary">
                  Create Warehouse
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateWarehouse;
