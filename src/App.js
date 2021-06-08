import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

function App() {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    let connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/hub")
      .build();
    setConnection(connection);

    connection.start().then((result) => console.log("Connected"));
  }, []);

  // useEffect(() => {
  //   if (connection) {
  //     connection.start().then((result) => {
  //       console.log("Connected");
  //     });
  //   }
  // }, [connection]);

  return (
    <div className="App">
      <div>
        <button>Start</button>
      </div>
    </div>
  );
}

export default App;
