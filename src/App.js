import React, { useEffect, useRef, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

function App() {
  const [connection, setConnection] = useState(null);
  const [exerciseId, setExerciseId] = useState(702);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);

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

        const li = document.createElement("li");
        li.textContent = message;

        messageRef.current.appendChild(li);
      });
    }
  }, [connection]);

  const onStartClick = () => {
    connection.invoke("Start", exerciseId);
  };

  const onCancelClick = () => {
    connection.invoke("Cancel");
  };

  const onClearMessage = () => {
    while (messageRef.current.firstChild) {
      messageRef.current.removeChild(messageRef.current.firstChild);
    }
  };

  return (
    <div className="App">
      <div>
        <h3>Enter exercise ID</h3>
        <input
          value={exerciseId}
          onChange={(e) => setExerciseId(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => onStartClick()}>Start</button>
        <button onClick={() => onCancelClick()}>Cancel</button>
        <button onClick={() => onClearMessage()}>Clear</button>
      </div>

      <ul ref={messageRef}></ul>
    </div>
  );
}

export default App;
