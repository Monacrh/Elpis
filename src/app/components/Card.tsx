import React, { useState } from "react";
import { MapPin } from "lucide-react";
import router from "next/router";
import Image from "next/image";


export default function Card() {
  const [hover, setHover] = useState(false);


  return (
    <div
      className={`w-[320px] h-[320px] bg-white rounded-[32px] p-[3px] relative shadow-[0_70px_30px_-50px_#604b4a30] transition-all duration-500 ease-in-out border-4 border-green-500 ${
        hover ? "rounded-tl-[55px]" : ""
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
  
      {/* Profile Picture */}
      <div
        className={`absolute top-[3px] left-[3px] transition-all duration-500 ease-in-out z-[1] overflow-hidden border-solid ${
            hover
            ? "w-[120px] h-[120px] top-[15px] left-[15px] border-[7px] rounded-full z-[3] border-[#A0C878] shadow-[0_5px_5px_rgba(96,75,74,0.19)]"
            : "w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-[29px] border-0"
        }`}
        >
        <Image
            src="/food.jpg"
            alt="food"
            fill
            className={`object-cover transition-transform duration-700 ${
            hover ? "scale-110 translate-y-[-10%]" : "scale-100"
            }`}
        />
        </div>


      {/* Bottom Section */}
      <div
        className={`absolute left-[3px] right-[3px] bottom-[3px] bg-gradient-to-br from-green-500 to-emerald-600 rounded-[29px] shadow-inner overflow-hidden z-[2] transition-all duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)] ${
          hover ? "top-[15%] rounded-tl-[80px]" : "top-[75%]"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        
        <div className="absolute bottom-0 left-6 right-6 h-[200px] flex flex-col justify-between py-4">
          <div className="space-y-2">
            <span className="block text-white font-bold text-xl tracking-wide mt-2">Sandwich</span>
            {/* <span className="block text-white/90 text-sm leading-relaxed">
              Passionate designer crafting peaceful digital spaces.
            </span> */}
          </div>

          {/* Expandable Content */}
          <div className={`space-y-3 transition-all duration-500 ${
            hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}>
            <div className="grid grid-cols-2 gap-3 text-white/80 text-xs">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <span className="block font-medium text-white">Rating</span>
                <span>4/5</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <span className="block font-medium text-white">Price</span>
                <span>9.00</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="text-sm hover:text-white transition-colors cursor-pointer">
                  Indonesia
                </span>
              </div>
              <span className="text-white text-sm font-medium hover:text-green-200 transition-colors cursor-pointer">
                Sandwich
              </span>
            </div>

            <button 
            // navigate(`/petdetail/${pet.id}`);
            onClick={() => router.push("/petdetail")}
            className={`bg-white text-green-600 px-5 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg text-sm ${
              hover 
                ? "bg-yellow-200 text-green-800 transform scale-105 shadow-xl hover:shadow-2xl" 
                : "hover:bg-green-50 hover:scale-105"
            }`}>
              Buy
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className={`absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full transition-all duration-500 ${
        hover ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}></div>
      <div className={`absolute top-8 left-8 w-2 h-2 bg-emerald-300 rounded-full transition-all duration-700 delay-100 ${
        hover ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}></div>
    </div>
  );
}