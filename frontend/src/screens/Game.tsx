import { useEffect, useState } from "react";
import Button from "../components/button";
import Chessboard from "../components/chessboard";
import useSocket from "../hooks/UseSocket";
import {Chess} from "chess.js"
const init_game="init_game";
const MOVE="move"
const GAME_OVER="game_over"
//#ggs
/*eslint-disable*/
export default function Game(){
    const socket =useSocket()
    const [chess,setChess]=useState(new Chess())
    const [board,setBoard]=useState(chess.board())
    const [started,setStarted]=useState(false)
    useEffect(()=>{
        if(!socket){
            return
        }
        socket.onmessage=(event)=>{
            const message = JSON.parse(event.data)
            console.log(message)
            switch (message.type){
                case init_game:
                    setBoard(chess.board())
                    setStarted(true)
                    console.log("game initialized")
                    break
                case MOVE:
                    console.log(message.payload)
                    const move=message.payload;
                    chess.move(move)
                    setBoard(chess.board())
                    console.log("move made")
                    break;
                case GAME_OVER:
                    setChess(new Chess())
                    console.log("game over")
                    break;
            }

        }
    },[socket])
    if(!socket){
        return <div>
            connecting......
        </div>
    }

    return <div className="justify-center flex bg-blacki h-screen">
        <div className="pt-8 max-w-screen-lg">
            <div className="grid grid-cols-6 gap-4 text-white">
                <div className="col-span-4">
                    <Chessboard chess={chess} setBoard={setBoard} board={board} socket={socket}></Chessboard>
                </div>
                <div className="col-span-2">
                    {!started && <Button onClick={()=>{
                        socket.send(JSON.stringify({
                            type:init_game
                        }))
                    }}>
                        play
                    </Button>}
                </div>
            </div>
             
        </div>
    </div>
}