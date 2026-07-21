import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getInventory, updateInventory } from "../CreateSlice/InventorySlice";
import { getWarehouses } from "../CreateSlice/WareHouseSlice.jsx";

function EditInventory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { inventory, loading } = useSelector((state) => state.inventory);

  const { warehouse } = useSelector((state) => state.warehouse);
  console.log("ID:", id);
  console.log("Loading:", loading);
  console.log("Inventory:", inventory);
  useEffect(() => {
    dispatch(getInventory(id));
    dispatch(getWarehouses());
  }, [dispatch, id]);

  const validationSchema = Yup.object({
    warehouseId: Yup.string().required("Warehouse is required"),
    productName: Yup.string().required("Product Name is required"),
    sku: Yup.string().required("SKU is required"),
    category: Yup.string().required("Category is required"),
    unitPrice: Yup.number()
      .required("Unit Price is required")
      .positive("Invalid Price"),
    reorderLevel: Yup.number().required("Reorder Level is required").min(0),
    supplier: Yup.string().required("Supplier is required"),
  });

  if (loading || !inventory) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4>Edit Inventory</h4>
        </div>

        <div className="card-body">
          <Formik
            enableReinitialize
            initialValues={{
              warehouseId: inventory.warehouseId?._id || "",
              productName: inventory.productName || "",
              sku: inventory.sku || "",
              category: inventory.category || "",
              unitPrice: inventory.unitPrice || "",
              reorderLevel: inventory.reorderLevel || "",
              supplier: inventory.supplier || "",
              barcode: inventory.barcode || "",
              qrCode: inventory.qrCode || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const result = await dispatch(
                updateInventory({
                  id,
                  data: values,
                }),
              );

              if (!result.error) {
                navigate("/view-inventory");
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
                    disabled
                  >
                    <option value="">Select Warehouse</option>

                    {warehouse?.map((item) => (
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
                  <label>Product Name</label>
                  <Field
                    type="text"
                    name="productName"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="productName"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>SKU</label>
                  <Field
                    type="text"
                    name="sku"
                    className="form-control"
                    disabled
                  />
                  <ErrorMessage
                    name="sku"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Category</label>
                  <Field type="text" name="category" className="form-control" />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Unit Price</label>
                  <Field
                    type="number"
                    name="unitPrice"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="unitPrice"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Reorder Level</label>
                  <Field
                    type="number"
                    name="reorderLevel"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="reorderLevel"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Supplier</label>
                  <Field type="text" name="supplier" className="form-control" />
                  <ErrorMessage
                    name="supplier"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Barcode</label>
                  <Field type="text" name="barcode" className="form-control" />
                  <ErrorMessage
                    name="barcode"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label>QR Code</label>
                  <Field type="text" name="qrCode" className="form-control" />
                  <ErrorMessage
                    name="qrCode"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Update Inventory
                </button>

                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => navigate("/view-inventory")}
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

export default EditInventory;
