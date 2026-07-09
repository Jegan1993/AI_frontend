import { useNavigate, useParams } from "react-router-dom";
import OrderForm from "./OrderForm";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, updateOrder } from "../../CreateSlice/OrderSlice.jsx";
import { useEffect, useState } from "react";
function EditOrder() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { selectedOrder } = useSelector((state) => state.order);

  const [formData, setFormData] = useState({});
  useEffect(() => {
    dispatch(getOrderById(id));
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      setFormData(selectedOrder);
    }
  }, [selectedOrder]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateOrder({
        id,
        data: formData,
      }),
    );

    if (updateOrder.fulfilled.match(result)) {
      navigate("/view-order");
    }
  };

  return (
    <OrderForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Update Order"
    />
  );
}

export default EditOrder;
