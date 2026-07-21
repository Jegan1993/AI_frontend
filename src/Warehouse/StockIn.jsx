import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { stockIn } from "../CreateSlice/StockSlice";

function StockIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Must be greater than 0"),
    remarks: Yup.string(),
  });

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4>Stock In</h4>
        </div>

        <div className="card-body">
          <Formik
            initialValues={{
              quantity: "",
              remarks: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const result = await dispatch(
                stockIn({
                  inventoryId: id,
                  quantity: Number(values.quantity),
                  remarks: values.remarks,
                }),
              );

              if (!result.error) {
                alert("Stock Added Successfully");
                navigate("/view-stock");
              }
            }}
          >
            <Form>
              <div className="mb-3">
                <label>Quantity</label>
                <Field type="number" name="quantity" className="form-control" />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label>Remarks</label>
                <Field as="textarea" name="remarks" className="form-control" />
              </div>

              <button className="btn btn-success" type="submit">
                Stock In
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default StockIn;
