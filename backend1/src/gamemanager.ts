import { WebSocket } from "ws";
import { Game } from "./game1";
import { init_game, MOVE } from "./messages1";

export class GameManager{
    private games: Game[];
    private pendingUser:WebSocket | null
    private users:WebSocket[]
    constructor(){
        this.games=[];
        this.pendingUser=null
        this.users=[]
    }
    addUser(socket: WebSocket){
        this.users.push(socket)
        this.addHandler(socket)
    }
    removeUser(socket: WebSocket){
        this.users.pop();
    }
    private addHandler(socket: WebSocket){
        socket.on("message", (data) => {
            try {
                console.log("ho")
                console.log(data)
                const message = JSON.parse(data.toString());
                console.log("lo")
                if (message.type == init_game) {
                    if (this.pendingUser) {
                        const game = new Game(this.pendingUser, socket);
                        this.games.push(game);
                        this.pendingUser = null;
                    } else {
                        this.pendingUser = socket;
                    }
                }
                if (message.type == MOVE) {
                    console.log(message.payload);
                    const gamer = this.games.find(game => game.player1 == socket || game.player2 == socket);
                    console.log("i cam here");
                    console.log(gamer);
                    if (gamer) {
                        console.log("inside makemove")
                        console.log(message.payload.move)
                        gamer.makeMove(socket, message.payload.move);
                    }
                }
            } catch (error) {
                console.log('Error parsing JSON:');
                // Optionally, send an error message back to the client
                socket.send(JSON.stringify({ type: 'error', message: 'Invalid JSON format' }));
            }
        });
    }
    

};