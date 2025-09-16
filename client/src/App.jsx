// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("https://realtime-app-6jy6.onrender.com");

// export default function App() {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");

//     useEffect(() => {
//         socket.on("receiveData", (data) => {
//             setMessages((prev) => [...prev, data]);
//         });
//     }, []);

//     const sendMessage = () => {
//         if (!input.trim()) return;
//         socket.emit("sendData", input);
//         setInput("");
//     };

//     return (
//         <div style={{ padding: "2rem" }}>
//             <h1>Realtime Chat</h1>
//             <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type message"
//             />
//             <button onClick={sendMessage}>Send</button>

//             <ul>
//                 {messages.map((msg, i) => (
//                     <li key={i}>{msg}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }



import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("https://realtime-app-6jy6.onrender.com");

export default function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.on("receiveData", (data) => {
            setMessages((prev) => [...prev, { text: data, sender: "other" }]);
        });
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;
        socket.emit("sendData", input);
        setMessages((prev) => [...prev, { text: input, sender: "me" }]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-200">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-2xl max-w-xs shadow text-sm ${msg.sender === "me"
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-gray-700 text-gray-100 rounded-bl-none"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-3 bg-gray-800 flex items-center gap-2 border-t border-gray-700">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-full text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
