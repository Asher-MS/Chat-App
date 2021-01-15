const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("A user Connected");
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
  socket.on("chat message", (msg) => {
    console.log("message:" + msg);
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("Listening to port *:3000");
});
