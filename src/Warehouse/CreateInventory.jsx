import React, { useEffect } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createInventory } from "../CreateSlice/InventorySlice.jsx";

import { getWarehouses } from "../CreateSlice/WareHouseSlice.jsx";

function CreateInventory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { warehouses } = useSelector((state) => state.warehouse);

  // console.log("warehouse", warehouses);

  useEffect(() => {
    dispatch(getWarehouses());
  }, [dispatch]);

  const initialValues = {
    warehouseId: "",
    productName: "",
    sku: "",
    category: "",
    unitPrice: "",
    reorderLevel: "",
    supplier: "",
    barcode: "",
    qrCode: "",
  };

  const validationSchema = Yup.object({
    warehouseId: Yup.string().required("Warehouse is required"),
    productName: Yup.string().required("Product Name is required"),
    sku: Yup.string().required("SKU is required"),
    category: Yup.string().required("Category is required"),
    unitPrice: Yup.number()
      .typeError("Unit Price must be number")
      .required("Unit Price is required"),
    reorderLevel: Yup.number()
      .typeError("Reorder Level must be number")
      .required("Reorder Level is required"),
    supplier: Yup.string().required("Supplier is required"),
    // barcode: Yup.string().required("Barcode is required"),
    // qrCode: Yup.string().required("QR Code is required"),
  });

  const handleSubmit = async (values) => {
    const result = await dispatch(createInventory(values));

    if (createInventory.fulfilled.match(result)) {
      navigate("/view-inventory");
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h4>Create Inventory</h4>
      </Card.Header>

      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleBlur,
            handleSubmit,
            handleChange,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Warehouse</Form.Label>

                  <Form.Select
                    name="warehouseId"
                    value={values.warehouseId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select Warehouse</option>

                    {warehouses?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.warehouseName}
                      </option>
                    ))}
                  </Form.Select>

                  <small className="text-danger">
                    {touched.warehouseId && errors.warehouseId}
                  </small>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>Product Name</Form.Label>

                  <Form.Control
                    type="text"
                    name="productName"
                    value={values.productName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <small className="text-danger">
                    {touched.productName && errors.productName}
                  </small>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>SKU</Form.Label>

                  <Form.Control
                    type="text"
                    name="sku"
                    value={values.sku}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <small className="text-danger">
                    {touched.sku && errors.sku}
                  </small>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>Category</Form.Label>

                  <Form.Control
                    type="text"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <small className="text-danger">
                    {touched.category && errors.category}
                  </small>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>Unit Price</Form.Label>

                  <Form.Control
                    type="number"
                    name="unitPrice"
                    value={values.unitPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <small className="text-danger">
                    {touched.unitPrice && errors.unitPrice}
                  </small>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>Reorder Level</Form.Label>

                  <Form.Control
                    type="number"
                    name="reorderLevel"
                    value={values.reorderLevel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <small className="text-danger">
                    {touched.reorderLevel && errors.reorderLevel}
                  </small>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Label>Supplier</Form.Label>

                  <Form.Control
                    type="text"
                    name="supplier"
                    value={values.supplier}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <small className="text-danger">
                    {touched.supplier && errors.supplier}
                  </small>
                </Col>
                {/* 
                <Col md={6} className="mb-3">
                  <Form.Label>Barcode</Form.Label>

                  <Form.Control
                    type="text"
                    name="barcode"
                    value={values.barcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <small className="text-danger">
                    {touched.barcode && errors.barcode}
                  </small>
                </Col>

                <Col md={12} className="mb-3">
                  <Form.Label>QR Code</Form.Label>

                  <Form.Control
                    type="text"
                    name="qrCode"
                    value={values.qrCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <small className="text-danger">
                    {touched.qrCode && errors.qrCode}
                  </small>
                </Col> */}
              </Row>

              <Button variant="primary" type="submit">
                Create Inventory
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}

export default CreateInventory;
