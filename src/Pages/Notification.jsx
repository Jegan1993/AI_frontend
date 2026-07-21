import { useDispatch, useSelector } from "react-redux";
import { markAsRead, getNotifications } from "../CreateSlice/NotificationSlice";
import { FaBell, FaCheck, FaClock, FaInbox } from "react-icons/fa";

function Notification() {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notification.notifications || [],
  );

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const handleRead = async (id) => {
    await dispatch(markAsRead(id));
    dispatch(getNotifications());
  };

  return (
    <div
      className="card border-0 shadow-lg"
      style={{
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 text-white"
        style={{
          background: "linear-gradient(135deg,#2563eb,#1d4ed8,#0f172a)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <FaBell size={20} className="me-2" />
            <div>
              <h5 className="mb-0 fw-bold">Notifications</h5>
              <small className="text-white-50">{unreadCount} Unread</small>
            </div>
          </div>

          <span className="badge bg-light text-primary rounded-pill px-3 py-2">
            {notifications.length}
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          maxHeight: "450px",
          overflowY: "auto",
          background: "#f8fafc",
        }}
      >
        {notifications.length === 0 ? (
          <div className="text-center py-5">
            <FaInbox size={50} className="text-secondary mb-3" />

            <h6 className="fw-bold">No Notifications</h6>

            <small className="text-muted">You're all caught up.</small>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className="p-3 border-bottom"
              style={{
                background: item.isRead ? "#ffffff" : "#eff6ff",
                transition: "0.3s",
              }}
            >
              <div className="d-flex">
                {/* Icon */}
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                    background: item.isRead ? "#e5e7eb" : "#dbeafe",
                    color: "#2563eb",
                    flexShrink: 0,
                  }}
                >
                  <FaBell />
                </div>

                {/* Content */}
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6
                      className={`mb-1 ${
                        item.isRead ? "" : "fw-bold text-primary"
                      }`}
                    >
                      {item.title}
                    </h6>

                    {!item.isRead && (
                      <span className="badge bg-danger rounded-pill">New</span>
                    )}
                  </div>

                  <p
                    className="text-muted mb-2"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {item.message}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-secondary">
                      <FaClock className="me-1" />
                      {new Date(item.createdAt).toLocaleString("en-GB")}
                    </small>

                    {!item.isRead && (
                      <button
                        className="btn btn-sm btn-primary rounded-pill px-3"
                        onClick={() => handleRead(item._id)}
                      >
                        <FaCheck className="me-1" />
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
