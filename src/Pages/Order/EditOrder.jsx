import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import OrderForm from "./OrderForm";
import { getOrderById, updateOrder } from "../../CreateSlice/OrderSlice";

function EditOrder() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedOrder } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  const initialValues = {
    orderNumber: selectedOrder?.orderNumber || "",
    orderDate: selectedOrder?.orderDate
      ? selectedOrder.orderDate.split("T")[0]
      : "",
    quotationId: selectedOrder?.quotationId?._id || "",
    customerId: selectedOrder?.customerId?._id || "",
    deliveryAddress: selectedOrder?.deliveryAddress || "",
    paymentMethod: selectedOrder?.paymentMethod || "Cash",
    paymentStatus: selectedOrder?.paymentStatus || "Pending",
    totalAmount: selectedOrder?.totalAmount || 0,
    notes: selectedOrder?.notes || "",
  };

  const handleSubmit = async (values) => {
    const result = await dispatch(
      updateOrder({
        id,
        data: values,
      }),
    );

    if (updateOrder.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      navigate("/view-order");
    } else if (updateOrder.rejected.match(result)) {
      toast.error(
        result.payload?.message ||
          result.error?.message ||
          "Failed to update order.",
      );
    }
  };

  return (
    <OrderForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      buttonText="Update Order"
    />
  );
}

export default EditOrder;
