import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../contexts/WebSocketContext";

type MessagePayload = {
  content: string;
  msg: string;
};

export const WebSocket = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const socket = useContext(WebSocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("onMessage", (data: MessagePayload) => {
      console.log("OnMessage received");
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      console.log("Unregister events");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);
  const onSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  };
  return (
    <div>
      <div>
        <h1>WebSockets component</h1>
        <div>
          {messages.length === 0 ? (
            <div>No messages</div>
          ) : (
            <div>
              {messages.map((msg) => (
                <div>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
