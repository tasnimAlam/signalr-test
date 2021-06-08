import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

function App() {
  const [connection, setConnection] = useState(null);
  const [exerciseId, setExerciseId] = useState(702);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/hub")
      .build();
    setConnection(connection);

    connection.start().then((result) => console.log("Connected"));
  }, []);

  useEffect(() => {
    if (connection) {
      connection.on("Update", (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [connection, messages]);

  const onStartClick = () => {
    connection.invoke("Start", exerciseId);
  };

  const onCancelClick = () => {
    connection.invoke("Cancel");
  };

  return (
    <div className="container">
      <div>
        <h4>Enter exercise ID</h4>
        <input
          value={exerciseId}
          onChange={(e) => setExerciseId(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => onStartClick()}>Start</button>
        <button onClick={() => onCancelClick()}>Cancel</button>
        <button onClick={() => setMessages([])}>Clear</button>
      </div>

      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
