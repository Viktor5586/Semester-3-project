const NotificationReceived = (notification) => {
  return <div className="toast-body">{notification.text}</div>;
};

const NotificationPanel = (notification) => {
  console.log("Notification in panel:" + notification.data);
  if (notification?.data) {
    return (
      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <img src="..." className="rounded mr-2" alt="..." />
          <strong className="mr-auto">Bootstrap</strong>
          <NotificationReceived
            key={notification.data.id}
            text={notification.data.text}
          ></NotificationReceived>
          <small>few mins ago</small>
          <button
            type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="alert alert-warning" role="alert">
        No notifications
      </div>
    );
  }
};

export default NotificationPanel;
