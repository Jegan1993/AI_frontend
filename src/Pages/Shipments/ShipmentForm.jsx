import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrder } from "../../CreateSlice/OrderSlice";

function ShipmentForm({ formData, setFormData, onSubmit, buttonText }) {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.order || []);
  console.log("orders", orders);
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit Clicked");
    console.log(formData);

    const result = await dispatch(createShipment(formData));

    console.log(result);

    if (createShipment.fulfilled.match(result)) {
      navigate("/view-shipment");
    }
  };

  const handleOrderChange = (e) => {
    const orderId = e.target.value;

    const order = orders.find((item) => item._id === orderId);

    if (!order) return;

    setFormData({
      ...formData,
      orderId,
      customerId: order.customerId?._id,
      shippingAddress: order.deliveryAddress || "",
    });
  };

  return (
    <div className="container mt-4">
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
                  className="form-select"
                  value={formData.orderId}
                  onChange={handleOrderChange}
                >
                  <option value="">Select Order</option>

                  {orders
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
                  name="trackingNo"
                  value={formData.trackingNo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Carrier</label>

                <input
                  className="form-control"
                  name="carrier"
                  value={formData.carrier}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Dispatch Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="dispatchDate"
                  value={formData.dispatchDate}
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

              <div className="col-md-12 mb-3">
                <label>Shipping Address</label>

                <textarea
                  rows="3"
                  className="form-control"
                  name="shippingAddress"
                  value={formData.shippingAddress}
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
                  <option>Pending</option>
                  <option>Picked Up</option>
                  <option>In Transit</option>
                  <option>Out For Delivery</option>
                  <option>Delivered</option>
                  <option>Returned</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <div className="col-md-12 mb-3">
                <label>Notes</label>

                <textarea
                  rows="4"
                  className="form-control"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-end">
              {/* <button className="btn btn-success px-4">{buttonText}</button> */}
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
