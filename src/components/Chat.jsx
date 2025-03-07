import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [targetUserName, setTargetUserName] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    try {
      setLoading(true);
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      // Get target user's name from the first message where they are the sender
      const targetUser = chat.data.messages.find(
        (msg) => msg.senderId?._id === targetUserId
      )?.senderId;

      if (targetUser) {
        setTargetUserName(`${targetUser.firstName} ${targetUser.lastName}`);
      }

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          timestamp: new Date(createdAt || Date.now()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isCurrentUser: senderId?._id === userId,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          firstName,
          lastName,
          text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isCurrentUser: user.firstName === firstName,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 my-20 h-[75vh] flex flex-col rounded-lg overflow-hidden">
      <h1 className="p-5 border-b border-gray-600 bg-base-300">
        {loading ? "Loading..." : `${targetUserName || "User"}`}
      </h1>

      <div className="flex-1 overflow-y-auto p-5">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg
              className="w-16 h-16 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-center">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {msg.isCurrentUser ? "You" : `${msg.firstName} ${msg.lastName}`}
              </div>
              <div className="chat-bubble bg-indigo-600 text-white">
                {msg.text}
              </div>
              <div className="chat-footer opacity-50">{msg.timestamp}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-5 border-t bg-base-200 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none max-h-32"
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
