import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
/*eslint-disable*/
export default function Chessboard({
    chess,
    started,
    board,
    socket,
    setBoard,
}: {
    chess: any,
    started: boolean,
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
    setBoard: any
}) {
    const [from, setFrom] = useState<null | Square>(null);

    function DraggablePiece({ square, squareRepresentation }: {
        square: { square: Square; type: PieceSymbol; color: Color } | null;
        squareRepresentation: Square;
    }) {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: squareRepresentation,
            disabled: !started,  // Disable dragging if the game hasn't started
        });
        const style = transform ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        } : undefined;

        return (
            <div
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
                className="h-full justify-center flex flex-col"
            >
                {square ? (
                    <img
                        className="w-18"
                        src={`/${square?.color === "b"
                            ? square?.type.toUpperCase()
                            : `${square?.type?.toUpperCase()} copy`
                            }.png`}
                    />
                ) : null }
            </div>
        );
    }

    function DroppableSquare({ square, squareRepresentation }: {
        square: { square: Square; type: PieceSymbol; color: Color } | null;
        squareRepresentation: Square;
    }) {
        const { setNodeRef } = useDroppable({
            id: squareRepresentation,
            disabled: !started,  // Disable dropping if the game hasn't started
        });

        return (
            <div
                ref={setNodeRef}
                onDrop={() => {
                    if (started && from) {  // Only allow drop if the game has started
                        socket.send(JSON.stringify({
                            type: "move",
                            payload: {
                                move: {
                                    from,
                                    to: squareRepresentation
                                }
                            }
                        }));
                        chess.move({
                            from,
                            to: squareRepresentation
                        });
                        setBoard(chess.board());
                        setFrom(null);
                    } else if (started) {
                        setFrom(squareRepresentation);
                    }
                }}
                className={`w-20 h-20 ${(squareRepresentation.charCodeAt(0) + parseInt(squareRepresentation[1])) % 2 === 0 ? 'bg-red-600' : 'bg-black'} `}
            >
                <div className="w-full flex justify-center h-full">
                    <DraggablePiece square={square} squareRepresentation={squareRepresentation} />
                </div>
            </div>
        );
    }

    return (
        <DndContext onDragEnd={({ active, over }) => {
            if (started && over && active.id !== over.id) {  // Only process the drag end if the game has started
                setFrom(active.id as Square);
                const toSquare = over.id as Square;
                socket.send(JSON.stringify({
                    type: "move",
                    payload: {
                        move: {
                            from: active.id as Square,
                            to: toSquare
                        }
                    }
                }));
                chess.move({
                    from: active.id as Square,
                    to: toSquare
                });
                setBoard(chess.board());
            }
        }}>
            <div className="text-black">
                {board.map((row, i) => (
                    <div key={i} className="flex">
                        {row.map((square, j) => {
                            const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
                            return (
                                <DroppableSquare
                                    key={j}
                                    square={square}
                                    squareRepresentation={squareRepresentation}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </DndContext>
    );
}
