import * as Yup from "yup";

export const orderValidationSchema = Yup.object({
  orderNumber: Yup.string()
    .trim()
    .required("Order Number is required"),

  orderDate: Yup.date()
    .required("Order Date is required"),

  quotationId: Yup.string()
    .required("Quotation is required"),

  customerId: Yup.string()
    .required("Customer is required"),

  deliveryAddress: Yup.string()
    .trim()
    .required("Delivery Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters"),

  paymentMethod: Yup.string()
    .oneOf(["Cash", "Card", "UPI", "Bank Transfer"])
    .required("Payment Method is required"),

  paymentStatus: Yup.string()
    .oneOf(["Pending", "Paid", "Partially Paid"])
    .required("Payment Status is required"),

  totalAmount: Yup.number()
    .typeError("Total Amount must be a number")
    .min(1, "Total Amount must be greater than 0")
    .required("Total Amount is required"),

  notes: Yup.string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters"),
});