import { useNavigate } from "react-router-dom"
import chess from "../assets/chess.jpeg"
import hath from "../assets/hath.jpeg"
import Button from "../components/button";

export default function Landing(){
    const navigate=useNavigate();
    return <div className="bg-blacki h-screen">
        <div className="grid grid-cols-2 pt-16">
            <div className="pl-36 ">
                <img src={chess} className="w-5/6" ></img>
            </div>
            <div className="mr-60">
                <div className="text-white text-6xl font-bold justify-center">
                    <div className="flex  justify-center">Play Chess</div>
                    <div className="flex  justify-center">Online</div>
                    <div className="flex  justify-center">on the #1 Site!</div>  
                </div>
                <div className="pt-8 text-white">
                    <div className="flex">

                    
                    <div className="pr-10 pl-12"><b>14,423,172</b> Games Today</div>

                    <div><b>132,901</b> Playing Now</div>
                    </div>
                    <div className="ml-10 mt-10">
                        <Button onClick={()=>{
                            navigate("/game")
                        }}>
                            <div className="flex">
                            <img src={hath} className="w-16 pl-2"></img>
                            <div className="pl-2">
                                <div className="text-3xl font-bold">Play Online</div>
                                <div>Play with someone at your level</div>
                            </div>
                            </div>
                        </Button >
                    </div>
                </div>

            </div>
        </div>
        
    </div>
}