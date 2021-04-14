import server from "./server"

server.app.listen(server.port, () => {
  console.log(`Running in ${server.mode} mode on port ${server.port}`)
})