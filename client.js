window.socket = null;

window.kill = () => {
    if (window.socket && window.socket.readyState === WebSocket.OPEN) {
        window.socket.send("kill");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    let interval;

    window.socket = new WebSocket("ws://localhost:8081/server");
    window.socket.onopen = () => {
        console.log("Socket opened");
        interval = setInterval(() => {
            window.socket.send("ping");
        }, 500);
    };
    window.socket.onmessage = e => {
        console.log(e.data);
    };
    window.socket.onclose = () => {
        window.clearInterval(interval);
        console.log("Socket closed");
    };

    document.write('<button onclick="kill()">Kill</button>');
});
