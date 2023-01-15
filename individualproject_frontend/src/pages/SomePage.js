import SockJS from "sockjs-client";
import Stomp from "stompjs";
import React, { useState, useEffect } from "react";
import NotificationPanel from "../components/NotificationPanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        onMessageReceived(data);
      });
    });
    // maintain the client for sending and receiving
    setStompClient(stompClient);
  }, []);
  const onMessageReceived = (data) => {
    const notification = JSON.parse(data.body);
    showToastMessage("New order has been created");
    setNotificationsReceived((notificationsReceived) => [
      ...notificationsReceived,
      notification,
    ]);
  };

  const myPromise = new Promise((resolve) =>
    fetch("http://localhost:8080/ws")
      .then((response) => response.json())
      .then((json) => setTimeout(() => resolve(json), 10000))
  );

  useEffect(() => {
    toast.promise(myPromise, {
      pending: "Checking for notifications",
      success: "Promise  Loaded",
      error: "error",
    });
  }, []);
  const showToastMessage = (notification) => {
    toast.success(notification, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default SomePage;
