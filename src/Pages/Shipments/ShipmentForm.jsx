import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../CreateSlice/OrderSlice";
import { useNavigate } from "react-router-dom";

function ShipmentForm({ formData, setFormData, onSubmit, buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const orders = useSelector((state) => state.order.orders || []);
  // console.log("orders", orders);

  const orders = useSelector((state) => state.order.order ?? []);

  console.log("Orders:", orders);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderChange = (e) => {
    const orderId = e.target.value;

    const order = orders.find((item) => item._id === orderId);

    if (!order) return;

    setFormData({
      ...formData,
      orderId,
      customerId: order.customerId?._id || "",
      routeTo: order.deliveryAddress || "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/view-shipment")}
        >
          Back
        </button>
      </div>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>{buttonText}</h4>
        </div>

        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Shipment Number</label>

                <input
                  className="form-control"
                  name="shipmentNo"
                  value={formData.shipmentNo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Select Order</label>

                <select
                  name="orderId"
                  className="form-select"
                  value={formData.orderId}
                  onChange={handleOrderChange}
                >
                  <option value="">Select Order</option>

                  {orders.length > 0 &&
                    orders
                      .filter((item) => item.status !== "Cancelled")
                      .map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.orderNumber}
                        </option>
                      ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Tracking Number</label>

                <input
                  className="form-control"
                  name="trackingNumber"
                  value={formData.trackingNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Courier Name</label>

                <input
                  className="form-control"
                  name="courierName"
                  value={formData.courierName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Shipment Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="shipmentDate"
                  value={formData.shipmentDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Expected Delivery</label>
              
                <input
                  type="date"
                  className="form-control"
                  name="expectedDelivery"
                  value={formData.expectedDelivery}
                  onChange={handleChange}
                />
              </div>   

              <div className="col-md-6 mb-3">
                <label>Route From</label>

                <input
                  className="form-control"
                  name="routeFrom"
                  value={formData.routeFrom}
                  onChange={handleChange}
                />
              </div>


              <div className="col-md-6 mb-3">
                <label>Route To</label>

                <input
                  className="form-control"
                  name="routeTo"
                  value={formData.routeTo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Created">Created</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Returned">Returned</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="col-md-12 mb-3">
                <label>Remarks</label>

                <textarea
                  rows="4"
                  className="form-control"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-success px-4">
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShipmentForm;
