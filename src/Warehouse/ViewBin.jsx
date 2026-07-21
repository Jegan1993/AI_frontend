import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBin, deleteBin } from "../CreateSlice/BinSlice";

function ViewBin() {
  const dispatch = useDispatch();

  const { bins, loading } = useSelector((state) => state.bin);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getBin());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Bin?",
    );

    if (confirmDelete) {
      await dispatch(deleteBin(id));
      dispatch(getBin());
    }
  };

  const filteredBins =
    bins?.filter((item) => {
      return (
        item.binCode?.toLowerCase().includes(search.toLowerCase()) ||
        item.rack?.toLowerCase().includes(search.toLowerCase()) ||
        item.shelf?.toLowerCase().includes(search.toLowerCase()) ||
        item.warehouseId?.warehouseName
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }) || [];

  const columns = [
    {
      name: "S.No",
      width: "70px",
      cell: (row, index) => index + 1,
    },

    {
      name: "Warehouse",
      selector: (row) => row.warehouseId?.warehouseName || "--",
      sortable: true,
    },

    {
      name: "Bin Code",
      selector: (row) => row.binCode,
      sortable: true,
    },

    {
      name: "Rack",
      selector: (row) => row.rack,
      sortable: true,
    },

    {
      name: "Shelf",
      selector: (row) => row.shelf,
      sortable: true,
    },

    {
      name: "Capacity",
      selector: (row) => row.capacity,
      sortable: true,
      center: true,
    },

    {
      name: "Created",
      selector: (row) => new Date(row.createdAt).toLocaleDateString("en-GB"),
    },

    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <Link to={`/edit-bin/${row._id}`} className="btn btn-warning btn-sm">
            <FaEdit />
          </Link>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Bin Management</h4>

          <Link to="/create-bin" className="btn btn-primary">
            + Create Bin
          </Link>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4 ms-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Search Bin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredBins}
            progressPending={loading}
            pagination
            striped
            highlightOnHover
            responsive
            persistTableHead
            noDataComponent="No Bin Found"
          />
        </div>
      </div>
    </div>
  );
}

export default ViewBin;
