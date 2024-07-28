"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const game1_1 = require("./game1");
const messages1_1 = require("./messages1");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users.pop();
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            try {
                console.log("ho");
                console.log(data);
                const message = JSON.parse(data.toString());
                console.log("lo");
                if (message.type == messages1_1.init_game) {
                    if (this.pendingUser) {
                        const game = new game1_1.Game(this.pendingUser, socket);
                        this.games.push(game);
                        this.pendingUser = null;
                    }
                    else {
                        this.pendingUser = socket;
                    }
                }
                if (message.type == messages1_1.MOVE) {
                    console.log(message.payload);
                    const gamer = this.games.find(game => game.player1 == socket || game.player2 == socket);
                    console.log("i cam here");
                    console.log(gamer);
                    if (gamer) {
                        console.log("inside makemove");
                        console.log(message.payload.move);
                        gamer.makeMove(socket, message.payload.move);
                    }
                }
            }
            catch (error) {
                console.log('Error parsing JSON:');
                // Optionally, send an error message back to the client
                socket.send(JSON.stringify({ type: 'error', message: 'Invalid JSON format' }));
            }
        });
    }
}
exports.GameManager = GameManager;
;
