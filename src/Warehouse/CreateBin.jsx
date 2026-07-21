import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createBin } from "../CreateSlice/BinSlice";
import { getWarehouses } from "../CreateSlice/WareHouseSlice";

function CreateBin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { warehouses } = useSelector((state) => state.warehouse);
  console.log("warehouse bin management", warehouses);
  useEffect(() => {
    dispatch(getWarehouses());
  }, [dispatch]);

  const validationSchema = Yup.object({
    warehouseId: Yup.string().required("Warehouse is required"),
    binCode: Yup.string().required("Bin Code is required"),
    rack: Yup.string().required("Rack is required"),
    shelf: Yup.string().required("Shelf is required"),
    capacity: Yup.number()
      .required("Capacity is required")
      .positive("Capacity must be greater than 0"),
  });

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4>Create Bin</h4>
        </div>

        <div className="card-body">
          <Formik
            initialValues={{
              warehouseId: "",
              binCode: "",
              rack: "",
              shelf: "",
              capacity: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const result = await dispatch(createBin(values));

              if (!result.error) {
                resetForm();
                navigate("/view-bin");
              }
            }}
          >
            <Form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Warehouse</label>

                  <Field
                    as="select"
                    name="warehouseId"
                    className="form-control"
                  >
                    <option value="">Select Warehouse</option>

                    {warehouses?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.warehouseName}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="warehouseId"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Bin Code</label>

                  <Field
                    type="text"
                    name="binCode"
                    className="form-control"
                    placeholder="BIN-001"
                  />

                  <ErrorMessage
                    name="binCode"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Rack</label>

                  <Field
                    type="text"
                    name="rack"
                    className="form-control"
                    placeholder="Rack A"
                  />

                  <ErrorMessage
                    name="rack"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Shelf</label>

                  <Field
                    type="text"
                    name="shelf"
                    className="form-control"
                    placeholder="Shelf 1"
                  />

                  <ErrorMessage
                    name="shelf"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Capacity</label>

                  <Field
                    type="number"
                    name="capacity"
                    className="form-control"
                    placeholder="100"
                  />

                  <ErrorMessage
                    name="capacity"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Create Bin
                </button>

                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => navigate("/view-bin")}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateBin;
