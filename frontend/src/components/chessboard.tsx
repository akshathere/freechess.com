import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
/*eslint-disable*/
// import B from "../assets/B copy.png"
// import K from "../assets/K copy.png"
// import R from "../assets/R copy.png"
// import N from "../assets/N copy.png"
// import Q from "../assets/Q copy.png"
// import P from "../assets/P copy.png"
// import b from "../assets/b.png"
// import k from "../assets/k.png"
// import r from "../assets/r.png"
// import n from "../assets/n.png"
// import q from "../assets/q.png"
// import p from "../assets/p.png"
export default function Chessboard({chess, board ,socket,setBoard}: {
    chess:any;
    board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null)[][],socket: WebSocket,setBoard: any,}) {
    const [to,setTo] =useState<null | Square>(null)
    const [from,setFrom] =useState<null | Square>(null)
    // setTo(null)
  return<div className="text-black">
        {board.map((row,i)=>{
            return <div key={i} className="flex ">
                {row.map((square,j)=>{
                    const squareRepresentation = String.fromCharCode(97+(j%8))+""+(8-i) as Square
                    return<div onClick={()=>{
                        if(!from){
                            setFrom(squareRepresentation)
                        }else{
                            socket.send(JSON.stringify({
                                type:"move",
                                payload:{
                                    move:{
                                        from,
                                        to:squareRepresentation
                                    }          
                                }
                            }))
                            setFrom(null)
                            chess.move({
                                from,
                                to:squareRepresentation
                            })
                            setBoard(chess.board())
                            setTo(squareRepresentation)
                            console.log({
                                from,
                                to
                            })
                               
                        }
                    }}
                    key={j} className={`w-20 h-20 ${(i+j)%2==0 ? 'bg-d-green' : 'bg-peach'} `}>
                        <div className="w-full flex justify-center  h-full">
                            <div className="h-full justify-center flex flex-col">
                                
                            {square ?  <img className="w-7"  src={`/${square?.color=== "b" ?
                            square?.type : `${square?.type?.toUpperCase()} copy`}.png`}/> : null}
                            </div>
                        </div>
                    </div>
                
                })}
                </div>
        })}
    </div>
  
}
