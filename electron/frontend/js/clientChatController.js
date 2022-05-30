function clientChatController(handle = "User") {

    return (socket) => {
        const chat = chatLogger(handle);
        const sendChatHandler = sendChat(socket);
        const $sendButton = document.querySelector("#send-chat");
        if (!$sendButton) {
            chat({ message: "Error setting up chat." });
            return;
        }

        socket.on("connect", () => {
            chat({ message: "Connected to server" });
            socket.emit("chat/register-handle", { handle });

            $sendButton.addEventListener("click", sendChatHandler, false);
        });

        socket.on("disconnect", () => {
            chat({ message: "Disconnected from server" });

            $sendButton.removeEventListener("click", sendChatHandler, false);
        });

        socket.on("connect_error", () => chat({ message: "Error connecting to server" }));
        socket.on("chat/receive", chat);
    }
}

/**
 * Sends a chat message.
 */
function sendChat(socket) {
    return () => {
        const $chat = document.querySelector("#chat-input");

        if (!$chat || !$chat.value) {
            return;
        }

        socket.emit("chat/send", {
            message: $chat.value.trim()
        });

        $chat.value = "";
    }
}

/**
 * Logs a chat message.
 */
function chatLogger(handle) {
    return (data) => {
        const $chatHistory = document.querySelector(".chat-history");

        if (!$chatHistory) {
            return;
        }

        const shouldScroll = isScrolledToBottom($chatHistory);

        if (data.handle) {
            const playerClass = data.handle === handle ? "self" : "";
            $chatHistory.insertAdjacentHTML("beforeend", /*html*/`<div class="chat ${playerClass}"><h5>${data.handle}</h5><span>${data.message}</span></div>`)
        } else {
            $chatHistory.insertAdjacentHTML("beforeend", /*html*/`<div class="chat info"><span>${data.message}</span></div>`)
        }

        if (shouldScroll) {
            $chatHistory.scrollTop = $chatHistory.scrollHeight;
        }
    }
}

function isScrolledToBottom($el) {
    return Math.abs($el.scrollHeight - $el.scrollTop - $el.offsetHeight) <= 1;
}

export { clientChatController }