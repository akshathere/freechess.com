"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages1_1 = require("./messages1");
class Game {
    constructor(player1, player2) {
        this.moves_length = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.moves = [];
        this.board = new chess_js_1.Chess();
        this.startGame = new Date();
        this.player1.send(JSON.stringify({
            type: messages1_1.init_game,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages1_1.init_game,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        console.log(move);
        if (this.moves_length % 2 === 0 && socket !== this.player1) {
            console.log("early return 1");
            return;
        }
        if (this.moves_length % 2 === 1 && socket !== this.player2) {
            console.log("early return 2");
            return;
        }
        console.log("before the move");
        try {
            console.log(this.board);
            console.log(this.board.move);
            this.board.move(move);
            console.log("no error here");
        }
        catch (e) {
            console.error(e);
            return;
        }
        console.log("after the move");
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messages1_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? "black" : "White"
                }
            }));
            this.player2.send(JSON.stringify({
                type: messages1_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? "black" : "White"
                }
            }));
        }
        if (this.moves_length % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: messages1_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: messages1_1.MOVE,
                payload: move
            }));
        }
        this.moves_length++;
    }
}
exports.Game = Game;
