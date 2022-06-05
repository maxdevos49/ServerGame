import assert from 'assert';

import { tictactoeGame, __TEST_ONLY__ } from "../server/tictactoeGame.mjs";

describe('tictactoeGame()', () => {
    describe('Internal mark(board: number, col: number, row: number): number', () => {
        const mark = __TEST_ONLY__.mark;

        // Row 0
        it('Should mark col 0 row 0', () => {
            const board = 0b000000000;
            assert(mark(board, 0, 0) === 0b100000000);
        });

        it('Should mark col 1 row 0', () => {
            const board = 0b000000000;
            assert(mark(board, 1, 0) === 0b010000000);
        });

        it('Should mark col 2 row 0', () => {
            const board = 0b000000000;
            assert(mark(board, 2, 0) === 0b001000000);
        });

        // Row 1
        it('Should mark col 0 row 1', () => {
            const board = 0b000000000;
            assert(mark(board, 0, 1) === 0b000100000);
        });

        it('Should mark col 1 row 1', () => {
            const board = 0b000000000;
            assert(mark(board, 1, 1) === 0b000010000);
        });

        it('Should mark col 2 row 1', () => {
            const board = 0b000000000;
            assert(mark(board, 2, 1) === 0b000001000);
        });

        // Row 2
        it('Should mark col 0 row 2', () => {
            const board = 0b000000000;
            assert(mark(board, 0, 2) === 0b000000100);
        });

        it('Should mark col 1 row 2', () => {
            const board = 0b000000000;
            assert(mark(board, 1, 2) === 0b000000010);
        });

        it('Should mark col 2 row 2', () => {
            const board = 0b000000000;
            assert(mark(board, 2, 2) === 0b000000001);
        });
    });

    describe('Internal isMarked(board: number, col: number, row: number): boolean', () => {
        const isMarked = __TEST_ONLY__.isMarked;

        // Row 0
        it('Should be marked at col 0 row 0', () => {
            const board = 0b100000000;
            assert(isMarked(board, 0, 0));
        });
        it('Should not be marked at col 0 row 0', () => {
            const board = 0b000000000;
            assert(!isMarked(board, 0, 0));
        });

        it('Should be marked at col 1 row 0', () => {
            const board = 0b010000000;
            assert(isMarked(board, 1, 0));
        });
        it('Should not be marked at col 1 row 0', () => {
            const board = 0b000000000;
            assert(!isMarked(board, 1, 0));
        });

        it('Should be marked at col 2 row 0', () => {
            const board = 0b001000000;
            assert(isMarked(board, 2, 0));
        });
        it('Should not be marked at col 2 row 0', () => {
            const board = 0b000000000;
            assert(!isMarked(board, 2, 0));
        });

        // Row 1
        it('Should be marked at col 0 row 1', () => {
            const board = 0b000100000;
            assert(isMarked(board, 0, 1));
        });
        it('Should not be marked at col 0 row 1', () => {
            const board = 0b000000000;
            assert(!isMarked(board, 0, 1));
        });

        it('Should be marked at col 1 row 1', () => {
            const board = 0b000010000;
            assert(isMarked(board, 1, 1));
        });
        it('Should not be marked at col 1 row 1', () => {
            const board = 0b000000000;
            assert(!isMarked(board, 1, 1));
        });

        it('Should be marked at col 2 row 1', () => {
            const board = 0b000001000;
            assert(isMarked(board, 2, 1));
        });
        it('Should not be marked at col 2 row 1', () => {
            const board = 0b000000000;
            assert(!isMarked(board, 2, 1));
        });

        // Row 2
        it('Should be marked at col 0 row 2', () => {
            const board = 0b000000100;
            assert(isMarked(board, 0, 2));
        });
        it('Should not be marked at col 0 row 2', () => {
            const board = 0b000000000;
            assert(!isMarked(board, 0, 2));
        });

        it('Should be marked at col 1 row 2', () => {
            const board = 0b000000010;
            assert(isMarked(board, 1, 2));
        });
        it('Should not be marked at col 1 row 2', () => {
            const board = 0b000000000;
            assert(!isMarked(board, 1, 2));
        });

        it('Should be marked at col 2 row 2', () => {
            const board = 0b000000001;
            assert(isMarked(board, 2, 2));
        });
        it('Should not be marked at col 2 row 2', () => {
            const board = 0b000000000;
            assert(!isMarked(board, 2, 2));
        });
    });

    describe('Internal checkMask(board: number, mask: number): boolean', () => {
        const checkMask = __TEST_ONLY__.checkMask;

        it("Should test for a matching bit mask", () => {
            assert(checkMask(0b111010100, 0b111000000));
        });

        it("Should test for a failing match bit mask", () => {
            assert(!checkMask(0b101000010, 0b111000000));
        });
    });

    describe('game.check(col: number, row: number): boolean', () => {
        const game = tictactoeGame();

        it("Should successfully mark a cell", () => {
            assert(game.mark(0, 0));
            assert(game.mark(0, 1));
            assert(game.mark(0, 2));
        });

        it("Should fall to mark a cell", () => {
            assert(!game.mark(0, 0));
            assert(!game.mark(0, 1));
            assert(!game.mark(0, 2));
        });
    });

    describe("game.isWon(): boolean", () => {

        it("Should detect a horizontal row 0 win", () => {
            const game = tictactoeGame();

            game.mark(0, 0);
            assert(!game.isWon());
            game.mark(1, 0);
            assert(!game.isWon());
            game.mark(2, 0);
            assert(game.isWon());
        });

        it("Should detect a horizontal row 1 win", () => {
            const game = tictactoeGame();

            game.mark(0, 1);
            assert(!game.isWon());
            game.mark(1, 1);
            assert(!game.isWon());
            game.mark(2, 1);
            assert(game.isWon());
        });

        it("Should detect a horizontal row 2 win", () => {
            const game = tictactoeGame();

            game.mark(0, 2);
            assert(!game.isWon());
            game.mark(1, 2);
            assert(!game.isWon());
            game.mark(2, 2);
            assert(game.isWon());
        });

        it("Should detect a vertical column 0 win", () => {
            const game = tictactoeGame();

            game.mark(0, 0);
            assert(!game.isWon());
            game.mark(0, 1);
            assert(!game.isWon());
            game.mark(0, 2);
            assert(game.isWon());
        });

        it("Should detect a vertical column 1 win", () => {
            const game = tictactoeGame();

            game.mark(1, 0);
            assert(!game.isWon());
            game.mark(1, 1);
            assert(!game.isWon());
            game.mark(1, 2);
            assert(game.isWon());
        });

        it("Should detect a vertical column 2 win", () => {
            const game = tictactoeGame();

            game.mark(2, 0);
            assert(!game.isWon());
            game.mark(2, 1);
            assert(!game.isWon());
            game.mark(2, 2);
            assert(game.isWon());
        });

        it("Should detect a diagonal top left to bottom right win", () => {
            const game = tictactoeGame();

            game.mark(0, 0);
            game.mark(1, 1);
            game.mark(2, 2);

            assert(game.isWon());
        });

        it("Should detect a diagonal top right to bottom left win", () => {
            const game = tictactoeGame();

            game.mark(0, 0);
            assert(!game.isWon());
            game.mark(1, 1);
            assert(!game.isWon());
            game.mark(2, 2);
            assert(game.isWon());
        });

        it("Should not detect a win for another player", () => {
            const game = tictactoeGame();

            game.mark(0, 0);
            game.mark(1, 1);
            game.mark(2, 2);
            assert(game.isWon());
            game.nextPlayer();
            assert(!game.isWon())

        });
    })

    describe("game.data(): string[]", () => {
        it("Should return array of empty strings at after starting a game", () => {
            const game = tictactoeGame();
            assert(game.data().filter(v => v === "X").length === 0);
            game.nextPlayer()
            assert(game.data().filter(v => v === "O").length === 0);
        });

        it("Should return array with correct letters", () => {
            const game = tictactoeGame();
            game.mark(0, 0);
            assert(game.data().filter(v => v === "X").length === 1);
            game.nextPlayer()
            game.mark(0, 1);
            assert(game.data().filter(v => v === "O").length === 1);
        })
    })
});