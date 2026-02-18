"use client"

import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"

export default function Home()
{
  const socketRef = useRef<Socket | null>(null)

  const [joined, setJoined] = useState(false)
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ user: string; message: string }[]>([])

  // Store current state in refs so socket handlers can access latest values without triggering re-renders
  const roomRef = useRef(room)
  const usernameRef = useRef(username)
  const joinedRef = useRef(joined)

  useEffect(() => {
    roomRef.current = room
  }, [room])

  useEffect(() => {
    usernameRef.current = username
  }, [username])

  useEffect(() => {
    joinedRef.current = joined
  }, [joined])

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io("http://localhost:8000")
    
    // Handle connection (and reconnection)
    socketRef.current.on("connect", () => {
      console.log("Connected to server with ID:", socketRef.current?.id)
      
      // If user was already joined before disconnect/reconnect, rejoin the room automatically
      if (joinedRef.current && roomRef.current && usernameRef.current) {
        console.log("Rejoining room:", roomRef.current)
        socketRef.current?.emit("join-room", {
          roomId: roomRef.current,
          username: usernameRef.current
        })
      }
    })

    socketRef.current.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data])
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])


  const joinRoom = () =>
  {
    if (!username.trim() || !room.trim()) return

    socketRef.current?.emit("join-room", {
      roomId: room,
      username
    })

    setJoined(true)
  }

  const sendMessage = () => {
    if (!message.trim() || !room.trim()) return;

    socketRef.current?.emit("send-message", { message, roomId: room, username });
    
    setMessage("");
  };

  if (!joined)
  {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-96 space-y-5">
          <h2 className="text-2xl font-semibold text-center">
            Join Chat Room
          </h2>

          <input
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            placeholder="Enter Room Code"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            onClick={joinRoom}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Join Room
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow p-4">
        <h2 className="font-semibold text-lg">
          Room: {room}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) =>
        (
          <div
            key={index}
            className={`p-3 rounded-lg shadow max-w-xs ${
              msg.user === username
                ? "bg-blue-600 text-white ml-auto"
                : "bg-white"
            }`}
          >
            <p className="text-sm font-semibold">
              {msg.user}
            </p>
            <p className="text-sm">
              {msg.message}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 flex gap-3">
        <input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  )
}
