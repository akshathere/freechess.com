import k from "../assets/Sukuna (1).webp";
import g from "../assets/gojo.png";
import c from "../assets/Chessboard.png";

export default function Component() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Animation */}
      {/* Chessboard Animation */}
      <div>
              <img
                src={c}
                alt="Chessboard"
                className="h-100 w-100 object-contain animate-ChessboardEnter"
              />
      </div>
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-red-600 animate-slide-down" />
        <div className="w-1/2 bg-black animate-slide-up" />
      </div>

      {/* Foreground Animation with Gojo, Sukuna, and Chessboard */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute bg-chessboard inset-0 flex items-center justify-center text-8xl font-bold text-white opacity-20 pointer-events-none">
            <span className="bg-[#779557] px-4">Let's</span>
            <span className="bg-[#ECECD0] text-[#779557] px-4">Play</span>
          </div>

          <div className="flex items-center justify-center space-x-10">
            {/* Gojo */}
            <div>
              <a href="/signup" className="block animate-GojoEnter">
                <img
                  src={k}
                  alt="Sukuna"
                  className="h-86 w-80 object-contain relative z-10"
                />
              </a>
            </div>

            

            {/* Sukuna */}
            <div>
              <a href="/signup" className="block animate-SukunaEnter">
                <img
                  src={g}
                  alt="Gojo"
                  className="h-86 w-80 object-contain relative z-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
