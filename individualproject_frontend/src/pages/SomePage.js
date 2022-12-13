import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useState, useEffect } from "react";
import NotificationPanel from "../components/NotificationPanel";

function SomePage() {
  const [messagesReceived, setMessagesReceived] = useState([]);
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
        console.log(data);
        onMessageReceived(data);
      });
    });
    // maintain the client for sending and receiving
    setStompClient(stompClient);
  }, []);
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    setMessagesReceived((messagesReceived) => [...messagesReceived, message]);
  };

  return (
    <div className="App">
      <NotificationPanel messagesReceived={messagesReceived} />
    </div>
  );
}

export default SomePage;
