/**
 * Project codename ledlight
 * @author Maxwell DeVos
 * @since June 4, 2022
 */
function chatController(io) {
    io.on("connection", (socket) => {
        socket.chatData = {
            handle: "User",
        };

        socket.once("chat/register-handle", (data) => {
            socket.chatData.handle = data.handle.replace(/<[^>]+>/g, '');

            sendInfoChat(io, `${socket.chatData.handle} joined the game`);
        });

        socket.on("chat/send", (data) => {
            sendPlayerChat(io, socket, data.message);
        });

        socket.on("disconnect", () => sendInfoChat(io, `${socket.chatData.handle} left the game`));
    });
}

function sendPlayerChat(io, socket, message) {
    io.emit("chat/receive", {
        handle: socket.chatData.handle,
        message: message.replace(/<[^>]+>/g, '')
    });
}

function sendInfoChat(io, message) {
    io.emit("chat/receive", { message });
}

export { chatController };