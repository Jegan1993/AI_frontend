import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getWarehouseById } from "../CreateSlice/WareHouseSlice.jsx";

function WarehouseDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { selectedWarehouse, loading } = useSelector(
    (state) => state.warehouse,
  );

  useEffect(() => {
    dispatch(getWarehouseById(id));
  }, [dispatch, id]);

  if (loading || !selectedWarehouse) {
    return (
      <div className="container mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <h4>Warehouse Details</h4>

          <button
            className="btn btn-light"
            onClick={() => navigate("/view-warehouse")}
          >
            Back
          </button>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Warehouse Name</th>
                    <td>{selectedWarehouse.warehouseName}</td>
                  </tr>

                  <tr>
                    <th>Warehouse Code</th>
                    <td>{selectedWarehouse.warehouseCode}</td>
                  </tr>

                  <tr>
                    <th>Manager</th>
                    <td>{selectedWarehouse.managerName}</td>
                  </tr>

                  <tr>
                    <th>Email</th>
                    <td>{selectedWarehouse.email}</td>
                  </tr>

                  <tr>
                    <th>Phone</th>
                    <td>{selectedWarehouse.phone}</td>
                  </tr>

                  <tr>
                    <th>Address</th>
                    <td>{selectedWarehouse.address}</td>
                  </tr>

                  <tr>
                    <th>City</th>
                    <td>{selectedWarehouse.city}</td>
                  </tr>

                  <tr>
                    <th>State</th>
                    <td>{selectedWarehouse.state}</td>
                  </tr>

                  <tr>
                    <th>Country</th>
                    <td>{selectedWarehouse.country}</td>
                  </tr>

                  <tr>
                    <th>Capacity</th>
                    <td>{selectedWarehouse.capacity}</td>
                  </tr>

                  <tr>
                    <th>Available Space</th>
                    <td>{selectedWarehouse.availableSpace}</td>
                  </tr>

                  <tr>
                    <th>Status</th>
                    <td>
                      <span
                        className={`badge ${
                          selectedWarehouse.status === "Active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {selectedWarehouse.status}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <th>Created At</th>
                    <td>
                      {new Date(selectedWarehouse.createdAt).toLocaleString(
                        "en-GB",
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-md-6">
              <div className="card border-primary">
                <div className="card-header bg-primary text-white">
                  Warehouse Summary
                </div>

                <div className="card-body">
                  <h5>{selectedWarehouse.warehouseName}</h5>

                  <hr />

                  <p>
                    <strong>Capacity :</strong> {selectedWarehouse.capacity}
                  </p>

                  <p>
                    <strong>Available :</strong>{" "}
                    {selectedWarehouse.availableSpace}
                  </p>

                  <p>
                    <strong>Occupied :</strong>{" "}
                    {selectedWarehouse.capacity -
                      selectedWarehouse.availableSpace}
                  </p>

                  <p>
                    <strong>Status :</strong> {selectedWarehouse.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseDetails;
