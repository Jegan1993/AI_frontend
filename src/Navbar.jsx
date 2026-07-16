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

  const unread = notifications.filter((x) => !x.isRead).length;

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
      className="navbar navbar-expand-lg shadow-sm px-4"
      style={{
        background: "#0d6efd",
        minHeight: "65px",
      }}
    >
      <div className="container-fluid">
        <h4 className="text-white fw-bold mb-0">AI Logistics CRM</h4>

        <div className="ms-auto position-relative" ref={notificationRef}>
          <button
            className="btn bg-white rounded-circle shadow-sm"
            style={{
              width: "45px",
              height: "45px",
            }}
            onClick={() => setShow((prev) => !prev)}
          >
            <FaBell size={20} color="#144eed" />
          </button>

          {unread > 0 && (
            <span
              className="position-absolute badge rounded-pill bg-danger"
              style={{
                top: "-5px",
                right: "-5px",
              }}
            >
              {unread}
            </span>
          )}

          {show && (
            <div
              className="position-absolute bg-white rounded shadow"
              style={{
                top: "60px",
                right: "0",
                width: "380px",
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
