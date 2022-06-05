import { tictactoeGame } from './tictactoeGame.mjs';

function gameController(io) {

    const state = {
        player1: {
            wins: 0
        },
        player2: {
            wins: 0
        },
        status: "waiting"//"waiting"|"player1"|"player2"|"finished"
    }

    const game = tictactoeGame()

    io.on("connection", (socket) => {

        io.emit("tictactoe/update", {
            state: {
                ...state,
                board: game.data()
            }
        });

        socket.on("tictactoe/mark", (data) => {

            // if (state.status === "finished" || state.status === "waiting") {
            //     return;
            // }

            const col = data.col;
            const row = data.row;

            if (!game.mark(col, row)) {
                return;
            }

            if (!game.isWon()) {
                game.nextPlayer();
            }

            io.emit("tictactoe/update", {
                state: {
                    ...state,
                    board: game.data()
                }
            })
        })

    });

}


export { gameController }