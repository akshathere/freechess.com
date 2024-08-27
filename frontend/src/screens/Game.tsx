import { useEffect, useState } from "react";
import Button from "../components/button";
import Chessboard from "../components/chessboard";
import useSocket from "../hooks/UseSocket";
import timer from "../assets/timer.png";
import { Chess } from "chess.js";
import BButton from "../components/bbutton";
import TimerClock from "../components/TimeClock";

const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER = "game_over";
/*eslint-disable*/
export default function Game() {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!socket) {
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message.type) {
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true);
                    console.log("game initialized");
                    break;
                case MOVE:
                    console.log(message.payload);
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("move made");
                    break;
                case GAME_OVER:
                    setChess(new Chess());
                    console.log("game over");
                    break;
            }
        };
    }, [socket]);

    if (!socket) {
        return <div>connecting......</div>;
    }

    return (
        <div className="bg-blacki min-h-screen">
            <div className="flex justify-center items-center h-full">
                <div className="pt-8 max-w-screen-lg w-full px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-white">
                        <div className="md:col-span-4">
                            <Chessboard
                                started={started}
                                chess={chess}
                                setBoard={setBoard}
                                board={board}
                                socket={socket}
                            />
                        </div>
                        <div className="md:col-span-2 flex flex-col items-center md:items-start">
                            <BButton onClick={() => console.log("do nothing")}>
                                <div className="flex px-4 lg:px-16">
                                    <img src={timer} className="w-40 lg:w-52" alt="timer" />
                                </div>
                            </BButton>
                            {!started && (
                                <Button
                                    onClick={() => {
                                        socket.send(
                                            JSON.stringify({
                                                type: INIT_GAME,
                                            })
                                        );
                                    }}
                                >
                                   <p className="text-2xl font-bold">Play</p> 
                                </Button>
                            )}
                            <TimerClock started={started}></TimerClock>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
