import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getShipmentById } from "../../CreateSlice/ShipmentSlice";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function RouteMonitoring() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { selectedShipment, loading } = useSelector((state) => state.shipment);

  useEffect(() => {
    dispatch(getShipmentById(id));

    const interval = setInterval(() => {
      dispatch(getShipmentById(id));
    }, 100000);

    return () => clearInterval(interval);
  }, [dispatch, id]);

  if (loading || !selectedShipment) {
    return (
      <div className="container mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  const lat = selectedShipment.currentLatitude || 9.919;
  const lng = selectedShipment.currentLongitude || 78.1195;
  const handleUpdateLocation = () => {
    dispatch(
      updateRouteLocation({
        id: shipment._id,
        data: {
          currentLocation: location,
          currentLatitude: latitude,
          currentLongitude: longitude,
          speed,
        },
      }),
    );
  };
  return (
    <div className="container-fluid mt-4">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <h4 className="mb-0">Route Monitoring</h4>

          <button
            className="btn btn-light"
            onClick={() => navigate("/view-shipment")}
          >
            Back
          </button>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="text-primary mb-3">Shipment Details</h5>

                  <p>
                    <strong>Shipment :</strong> {selectedShipment.shipmentNo}
                  </p>

                  <p>
                    <strong>Status :</strong> {selectedShipment.status}
                  </p>

                  <p>
                    <strong>Current Location :</strong>{" "}
                    {selectedShipment.currentLocation || "--"}
                  </p>

                  <p>
                    <strong>Latitude :</strong>{" "}
                    {selectedShipment.currentLatitude || "--"}
                  </p>

                  <p>
                    <strong>Longitude :</strong>{" "}
                    {selectedShipment.currentLongitude || "--"}
                  </p>

                  <p>
                    <strong>Speed :</strong> {selectedShipment.speed || 0} km/h
                  </p>

                  <p>
                    <strong>Last Updated :</strong>{" "}
                    {selectedShipment.lastLocationUpdated
                      ? new Date(
                          selectedShipment.lastLocationUpdated,
                        ).toLocaleString("en-GB")
                      : "--"}
                  </p>
                </div>
              </div>

              <div className="card shadow-sm mt-3">
                <div className="card-body">
                  <h5 className="text-success">AI Route Analysis</h5>

                  <p>
                    <strong>ETA :</strong>{" "}
                    {selectedShipment.aiResult?.eta || "--"}
                  </p>

                  <p>
                    <strong>Risk :</strong>{" "}
                    {selectedShipment.aiResult?.delayRisk || "--"}
                  </p>

                  <p>
                    <strong>Recommendation :</strong>
                  </p>

                  <div className="alert alert-info">
                    {selectedShipment.aiResult?.recommendation ||
                      "No AI Analysis"}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card shadow-sm">
                <div className="card-body p-2">
                  <MapContainer
                    center={[lat, lng]}
                    zoom={12}
                    style={{
                      height: "600px",
                      width: "100%",
                    }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Marker position={[lat, lng]} icon={markerIcon}>
                      <Popup>
                        <h6>{selectedShipment.shipmentNo}</h6>

                        <p>{selectedShipment.currentLocation}</p>

                        <p>Status : {selectedShipment.status}</p>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteMonitoring;
