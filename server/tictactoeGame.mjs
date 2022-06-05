
const HORIZONTAL_MASK = 0b111000000;
const VERTICAL_MASK = 0b100100100;
const DIAGONAL1_MASK = 0b100010001;
const DIAGONAL2_MASK = 0b001010100;
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

            if (checkMask(board, HORIZONTAL_MASK)
                || checkMask(board, HORIZONTAL_MASK >>> 3)
                || checkMask(board, HORIZONTAL_MASK >>> 6)) {
                return true;
            }

            if (checkMask(board, VERTICAL_MASK)
                || checkMask(board, VERTICAL_MASK >>> 1)
                || checkMask(board, VERTICAL_MASK >>> 2)) {
                return true;
            }

            if (checkMask(board, DIAGONAL1_MASK)
                || checkMask(board, DIAGONAL2_MASK)) {
                return true;
            }

            return false;
        },
        nextPlayer() {
            player1Turn = !player1Turn;
        },
        data() {
            const board = ["", "", "", "", "", "", "", "", ""];

            const SPLIT_MASK = 0b1000000000;

            dec2bin((xBoard | SPLIT_MASK))
                .split("")
                .slice(1, 10)
                .forEach((value, index) => (value === "1") ? board[index] = "X" : "");

            dec2bin((oBoard | SPLIT_MASK))
                .split("")
                .slice(1, 10)
                .forEach((value, index) => (value === "1") ? board[index] = "O" : "");

            return board;
        }
    }
}

function checkMask(board, mask) {
    return (board & mask) === mask;
}

function mark(board, col, row) {
    return (MARK_MASK >>> col) >>> (row * 3) | board;
}

function isMarked(board, col, row) {
    return Boolean(((MARK_MASK >>> col) >>> (row * 3)) & board);
}

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

const __TEST_ONLY__ = {
    mark,
    isMarked,
    checkMask
}

export { tictactoeGame, __TEST_ONLY__ };