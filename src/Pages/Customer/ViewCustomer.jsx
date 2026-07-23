import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCustomer, deleteCustomer } from "../../CreateSlice/CustomerSlice";
import { toast } from "react-toastify";
function ViewCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { customers, loading } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  const handleEdit = (row) => {
    navigate(`/edit-customer/${row._id}`);
  };

  const handleDelete = async (id) => {
    const result = await dispatch(deleteCustomer(id));

    if (deleteCustomer.fulfilled.match(result)) {
      toast.success(result.payload?.message);
      navigate("/get-customer");
    } else if (deleteCustomer.rejected.match(result)) {
      toast.error(result.payload?.message || result.error?.message);
    }
  };

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Company",
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: "Contact Person",
      selector: (row) => row.contactPerson,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Industry",
      selector: (row) => row.industry,
    },
    {
      name: "Country",
      selector: (row) => row.country,
    },
    {
      name: "Employees",
      selector: (row) => row.employees,
    },
    {
      name: "Budget",
      selector: (row) => `$${row.estimatedBudget}`,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`badge ${
            row.customerStatus === "Active"
              ? "bg-success"
              : row.customerStatus === "Inactive"
                ? "bg-warning text-dark"
                : "bg-danger"
          }`}
        >
          {row.customerStatus}
        </span>
      ),
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => handleEdit(row)}
          >
            <FaEdit />
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h4 className="mb-0 text-center">Customer Management</h4>
        </div>

        <div className="card-body">
          <DataTable
            columns={columns}
            data={customers}
            progressPending={loading}
            pagination
            highlightOnHover
            responsive
            striped
            persistTableHead
            noDataComponent="No Customers Found"
          />
        </div>
      </div>
    </div>
  );
}

export default ViewCustomer;
