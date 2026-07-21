import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getShipmentById,
  updateRouteLocation,
} from "../../CreateSlice/ShipmentSlice";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function RouteMonitoring() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedShipment, loading } = useSelector((state) => state.shipment);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch shipment details on component mount
  useEffect(() => {
    if (id) {
      dispatch(getShipmentById(id));
    }
  }, [dispatch, id]);

  // Debug: Log selectedShipment data
  useEffect(() => {
    if (selectedShipment) {
      console.log("Selected Shipment Data:", selectedShipment);
      console.log("Current Latitude:", selectedShipment.currentLatitude);
      console.log("Current Longitude:", selectedShipment.currentLongitude);
      console.log("Current Location:", selectedShipment.currentLocation);
    }
  }, [selectedShipment]);

  // Set up location tracking
  useEffect(() => {
    if (!selectedShipment?._id) return;

    // Check if geolocation is available
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    // Get initial location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Initial Location:", { latitude, longitude });
        setUserLocation({ latitude, longitude });

        // Update shipment with initial location
        dispatch(
          updateRouteLocation({
            id: selectedShipment._id,
            data: {
              currentLocation: `${latitude}, ${longitude}`,
              currentLatitude: latitude,
              currentLongitude: longitude,
              speed: Math.round(position.coords.speed || 0),
              lastLocationUpdated: new Date().toISOString(),
            },
          }),
        ).then((result) => {
          console.log("Update Result:", result);
          // Fetch updated shipment data
          dispatch(getShipmentById(id));
        });
      },
      (error) => {
        console.error("Error getting initial location:", error);
        setLocationError(error.message);
        // Use fallback location from shipment if available
        if (
          selectedShipment.currentLatitude &&
          selectedShipment.currentLongitude
        ) {
          setUserLocation({
            latitude: parseFloat(selectedShipment.currentLatitude),
            longitude: parseFloat(selectedShipment.currentLongitude),
          });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );

    // Watch for location changes
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Updated Location:", { latitude, longitude });
        setUserLocation({ latitude, longitude });

        dispatch(
          updateRouteLocation({
            id: selectedShipment._id,
            data: {
              currentLocation: `${latitude}, ${longitude}`,
              currentLatitude: latitude,
              currentLongitude: longitude,
              speed: Math.round(position.coords.speed || 0),
              lastLocationUpdated: new Date().toISOString(),
            },
          }),
        ).then(() => {
          // Refresh shipment data after update
          dispatch(getShipmentById(id));
        });
      },
      (error) => {
        console.error("Error watching location:", error);
        setLocationError(error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );

    // Cleanup: clear watch on component unmount
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [dispatch, selectedShipment, id]);

  // Handle manual location update
  const handleUpdateLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setIsUpdating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Manual Location Update:", { latitude, longitude });

        dispatch(
          updateRouteLocation({
            id: selectedShipment._id,
            data: {
              currentLocation: `${latitude}, ${longitude}`,
              currentLatitude: latitude,
              currentLongitude: longitude,
              speed: Math.round(position.coords.speed || 0),
              lastLocationUpdated: new Date().toISOString(),
            },
          }),
        )
          .then(() => {
            setIsUpdating(false);
            // Refresh shipment data
            dispatch(getShipmentById(id));
            alert("Location updated successfully!");
          })
          .catch((error) => {
            setIsUpdating(false);
            console.error("Update error:", error);
            alert("Failed to update location. Please try again.");
          });
      },
      (error) => {
        setIsUpdating(false);
        console.error("Error getting location:", error);
        alert(`Failed to get current location: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  // Helper function to safely get coordinates
  const getCoordinates = () => {
    // Try to get from selectedShipment first
    let lat = selectedShipment?.currentLatitude;
    let lng = selectedShipment?.currentLongitude;

    // If not available, try userLocation
    if (!lat || !lng) {
      lat = userLocation?.latitude;
      lng = userLocation?.longitude;
    }

    // If still not available, use fallback
    if (!lat || !lng) {
      lat = 9.919;
      lng = 78.1195;
    }

    // Parse as float in case they are strings
    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
    };
  };

  const coordinates = getCoordinates();

  if (loading || !selectedShipment) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3">Loading shipment details...</h4>
        </div>
      </div>
    );
  }
  const InfoItem = ({ label, value }) => (
    <div className="d-flex justify-content-between border-bottom py-3">
      <span className="text-muted">{label}</span>

      <strong className="text-end">{value}</strong>
    </div>
  );
  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <div
        className="card border-0 shadow-lg mb-4"
        style={{
          borderRadius: "28px",
          background: "linear-gradient(135deg,#1e3a8a,#2563eb,#38bdf8)",
        }}
      >
        <div className="card-body p-4 text-white">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h2 className="fw-bold mb-2">🚚 Route Monitoring</h2>

              <p className="mb-0 opacity-75">
                Real-time shipment tracking and AI route intelligence
              </p>
            </div>

            <div className="mt-3 mt-md-0">
              <button
                className="btn btn-success me-2 px-4"
                onClick={handleUpdateLocation}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Location"}
              </button>

              <button
                className="btn btn-light px-4"
                onClick={() => navigate("/view-shipment")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {locationError && (
        <div className="alert alert-warning shadow-sm rounded-4">
          ⚠️ {locationError}. Using fallback coordinates.
        </div>
      )}

      <div className="row g-4">
        {/* LEFT PANEL */}

        <div className="col-xl-4 col-lg-5">
          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              borderRadius: "25px",
            }}
          >
            <div className="card-body p-4">
              <h4 className="fw-bold text-primary mb-4">📦 Shipment Details</h4>

              <InfoItem
                label="Shipment ID"
                value={selectedShipment.shipmentNo}
              />

              <InfoItem
                label="Status"
                value={
                  <span
                    className={`badge px-3 py-2 ${
                      selectedShipment.status === "Delivered"
                        ? "bg-success"
                        : selectedShipment.status === "In Transit"
                          ? "bg-primary"
                          : selectedShipment.status === "Delayed"
                            ? "bg-warning"
                            : "bg-secondary"
                    }`}
                  >
                    {selectedShipment.status || "--"}
                  </span>
                }
              />

              <InfoItem
                label="Location"
                value={selectedShipment.currentLocation || "--"}
              />

              <InfoItem
                label="Latitude"
                value={
                  selectedShipment.currentLatitude
                    ? Number(selectedShipment.currentLatitude).toFixed(6)
                    : "--"
                }
              />

              <InfoItem
                label="Longitude"
                value={
                  selectedShipment.currentLongitude
                    ? Number(selectedShipment.currentLongitude).toFixed(6)
                    : "--"
                }
              />

              <InfoItem
                label="Speed"
                value={`${selectedShipment.speed || 0} km/h`}
              />

              <InfoItem
                label="Last Updated"
                value={
                  selectedShipment.lastLocationUpdated
                    ? new Date(
                        selectedShipment.lastLocationUpdated,
                      ).toLocaleString()
                    : "--"
                }
              />
            </div>
          </div>

          {/* AI CARD */}

          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: "25px",
            }}
          >
            <div className="card-body p-4">
              <h4 className="fw-bold text-success mb-4">
                🤖 AI Route Analysis
              </h4>

              <InfoItem
                label="ETA"
                value={selectedShipment.aiResult?.eta || "--"}
              />

              <InfoItem
                label="Risk"
                value={
                  <span className="badge bg-warning text-dark px-3 py-2">
                    {selectedShipment.aiResult?.delayRisk || "--"}
                  </span>
                }
              />

              <div className="mt-3">
                <strong>Recommendation</strong>

                <div className="alert alert-info rounded-4 mt-2">
                  💡
                  {selectedShipment.aiResult?.recommendation ||
                    "No AI analysis available"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAP */}

        <div className="col-xl-8 col-lg-7">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: "25px",
            }}
          >
            <div className="card-body p-2">
              <MapContainer
                center={[coordinates.latitude, coordinates.longitude]}
                zoom={13}
                style={{
                  height: "720px",
                  width: "100%",
                }}
                className="rounded-4"
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                  position={[coordinates.latitude, coordinates.longitude]}
                >
                  <Popup>
                    <div className="text-center">
                      <h6 className="fw-bold">{selectedShipment.shipmentNo}</h6>

                      <p>
                        📍
                        {selectedShipment.currentLocation || "Unknown"}
                      </p>

                      <span className="badge bg-primary">
                        {selectedShipment.status}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteMonitoring;
