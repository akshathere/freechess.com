import { WebSocket } from "ws";
import { Chess } from "chess.js"
import { GAME_OVER, init_game, MOVE } from "./messages1";
export class Game{
    public player1:WebSocket
    public player2:WebSocket
    private board:Chess
    private moves:string[]
    private startGame:Date
    private moves_length=0
    constructor(player1: WebSocket,player2 :WebSocket){
        this.player1=player1
        this.player2=player2
        this.moves=[]
        this.board=new Chess()
        this.startGame= new Date()
        this.player1.send(JSON.stringify({
            type:init_game,
            payload: {
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:init_game,
            payload: {
                color:"black"
            }
        }))
    }
    makeMove(socket:WebSocket , move:{
        from:string,
        to:string
    }){
        console.log(move)
        if(this.moves_length%2===0 && socket !==this.player1){
            console.log("early return 1")
            return;
        }
        if(this.moves_length%2===1 && socket !==this.player2){
            console.log("early return 2")
            return;
        }
        console.log("before the move")
        try{
            console.log(this.board)
            console.log(this.board.move)
            this.board.move(move)
            console.log("no error here")
        }catch(e){
            console.error(e)
            return;
        }
        console.log("after the move")
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn() == "w"? "black" : "White"
                }
            }))
            this.player2.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn() == "w"? "black" : "White"
                }
            }))
        }if(this.moves_length%2===0){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }else{
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        this.moves_length++;

    }
}