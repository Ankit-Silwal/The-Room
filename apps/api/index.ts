import dotenv from "dotenv"
dotenv.config()
import http from "http"
import app  from "./app"
import { initSocket } from "./socket"

const server = http.createServer(app)

initSocket(server)

const PORT = process.env.PORT || 8000

server.listen(PORT, () =>
{
  console.log(`Server running on http://localhost:${PORT}`)
})
