import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  stockIn,
  stockOut,
} from "../../CreateSlice/StockSlice";

import { getInventory } from "../../CreateSlice/InventorySlice";

function CreateStock() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { inventories } = useSelector(
    (state) => state.inventory
  );

  useEffect(() => {
    dispatch(getInventory());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      inventoryId: "",
      transactionType: "Stock In",
      quantity: "",
      remarks: "",
    },

    validationSchema: Yup.object({
      inventoryId: Yup.string().required("Inventory is required"),

      transactionType: Yup.string().required(),

      quantity: Yup.number()
        .typeError("Quantity must be number")
        .positive("Quantity must be greater than 0")
        .required("Quantity is required"),

      remarks: Yup.string().required("Remarks is required"),
    }),

    onSubmit: async (values) => {
      const payload = {
        inventoryId: values.inventoryId,
        quantity: Number(values.quantity),
        remarks: values.remarks,
      };

      if (values.transactionType === "Stock In") {
        await dispatch(stockIn(payload));
      } else {
        await dispatch(stockOut(payload));
      }

      navigate("/view-stock");
    },
  });

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4>Create Stock</h4>
        </div>

        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>

            {/* Inventory */}

            <div className="mb-3">
              <label>Inventory</label>

              <select
                className="form-control"
                name="inventoryId"
                value={formik.values.inventoryId}
                onChange={formik.handleChange}
              >
                <option value="">
                  Select Inventory
                </option>

                {inventories?.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.productName} ({item.sku})
                  </option>
                ))}
              </select>

              <small className="text-danger">
                {formik.touched.inventoryId &&
                  formik.errors.inventoryId}
              </small>
            </div>

            {/* Transaction */}

            <div className="mb-3">
              <label>Transaction Type</label>

              <select
                className="form-control"
                name="transactionType"
                value={formik.values.transactionType}
                onChange={formik.handleChange}
              >
                <option value="Stock In">
                  Stock In
                </option>

                <option value="Stock Out">
                  Stock Out
                </option>
              </select>
            </div>

            {/* Quantity */}

            <div className="mb-3">
              <label>Quantity</label>

              <input
                type="number"
                className="form-control"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
              />

              <small className="text-danger">
                {formik.touched.quantity &&
                  formik.errors.quantity}
              </small>
            </div>

            {/* Remarks */}

            <div className="mb-3">
              <label>Remarks</label>

              <textarea
                rows="4"
                className="form-control"
                name="remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
              />

              <small className="text-danger">
                {formik.touched.remarks &&
                  formik.errors.remarks}
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateStock;