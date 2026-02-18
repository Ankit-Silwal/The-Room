"use client"

import { useState } from "react"

export default function Home()
{
  const [username,setUsername]=useState("");
  const [roomCode,setRoomCode]=useState("");
  const [message,setMessage]=useState("");
  const [joined, setJoined] = useState(false)
  if (!joined)
  {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl p-8 w-96 space-y-5">
          <h2 className="text-2xl font-semibold text-center">
            Join Chat Room
          </h2>

          <input
            type="text"
            placeholder="Enter Username"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>{
              setUsername(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Enter Room Code"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>{
              setRoomCode(e.target.value);
            }}
          />

          <button
            onClick={() => setJoined(true)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Join Room
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg">
          Chat Room
        </h2>
        <span className="text-sm text-gray-500">
          Username
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="bg-white p-3 rounded-lg shadow max-w-xs">
          <p className="text-sm font-semibold">User A</p>
          <p className="text-sm">Hello there 👋</p>
        </div>

        <div className="bg-blue-600 text-white p-3 rounded-lg shadow max-w-xs ml-auto">
          <p className="text-sm font-semibold">You</p>
          <p className="text-sm">Hi!</p>
        </div>
      </div>

      <div className="bg-white p-4 flex gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e)=>{
            setMessage(e.target.value);
          }}
        />

        <button
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}
