const NotificationReceived = (notification) => {
  return <div className="toast-body">{notification.text}</div>;
};

const NotificationPanel = (notification) => {
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
        <small>11 mins ago</small>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <NotificationReceived
        key={notification.id}
        text={notification.text}
      ></NotificationReceived>
    </div>
  );
};

export default NotificationPanel;
