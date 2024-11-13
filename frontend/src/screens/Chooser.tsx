import k from "../assets/Sukuna (1).webp";
import g from "../assets/gojo.png";
// import c from "../assets/Chessboard.png";
import leftArrow from "../assets/left-arrow.png";  // Placeholder for left arrow image
import rightArrow from "../assets/right-arrow.webp"; // Placeholder for right arrow image

export default function Component() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-red-600 animate-slide-down" />
        <div className="w-1/2 bg-black animate-slide-up" />
      </div>

      {/* Foreground Animation with Gojo, Sukuna, and Chessboard */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* "Choose Your Character" Text with Arrows */}
          <div className="flex items-center justify-center mb-5">
            <img src={leftArrow} alt="Left Arrow" className=" h-10 w-10 mr-2" />
            <span className="text-4xl font-semibold text-[#ECECD0] tracking-wider">
             <span className="text-red-600"><span className="text-black">Choose You</span>r Character</span> 
            </span>
            <img src={rightArrow} alt="Right Arrow" className="h-10 w-10 ml-2" />
          </div>

          {/* "Let's Play" Background Text */}
          <div className="absolute inset-0 flex items-center justify-center text-8xl font-bold text-white opacity-20 pointer-events-none">
            <span className="bg-[#779557] px-4">Let's</span>
            <span className="bg-[#ECECD0] text-[#779557] px-4">Play</span>
            
          </div>
          
          {/* Character Selection Images */}
          <div className="flex items-center justify-center space-x-10">
            {/* Gojo */}
            <div>
              <a href="/game" className="block animate-GojoEnter">
                <img
                  src={k}
                  alt="Sukuna"
                  className="h-86 w-80 object-contain relative z-10 transform transition-transform duration-300 hover:scale-110"
                />
              </a>
            </div>

            {/* Sukuna */}
            <div>
              <a href="/game" className="block animate-SukunaEnter">
                <img
                  src={g}
                  alt="Gojo"
                  className="h-86 w-80 object-contain relative z-10 transform transition-transform duration-300 hover:scale-110"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
