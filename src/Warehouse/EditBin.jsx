import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getWarehouses } from "../CreateSlice/WareHouseSlice";
import { getBinById, updateBin } from "../CreateSlice/BinSlice";

function EditBin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { warehouses } = useSelector((state) => state.warehouse);
  const { bin, loading } = useSelector((state) => state.bin);

  useEffect(() => {
    dispatch(getBinById(id));
    dispatch(getWarehouses());
  }, [dispatch, id]);

  const validationSchema = Yup.object({
    warehouseId: Yup.string().required("Warehouse is required"),
    binCode: Yup.string().required("Bin Code is required"),
    rack: Yup.string().required("Rack is required"),
    shelf: Yup.string().required("Shelf is required"),
    capacity: Yup.number()
      .required("Capacity is required")
      .positive("Capacity must be greater than 0"),
  });

  if (loading || !bin) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4>Edit Bin</h4>
        </div>

        <div className="card-body">
          <Formik
            enableReinitialize
            initialValues={{
              warehouseId: bin.warehouseId?._id || "",
              binCode: bin.binCode || "",
              rack: bin.rack || "",
              shelf: bin.shelf || "",
              capacity: bin.capacity || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const result = await dispatch(
                updateBin({
                  id,
                  data: values,
                }),
              );

              if (!result.error) {
                navigate("/view-bin");
              }
            }}
          >
            <Form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Warehouse</label>

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
                  <label>Bin Code</label>

                  <Field type="text" name="binCode" className="form-control" />

                  <ErrorMessage
                    name="binCode"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Rack</label>

                  <Field type="text" name="rack" className="form-control" />

                  <ErrorMessage
                    name="rack"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Shelf</label>

                  <Field type="text" name="shelf" className="form-control" />

                  <ErrorMessage
                    name="shelf"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Capacity</label>

                  <Field
                    type="number"
                    name="capacity"
                    className="form-control"
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
                  Update Bin
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

export default EditBin;
