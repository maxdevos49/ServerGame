
const HORIZONTAL_WIN_MASK = 0b111000000;
const VERTICAL_WIN_MASK = 0b100100100;
const DIAGONAL1_WIN_MASK = 0b100010001;
const DIAGONAL2_WIN_MASK = 0b001010100;
const MARK_MASK = 0b100000000;

function tictactoeGame() {
    let player1Turn = true;

    let xBoard = 0b000000000;
    let oBoard = 0b000000000;

    const currentPlayerBoard = () => player1Turn ? xBoard : oBoard

    return {
        mark(col, row) {
            if (isMarked(xBoard | oBoard, col, row)) {
                return false;
            }

            if (player1Turn) {
                xBoard = mark(xBoard, col, row);
            } else {
                oBoard = mark(oBoard, col, row)
            }

            return true
        },
        isWon() {
            const board = currentPlayerBoard();

            if (checkMask(board, HORIZONTAL_WIN_MASK)
                || checkMask(board, HORIZONTAL_WIN_MASK >>> 3)
                || checkMask(board, HORIZONTAL_WIN_MASK >>> 6)) {
                return true;
            }

            if (checkMask(board, VERTICAL_WIN_MASK)
                || checkMask(board, VERTICAL_WIN_MASK >>> 1)
                || checkMask(board, VERTICAL_WIN_MASK >>> 2)) {
                return true;
            }

            if (checkMask(board, DIAGONAL1_WIN_MASK)
                || checkMask(board, DIAGONAL2_WIN_MASK)) {
                return true;
            }

            return false;
        },
        nextPlayer() {
            player1Turn = !player1Turn;
        },
        data() {
            const board = ["", "", "", "", "", "", "", "", ""];

            for (let i = 0; i < 9; i++) {
                if (checkMask(xBoard, MARK_MASK >>> i)) {
                    board[i] = "X";
                } else if (checkMask(oBoard, MARK_MASK >>> i)) {
                    board[i] = "O";
                }
            }

            return board;
        }
    }
}

function checkMask(board, mask) {
    return (board & mask) === mask;
}

function mark(board, col, row) {
    const shift = col + (row * 3);
    return (MARK_MASK >>> shift) | board;
}

function isMarked(board, col, row) {
    const shift = col + (row * 3)
    return Boolean((MARK_MASK >>> shift) & board);
}

const __TEST_ONLY__ = {
    mark,
    isMarked,
    checkMask
}

export { tictactoeGame, __TEST_ONLY__ };