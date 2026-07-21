import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { warehouseAnalytics } from "../CreateSlice/WareHouseSlice.jsx";

function WareHouseAnalysis() {
  const dispatch = useDispatch();

  const { analytics, loading } = useSelector((state) => state.warehouse);

  useEffect(() => {
    dispatch(warehouseAnalytics());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0 text-center">Warehouse Analytics</h4>
        </div>

        <div className="card-body">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm border-primary">
                <div className="card-body text-center">
                  <h6>Total Warehouses</h6>
                  <h2 className="text-primary">{analytics?.warehouses || 0}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-success">
                <div className="card-body text-center">
                  <h6>Total Products</h6>
                  <h2 className="text-success">
                    {analytics?.totalProducts || 0}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-info">
                <div className="card-body text-center">
                  <h6>Total Stock</h6>
                  <h2 className="text-info">{analytics?.totalStock || 0}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm border-warning">
                <div className="card-body text-center">
                  <h6>Low Stock Products</h6>
                  <h2 className="text-warning">{analytics?.lowStock || 0}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm border-danger">
                <div className="card-body text-center">
                  <h6>Out Of Stock</h6>
                  <h2 className="text-danger">{analytics?.outOfStock || 0}</h2>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <table className="table table-bordered table-striped mt-3">
            <tbody>
              <tr>
                <th>Total Warehouses</th>
                <td>{analytics?.warehouses || 0}</td>
              </tr>

              <tr>
                <th>Total Products</th>
                <td>{analytics?.totalProducts || 0}</td>
              </tr>

              <tr>
                <th>Total Stock Quantity</th>
                <td>{analytics?.totalStock || 0}</td>
              </tr>

              <tr>
                <th>Low Stock Products</th>
                <td>{analytics?.lowStock || 0}</td>
              </tr>

              <tr>
                <th>Out Of Stock Products</th>
                <td>{analytics?.outOfStock || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WareHouseAnalysis;
