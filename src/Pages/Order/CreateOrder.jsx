import { useDispatch } from "react-redux";
import OrderForm from "./OrderForm.jsx";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../CreateSlice/OrderSlice.jsx";
import { useState } from "react";
function CreateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderNumber: "",
    customerId: "",
    quotationId: "",
    orderDate: "",
    deliveryAddress: "",
    paymentMethod: "Cash",
    paymentStatus: "Pending",
    totalAmount: 0,
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(createOrder(formData));

    if (createOrder.fulfilled.match(result)) {
      navigate("/view-order");
    }
  };

  return (
    <OrderForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Create Order"
    />
  );
}

export default CreateOrder;
