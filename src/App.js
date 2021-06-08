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
    const ul = messageRef.current;
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
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
        <button onClick={() => onClearMessage()}>Clear</button>
      </div>

      <ul ref={messageRef}></ul>
    </div>
  );
}

export default App;
