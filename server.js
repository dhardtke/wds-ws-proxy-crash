const WebSocket = require("ws");

const wss = new WebSocket.Server({
    port: 8080,
    path: "/server"
});

wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
        if (message === "kill") {
            ws.close(1008, "You violated the server policy.");
        } else {
            ws.send("pong");
        }
    });
});
