import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://realtime-app-6jy6.onrender.com");

export default function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        socket.on("receiveData", (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, []);

    const sendMessage = () => {
        if (!input.trim()) return;
        socket.emit("sendData", input);
        setInput("");
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Realtime Chat</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type message"
            />
            <button onClick={sendMessage}>Send</button>

            <ul>
                {messages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}
