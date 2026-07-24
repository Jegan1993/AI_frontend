import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const FleetAssignmentSchema = Yup.object({
  shipmentId: Yup.string().required("Shipment is required"),

  vehicleId: Yup.string().required("Vehicle is required"),

  driverId: Yup.string().required("Driver is required"),

  dispatchDate: Yup.date().required("Dispatch Date is required"),

  remarks: Yup.string().max(500, "Maximum 500 characters"),
});

function FleetAssignmentForm({
  initialValues,
  onSubmit,
  buttonText,
  enableReinitialize = false,
}) {
  const { shipments } = useSelector((state) => state.shipment);
  const { vehicles } = useSelector((state) => state.vehicle);
  const { drivers } = useSelector((state) => state.driver);

  return (
    <div className="container-fluid py-4">
      <Card className="shadow border-0 rounded-4">
        <Card.Header className="bg-primary text-white py-3">
          <h4 className="mb-0 fw-bold">{buttonText}</h4>
        </Card.Header>

        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={FleetAssignmentSchema}
            enableReinitialize={enableReinitialize}
            onSubmit={(values) => onSubmit(values)}
          >
            {() => (
              <Form>
                <Row>
                  {/* Shipment */}

                  <Col md={6} className="mb-3">
                    <label className="form-label fw-semibold">Shipment</label>

                    <Field
                      as="select"
                      name="shipmentId"
                      className="form-select"
                    >
                      <option value="">Select Shipment</option>

                      {shipments?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.shipmentNo}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="shipmentId"
                      component="div"
                      className="text-danger small"
                    />
                  </Col>

                  {/* Vehicle */}

                  <Col md={6} className="mb-3">
                    <label className="form-label fw-semibold">Vehicle</label>

                    <Field as="select" name="vehicleId" className="form-select">
                      <option value="">Select Vehicle</option>

                      {vehicles?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.vehicleNumber} ({item.vehicleType})
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="vehicleId"
                      component="div"
                      className="text-danger small"
                    />
                  </Col>

                  {/* Driver */}

                  <Col md={6} className="mb-3">
                    <label className="form-label fw-semibold">Driver</label>

                    <Field as="select" name="driverId" className="form-select">
                      <option value="">Select Driver</option>

                      {drivers?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="driverId"
                      component="div"
                      className="text-danger small"
                    />
                  </Col>

                  {/* Dispatch Date */}

                  <Col md={6} className="mb-3">
                    <label className="form-label fw-semibold">
                      Dispatch Date
                    </label>

                    <Field
                      type="date"
                      name="dispatchDate"
                      className="form-control"
                    />

                    <ErrorMessage
                      name="dispatchDate"
                      component="div"
                      className="text-danger small"
                    />
                  </Col>

                  {/* Remarks */}

                  <Col md={12} className="mb-3">
                    <label className="form-label fw-semibold">Remarks</label>

                    <Field
                      as="textarea"
                      rows={4}
                      name="remarks"
                      className="form-control"
                      placeholder="Enter remarks..."
                    />

                    <ErrorMessage
                      name="remarks"
                      component="div"
                      className="text-danger small"
                    />
                  </Col>
                </Row>

                <div className="text-end mt-3">
                  <Button variant="primary" type="submit" className="px-4">
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

export default FleetAssignmentForm;
