import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "./CreateSlice/NotificationSlice";
import { useEffect, useRef, useState } from "react";
import Notification from "./Pages/Notification";

function Navbar() {
  const dispatch = useDispatch();
  const notificationRef = useRef(null);
  const [show, setShow] = useState(false);

  const notifications = useSelector(
    (state) => state.notification?.notifications || [],
  );

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const unread = notifications.filter((item) => !item.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3"
      style={{
        background: "linear-gradient(135deg,#0f172a,#1d4ed8,#2563eb)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1050,
      }}
    >
      <div className="container-fluid">
        {/* Left */}
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center rounded-circle me-3"
            style={{
              width: "50px",
              height: "50px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              fontSize: "24px",
            }}
          >
            🚚
          </div>

          <div>
            <h4 className="text-white fw-bold mb-0">AI Logistics CRM</h4>

            <small
              style={{
                color: "rgba(255,255,255,0.75)",
              }}
            >
              Smart Supply Chain Management
            </small>
          </div>
        </div>

        {/* Right */}
        <div className="ms-auto position-relative" ref={notificationRef}>
          <button
            className="btn border-0 rounded-circle position-relative"
            style={{
              width: "55px",
              height: "55px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              transition: "0.3s",
            }}
            onClick={() => setShow((prev) => !prev)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            }}
          >
            <FaBell size={22} color="#fff" />
          </button>

          {unread > 0 && (
            <span
              className="position-absolute badge rounded-pill bg-danger"
              style={{
                top: "4px",
                right: "4px",
                minWidth: "22px",
                height: "22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "11px",
                border: "2px solid #fff",
              }}
            >
              {unread}
            </span>
          )}

          {show && (
            <div
              className="position-absolute"
              style={{
                top: "70px",
                right: "0",
                width: "390px",
                zIndex: 9999,
              }}
            >
              <Notification />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
