import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

function setupSocketConnection(url, controllers = []) {

    const socket = io(url || "http://localhost:3000", {
        reconnection: false
    });

    for (const controller of controllers) {
        controller(socket);
    }
}

export { setupSocketConnection };