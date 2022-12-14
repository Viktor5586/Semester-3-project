import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useState, useEffect } from "react";
import NotificationPanel from "../components/NotificationPanel";

function SomePage() {
  const [notificationsReceived, setNotificationsReceived] = useState([]);
  const [stompClient, setStompClient] = useState();
  const ENDPOINT = "http://localhost:8080/ws";
  useEffect(() => {
    // use SockJS as the websocket client
    const socket = SockJS(ENDPOINT);
    // Set stomp to use websockets
    const stompClient = Stomp.over(socket);
    // connect to the backend
    stompClient.connect({}, () => {
      // subscribe to the backend
      stompClient.subscribe("/employee/employeeNotifications", (data) => {
        console.log("HELLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOO" + data);
        onMessageReceived(data);
        //onUsernameInformed();
      });
    });
    // maintain the client for sending and receiving
    setStompClient(stompClient);
  }, []);
  const onMessageReceived = (data) => {
    const notification = JSON.parse(data.body);
    console.log(notification);
    setNotificationsReceived((notificationsReceived) => [
      ...notificationsReceived,
      notification,
    ]);
  };

  // const onUsernameInformed = () => {
  //   stompClient.subscribe(`/employee/employeeNotifications`, (data) => {
  //     onMessageReceived(data);
  //   });
  // };
  return (
    <div className="App">
      <NotificationPanel notificationsReceived={notificationsReceived} />
    </div>
  );
}

export default SomePage;
