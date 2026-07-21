import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInventory, deleteInventory } from "../CreateSlice/InventorySlice";
import { FaEdit, FaTrash, FaArrowDown, FaArrowUp } from "react-icons/fa";
function ViewInventory() {
  const dispatch = useDispatch();

  const { inventory, loading } = useSelector((state) => state.inventory);
  // console.log("inventory", inventory);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      getInventory({
        page: 1,
        limit: 10,
        search,
      }),
    );
  }, [dispatch, search]);

  const handleDelete = (id) => {
    if (window.confirm("Delete Inventory?")) {
      dispatch(deleteInventory(id)).then(() => {
        dispatch(
          getInventory({
            page: 1,
            limit: 10,
            search,
          }),
        );
      });
    }
  };

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Warehouse",
      selector: (row) => row.warehouseId?.warehouseName || "--",
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "SKU",
      selector: (row) => row.sku,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Stock",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `₹ ${row.unitPrice}`,
    },
    {
      name: "Supplier",
      selector: (row) => row.supplier,
    },
    {
      name: "Reorder",
      selector: (row) => row.reorderLevel,
    },
    {
      name: "Created",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex align-items-center gap-2 flex-nowrap">
          <Link
            to={`/inventory-edit/${row._id}`}
            className="btn btn-warning btn-sm"
            title="Edit Inventory"
          >
            <FaEdit />
          </Link>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row._id)}
            title="Delete Inventory"
          >
            <FaTrash />
          </button>

          <Link
            to={`/stock/in/${row._id}`}
            className="btn btn-success btn-sm text-nowrap"
            title="Stock In"
          >
            Stock In
          </Link>

          <Link
            to={`/stock/out/${row._id}`}
            className="btn btn-primary btn-sm text-nowrap"
            title="Stock Out"
          >
            Stock Out
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Inventory Management</h3>

        <Link to="/inventory-create" className="btn btn-primary">
          + Add Inventory
        </Link>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={inventory || []}
        progressPending={loading}
        pagination
        striped
        highlightOnHover
        responsive
        persistTableHead
      />
    </div>
  );
}

export default ViewInventory;
