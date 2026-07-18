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

  return (
    <div className="container mt-4">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <i className="fas fa-route me-2"></i>
            Route Monitoring
          </h4>
          <div>
            <button
              className="btn btn-success me-2"
              onClick={handleUpdateLocation}
              disabled={isUpdating}
            >
              <i
                className={`fas ${isUpdating ? "fa-spinner fa-spin" : "fa-sync"} me-1`}
              ></i>
              {isUpdating ? "Updating..." : "Update Location"}
            </button>
            <button
              className="btn btn-light"
              onClick={() => navigate("/view-shipment")}
            >
              <i className="fas fa-arrow-left me-1"></i>
              Back
            </button>
          </div>
        </div>

        <div className="card-body">
          {locationError && (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <i className="fas fa-exclamation-triangle me-2"></i>
              Location Error: {locationError}. Using fallback coordinates.
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}

          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="text-primary mb-3">
                    <i className="fas fa-ship me-2"></i>
                    Shipment Details
                  </h5>

                  <div className="mb-2">
                    <strong>Shipment ID:</strong>
                    <span className="ms-2">{selectedShipment.shipmentNo}</span>
                  </div>

                  <div className="mb-2">
                    <strong>Status:</strong>
                    <span
                      className={`ms-2 badge ${
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
                  </div>

                  <div className="mb-2">
                    <strong>Current Location:</strong>
                    <span className="ms-2">
                      {selectedShipment.currentLocation || "--"}
                    </span>
                  </div>

                  <div className="mb-2">
                    <strong>Latitude:</strong>
                    <span className="ms-2">
                      {selectedShipment.currentLatitude !== undefined &&
                      selectedShipment.currentLatitude !== null
                        ? parseFloat(selectedShipment.currentLatitude).toFixed(
                            6,
                          )
                        : userLocation?.latitude
                          ? userLocation.latitude.toFixed(6)
                          : "--"}
                    </span>
                  </div>

                  <div className="mb-2">
                    <strong>Longitude:</strong>
                    <span className="ms-2">
                      {selectedShipment.currentLongitude !== undefined &&
                      selectedShipment.currentLongitude !== null
                        ? parseFloat(selectedShipment.currentLongitude).toFixed(
                            6,
                          )
                        : userLocation?.longitude
                          ? userLocation.longitude.toFixed(6)
                          : "--"}
                    </span>
                  </div>

                  <div className="mb-2">
                    <strong>Speed:</strong>
                    <span className="ms-2">
                      {selectedShipment.speed || 0} km/h
                    </span>
                  </div>

                  <div>
                    <strong>Last Updated:</strong>
                    <span className="ms-2">
                      {selectedShipment.lastLocationUpdated
                        ? new Date(
                            selectedShipment.lastLocationUpdated,
                          ).toLocaleString("en-GB")
                        : "--"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card shadow-sm mt-3">
                <div className="card-body">
                  <h5 className="text-success mb-3">
                    <i className="fas fa-robot me-2"></i>
                    AI Route Analysis
                  </h5>

                  <div className="mb-2">
                    <strong>ETA:</strong>
                    <span className="ms-2">
                      {selectedShipment.aiResult?.eta || "--"}
                    </span>
                  </div>

                  <div className="mb-2">
                    <strong>Risk Level:</strong>
                    <span
                      className={`ms-2 badge ${
                        selectedShipment.aiResult?.delayRisk === "Low"
                          ? "bg-success"
                          : selectedShipment.aiResult?.delayRisk === "Medium"
                            ? "bg-warning"
                            : selectedShipment.aiResult?.delayRisk === "High"
                              ? "bg-danger"
                              : "bg-secondary"
                      }`}
                    >
                      {selectedShipment.aiResult?.delayRisk || "--"}
                    </span>
                  </div>

                  <div>
                    <strong>Recommendation:</strong>
                    <div className="alert alert-info mt-2 mb-0">
                      <i className="fas fa-lightbulb me-2"></i>
                      {selectedShipment.aiResult?.recommendation ||
                        "No AI analysis available"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card shadow-sm">
                <div className="card-body p-2">
                  <MapContainer
                    center={[coordinates.latitude, coordinates.longitude]}
                    zoom={13}
                    style={{ height: "600px", width: "100%" }}
                    className="rounded"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker
                      position={[coordinates.latitude, coordinates.longitude]}
                    >
                      <Popup>
                        <div className="text-center">
                          <h6 className="mb-1">
                            {selectedShipment.shipmentNo}
                          </h6>
                          <p className="mb-1">
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {selectedShipment.currentLocation ||
                              "Location unknown"}
                          </p>
                          <p className="mb-0">
                            <span
                              className={`badge ${
                                selectedShipment.status === "Delivered"
                                  ? "bg-success"
                                  : selectedShipment.status === "In Transit"
                                    ? "bg-primary"
                                    : selectedShipment.status === "Delayed"
                                      ? "bg-warning"
                                      : "bg-secondary"
                              }`}
                            >
                              {selectedShipment.status || "Unknown"}
                            </span>
                          </p>
                          {selectedShipment.speed > 0 && (
                            <p className="mb-0 mt-1">
                              <i className="fas fa-tachometer-alt me-1"></i>
                              {selectedShipment.speed} km/h
                            </p>
                          )}
                        </div>
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
