import { tictactoeGame } from './tictactoeGame.mjs';

function gameController(io) {

    const state = {
        player1: {
            id: "",
            wins: 0
        },
        player2: {
            id: "",
            wins: 0
        },
        status: "waiting",//"waiting"|"player1"|"player2"|"finished"
        board: []
    }

    const game = tictactoeGame()

    io.on("connection", (socket) => {

        if (canPlayerJoin(state)) {
            addPlayer(state, socket);
        }

        if (canGameStart(state) && state.status === "waiting") {
            state.status = "player1"
        }

        // Update the board on connecting.
        io.emit("tictactoe/update", {
            state: {
                ...state,
                board: game.data()
            }
        });

        socket.on("tictactoe/mark", (data) => {

            if (!validPlay(state, socket)) {
                return;
            }

            const col = data.col;
            const row = data.row;

            if (!game.mark(col, row)) {
                return;
            }

            if (state.status === "player1") {
                state.status = "player2"
            } else if (state.status === "player2") {
                state.status = "player1"
            }

            if (!game.isWon()) {
                game.nextPlayer();
            } else {
                state.status = "finished"
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

function canPlayerJoin(state) {
    return !state.player1.id || !state.player2.id;
}

function addPlayer(state, socket) {
    if (!state.player1.id) {
        state.player1.id = socket.id;
        return;
    }

    if (!state.player2.id) {
        state.player2.id = socket.id;
        return;
    }
}

function canGameStart(state) {
    return state.player1.id && state.player2.id;
}

function validPlay(state, socket) {
    if (socket.id === state.player1.id && state.status === "player1") {
        return true;
    }

    if (socket.id === state.player2.id && state.status === "player2") {
        return true;
    }

    return false;
}

export { gameController }