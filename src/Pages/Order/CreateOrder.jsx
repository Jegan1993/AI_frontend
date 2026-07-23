import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OrderForm from "./OrderForm";
import { createOrder } from "../../CreateSlice/OrderSlice";

function CreateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    orderNumber: Date.now().toString(),
    orderDate: new Date().toISOString().split("T")[0],
    quotationId: "",
    customerId: "",
    deliveryAddress: "",
    paymentMethod: "Cash",
    paymentStatus: "Pending",
    totalAmount: 0,
    notes: "",
  };

  const handleSubmit = async (values) => {
    const result = await dispatch(createOrder(values));

    if (createOrder.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      navigate("/view-order");
    } else if (createOrder.rejected.match(result)) {
      toast.error(result.payload?.message || result.error?.message);
    }
  };

  return (
    <OrderForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      buttonText="Create Order"
    />
  );
}

export default CreateOrder;
