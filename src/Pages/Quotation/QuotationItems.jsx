import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function QuotationItems({ formData, setFormData }) {
  // Update item values
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;

    const items = [...formData.items];

    items[index][name] = name === "service" ? value : Number(value);

    // Auto calculate total
    items[index].total =
      Number(items[index].quantity || 0) * Number(items[index].unitPrice || 0);

    setFormData((prev) => ({
      ...prev,
      items,
    }));
  };

  // Add new item
  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          service: "",
          quantity: 1,
          unitPrice: 0,
          total: 0,
        },
      ],
    }));
  };

  // Remove item
  const removeItem = (index) => {
    const items = [...formData.items];

    items.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      items,
    }));
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Quotation Items</h5>

        <button type="button" className="btn btn-success" onClick={addItem}>
          <FaPlus className="me-2" />
          Add Item
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th width="35%">Service</th>

              <th width="15%">Qty</th>

              <th width="20%">Unit Price</th>

              <th width="20%">Total</th>

              <th width="10%">Action</th>
            </tr>
          </thead>

          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Service Name"
                    name="service"
                    value={item.service}
                    onChange={(e) => handleItemChange(index, e)}
                    required
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    name="unitPrice"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.total}
                    readOnly
                  />
                </td>

                <td className="text-center">
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeItem(index)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default QuotationItems;
