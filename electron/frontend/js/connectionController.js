function connectionController(socket) {
    socket.on("connect", () => {
        document.querySelectorAll("#server-form input,#server-form button").forEach($el => $el.disabled = true);
        document.querySelector(".connection-status")?.classList.add("connected");
        document.querySelector(".connection-status")?.classList.remove("error");
    });

    socket.on("connect_error", () => {
        document.querySelector(".connection-status")?.classList.add("error");
    });

    socket.on("disconnect", () => {
        document.querySelectorAll("#server-form input,#server-form button").forEach($el => $el.disabled = false);
        document.querySelector(".connection-status")?.classList.remove("connected");
        document.querySelector(".connection-status")?.classList.remove("error");
    })
}

export { connectionController }