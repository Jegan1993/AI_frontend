import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { getStockHistory } from "../CreateSlice/StockSlice.jsx";

function ViewStock() {
  const dispatch = useDispatch();

  // const { history, loading } = useSelector((state) => state.stock);

  // useEffect(() => {
  //   dispatch(getStockHistory());
  // }, [dispatch]);

  const { stockHistory, loading } = useSelector((state) => state.stock);
  console.log("stockHistory", stockHistory);
  useEffect(() => {
    dispatch(getStockHistory());
  }, [dispatch]);

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Warehouse",
      selector: (row) => row.inventoryId?.warehouseId?.warehouseName || "--",
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row.inventoryId?.productName || "--",
      sortable: true,
    },
    {
      name: "SKU",
      selector: (row) => row.inventoryId?.sku || "--",
    },
    {
      name: "Transaction",
      selector: (row) => row.transactionType,
      cell: (row) => (
        <span
          className={`badge ${
            row.transactionType === "Stock In" ? "bg-success" : "bg-danger"
          }`}
        >
          {row.transactionType}
        </span>
      ),
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks || "--",
      grow: 2,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleString("en-GB"),
      sortable: true,
    },
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between">
          <h4 className="mb-0">Stock History</h4>
        </div>

        <div className="card-body">
          <DataTable
            columns={columns}
            data={stockHistory}
            progressPending={loading}
            pagination
            highlightOnHover
            responsive
            striped
            persistTableHead
            noDataComponent="No Stock History Found"
          />
        </div>
      </div>
    </div>
  );
}

export default ViewStock;
