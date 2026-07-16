import { useDispatch, useSelector } from "react-redux";
import { markAsRead, getNotifications } from "../CreateSlice/NotificationSlice";

function Notification() {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notification.notifications,
  );

  const handleRead = async (id) => {
    await dispatch(markAsRead(id));

    dispatch(getNotifications());
  };

  return (
    <div
      className="card shadow position-absolute"
      style={{
        right: 20,
        top: 60,
        width: "350px",
        zIndex: 999,
      }}
    >
      <div className="card-header bg-primary text-white">Notifications</div>

      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {notifications.length === 0 ? (
          <div className="p-3 text-center">No Notifications</div>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`p-3 border-bottom ${item.isRead ? "" : "bg-light"}`}
            >
              <h6>{item.title}</h6>

              <small>{item.message}</small>

              <br />

              <small className="text-muted">
                {new Date(item.createdAt).toLocaleString("en-GB")}
              </small>

              <br />

              {!item.isRead && (
                <button
                  className="btn btn-sm btn-primary mt-2"
                  onClick={() => handleRead(item._id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;

