import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Card, Row, Col, Button } from "react-bootstrap";

const DriverSchema = Yup.object({
  name: Yup.string().required("Driver Name is required"),

  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone number must contain 10 digits"),

  email: Yup.string().email("Invalid Email").required("Email is required"),

  licenseNumber: Yup.string().required("License Number is required"),

  licenseExpiry: Yup.date().required("License Expiry is required"),

  address: Yup.string().required("Address is required"),

  experience: Yup.number()
    .typeError("Experience must be number")
    .min(0)
    .required("Experience is required"),

  status: Yup.string().required("Status is required"),
});

function DriverForm({
  initialValues,
  onSubmit,
  buttonText,
  enableReinitialize = false,
}) {
  return (
    <div className="container-fluid py-4">
      <Card className="shadow border-0 rounded-4">
        <Card.Header className="bg-primary text-white py-3">
          <h4 className="mb-0">{buttonText}</h4>
        </Card.Header>

        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={DriverSchema}
            onSubmit={onSubmit}
            enableReinitialize={enableReinitialize}
          >
            {() => (
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <label>Driver Name</label>

                    <Field name="name" className="form-control" />

                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Phone</label>

                    <Field name="phone" className="form-control" />

                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Email</label>

                    <Field name="email" className="form-control" />

                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>License Number</label>

                    <Field name="licenseNumber" className="form-control" />

                    <ErrorMessage
                      name="licenseNumber"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>License Expiry</label>

                    <Field
                      type="date"
                      name="licenseExpiry"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="licenseExpiry"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Experience (Years)</label>

                    <Field
                      type="number"
                      name="experience"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="experience"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={12} className="mb-3">
                    <label>Address</label>

                    <Field
                      as="textarea"
                      rows="3"
                      name="address"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Status</label>

                    <Field as="select" name="status" className="form-select">
                      <option>Available</option>
                      <option>On Trip</option>
                      <option>Leave</option>
                      <option>Inactive</option>
                    </Field>

                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>

                <div className="text-end mt-4">
                  <Button type="submit" size="lg" variant="primary">
                    {buttonText}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DriverForm;
