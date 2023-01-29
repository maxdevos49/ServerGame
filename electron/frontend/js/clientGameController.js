
function clientGameController(socket) {

    document.querySelector(".board")?.addEventListener("click", (e) => {
        const $target = e.target?.closest(".slot");

        if (!$target) {
            return;
        }

        const col = Number.parseInt($target.dataset.column);
        const row = Number.parseInt($target.dataset.row);

        socket.emit("tictactoe/mark", { col, row });
    });

    socket.on("tictactoe/update", (data) => {
        const $slots = document.querySelectorAll(".slot");

        $slots.forEach($el => {

            const col = Number.parseInt($el.dataset.column);
            const row = Number.parseInt($el.dataset.row);

            const index = col + (row * 3);

            $el.title = data.state.board[index];
        });
    });
}

export { clientGameController };