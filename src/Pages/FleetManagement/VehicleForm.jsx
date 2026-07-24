import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Row, Col, Button } from "react-bootstrap";

const VehicleSchema = Yup.object({
  vehicleNumber: Yup.string().required("Vehicle Number is required").max(20),

  vehicleType: Yup.string().required("Vehicle Type is required"),

  capacity: Yup.number()
    .typeError("Capacity must be a number")
    .positive("Capacity must be greater than 0")
    .required("Capacity is required"),

  fuelType: Yup.string().required("Fuel Type is required"),

  manufacturer: Yup.string().required("Manufacturer is required"),

  model: Yup.string().required("Model is required"),

  registrationDate: Yup.date().required("Registration Date is required"),

  insuranceExpiry: Yup.date().required("Insurance Expiry is required"),

  pollutionExpiry: Yup.date().required("Pollution Expiry is required"),

  fitnessExpiry: Yup.date().required("Fitness Expiry is required"),

  currentOdometer: Yup.number()
    .typeError("Odometer must be a number")
    .min(0)
    .required("Current Odometer is required"),

  status: Yup.string().required("Status is required"),
});

function VehicleForm({
  initialValues,
  onSubmit,
  buttonText,
  enableReinitialize = false,
}) {


  return (
    <div className="container-fluid py-4">
      <Card className="shadow border-0">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">{buttonText}</h4>
        </Card.Header>

        <Card.Body>
          <Formik
            initialValues={initialValues}
            enableReinitialize={enableReinitialize}
            validationSchema={VehicleSchema}
            onSubmit={onSubmit} 
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <label>Vehicle Number</label>
                    <Field name="vehicleNumber" className="form-control" />
                    <ErrorMessage
                      name="vehicleNumber"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Vehicle Type</label>
                    <Field
                      as="select"
                      name="vehicleType"
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option>Truck</option>
                      <option>Mini Truck</option>
                      <option>Van</option>
                      <option>Bike</option>
                      <option>Container</option>
                    </Field>

                    <ErrorMessage
                      name="vehicleType"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Capacity (Kg)</label>
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
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Fuel Type</label>

                    <Field as="select" name="fuelType" className="form-select">
                      <option value="">Select</option>
                      <option>Diesel</option>
                      <option>Petrol</option>
                      <option>Electric</option>
                      <option>CNG</option>
                    </Field>

                    <ErrorMessage
                      name="fuelType"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Manufacturer</label>

                    <Field name="manufacturer" className="form-control" />

                    <ErrorMessage
                      name="manufacturer"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Model</label>

                    <Field name="model" className="form-control" />

                    <ErrorMessage
                      name="model"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Registration Date</label>

                    <Field
                      type="date"
                      name="registrationDate"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="registrationDate"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Insurance Expiry</label>

                    <Field
                      type="date"
                      name="insuranceExpiry"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="insuranceExpiry"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Pollution Expiry</label>

                    <Field
                      type="date"
                      name="pollutionExpiry"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="pollutionExpiry"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Fitness Expiry</label>

                    <Field
                      type="date"
                      name="fitnessExpiry"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="fitnessExpiry"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Current Odometer</label>

                    <Field
                      type="number"
                      name="currentOdometer"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="currentOdometer"
                      component="div"
                      className="text-danger"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Status</label>

                    <Field as="select" name="status" className="form-select">
                      <option>Available</option>
                      <option>Assigned</option>
                      <option>Maintenance</option>
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
                  <Button type="submit" variant="primary">
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

export default VehicleForm;
