import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat";
import JoinRoom from "./components/JoinRoom";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat</h1>
      </header>
      <div className="App-body">
        <JoinRoom
          socket={socket}
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
        />
        <Chat socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}

export default App;