import { useNavigate } from "react-router-dom";
import chess from "../assets/chess.jpeg";
import hath from "../assets/hath.jpeg";
import Button from "../components/button";

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div className="bg-blacki min-h-screen flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16 px-4 sm:px-8">
                <div className="flex justify-center md:justify-end">
                    <img src={chess} className="w-3/4 md:w-5/6" alt="chess" />
                </div>
                <div className="text-white flex flex-col items-center md:items-start">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-center md:text-left">
                        <div>Play Chess</div>
                        <div>Online</div>
                        <div>on the #1 Site!</div>
                    </div>
                    <div className="pt-8 text-center md:text-left">
                        <div className="flex flex-col md:flex-row justify-center md:justify-start">
                            <div className="pr-0 md:pr-10">
                                <b>14,423,172</b> Games Today
                            </div>
                            <div>
                                <b>132,901</b> Playing Now
                            </div>
                        </div>
                        <div className="mt-10">
                            <Button onClick={() => navigate("/game")}>
                                <div className="flex items-center">
                                    <img src={hath} className="w-12 sm:w-16" alt="hath" />
                                    <div className="pl-4">
                                        <div className="text-xl sm:text-2xl md:text-3xl font-bold">Play Online</div>
                                        <div className="text-sm sm:text-base">Play with someone at your level</div>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
