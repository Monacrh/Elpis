'use client'

import React, { useState } from "react";
import { MapPin, Clock, DollarSign, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Task, Food } from "../../types/types"; // Import tipe data baru

type CardType = 'task' | 'food';

interface CardProps {
  type: CardType;
  data: Task | Food;
}

export default function UnifiedCard({ type, data }: CardProps) {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const isTask = type === 'task';
  const taskData = isTask ? (data as Task) : null;
  const foodData = !isTask ? (data as Food) : null;

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>

      <div
        className="relative transition-all duration-500"
        style={{
          width: '300px',
          height: '300px',
          fontFamily: '"Press Start 2P", cursive',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Main Card Container */}
        <div
          className="relative w-full h-full overflow-hidden transition-all duration-500"
          style={{
            backgroundColor: 'white',
            border: '4px solid #2D3748',
            borderTopLeftRadius: hover ? '50px' : '0px',
            boxShadow: hover ? '8px 8px 0 rgba(0,0,0,0.25)' : '6px 6px 0 rgba(0,0,0,0.15)',
          }}
        >
          {/* Icon/Image Section - Moves to top-left on hover */}
          <div
            className="absolute overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              top: hover ? '16px' : '4px',
              left: hover ? '16px' : '4px',
              width: hover ? '100px' : 'calc(100% - 8px)',
              height: hover ? '100px' : 'calc(100% - 8px)',
              border: hover ? '4px solid #2D3748' : 'none',
              borderRadius: hover ? '50%' : '0px',
              background: isTask 
                ? 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 100%)'
                : 'linear-gradient(135deg, #6BCF7F 0%, #4A90E2 100%)',
              zIndex: hover ? 3 : 1,
              boxShadow: hover ? '4px 4px 0 rgba(0,0,0,0.2)' : 'none',
            }}
          >
            {/* Pixel Icon */}
            <div 
              className="absolute top-1/2 left-1/2 transition-all duration-500"
              style={{
                width: hover ? '60px' : '120px',
                height: hover ? '60px' : '120px',
                transform: 'translate(-50%, -50%)',
                backgroundImage: isTask ? taskData?.icon : foodData?.icon,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                imageRendering: 'pixelated',
              }}
            />
          </div>

          {/* Content Section - Expands on hover */}
          <div
            className="absolute transition-all duration-500 ease-in-out overflow-hidden"
            style={{
              left: '4px',
              right: '4px',
              bottom: '4px',
              top: hover ? '16px' : '75%',
              background: isTask 
                ? 'linear-gradient(to bottom right, #FF8C42, #FFD93D)'
                : 'linear-gradient(to bottom right, #6BCF7F, #4A90E2)',
              border: '4px solid #2D3748',
              borderTopLeftRadius: hover ? '80px' : '0px',
              zIndex: 2,
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end h-full">
              {/* Title */}
              <div className="mb-3">
                <h3
                  className="text-white font-bold leading-tight"
                  style={{
                    fontSize: '14px',
                    textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                  }}
                >
                  {isTask ? taskData?.title : foodData?.name}
                </h3>
              </div>

              {/* Info Grid - Shows on hover */}
              <div
                className="transition-all duration-500"
                style={{
                  opacity: hover ? 1 : 0,
                  transform: hover ? 'translateY(0)' : 'translateY(10px)',
                }}
              >
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {isTask && taskData && (
                    <>
                      <div 
                        className="p-2"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <DollarSign size={10} color="white" />
                        </div>
                        <span className="text-white text-[8px] block">
                          {taskData.reward}
                        </span>
                      </div>
                      <div 
                        className="p-2"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <Clock size={10} color="white" />
                        </div>
                        <span className="text-white text-[8px] block">
                          {taskData.duration}
                        </span>
                      </div>
                    </>
                  )}

                  {!isTask && foodData && (
                    <>
                      <div 
                        className="p-2"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        <span className="text-white text-[7px] block mb-1">PRICE</span>
                        <span className="text-white text-[10px] font-bold block">
                          ${foodData.price}
                        </span>
                      </div>
                      <div 
                        className="p-2"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <Star size={10} color="white" fill="white" />
                        </div>
                        <span className="text-white text-[8px] block">
                          {foodData.rating}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Location & Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-white/90">
                  <MapPin size={12} />
                  <span style={{ fontSize: '8px' }}>
                    {isTask ? taskData?.location : foodData?.location}
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (isTask && taskData) {
                      router.push(`/task/${taskData._id}`);
                    } else if (foodData) {
                      router.push(`/food/${foodData._id}`);
                    }
                  }}
                  className="px-4 py-2 font-bold transition-all duration-300"
                  style={{
                    backgroundColor: hover ? '#FFD93D' : 'white',
                    color: isTask ? '#FF8C42' : '#6BCF7F',
                    border: '3px solid rgba(255, 255, 255, 0.5)',
                    fontSize: '8px',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
                    transform: hover ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {isTask ? 'VIEW' : 'BUY'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Pixel Decorations */}
        <div
          className="absolute transition-all duration-500"
          style={{
            top: '12px',
            left: '12px',
            width: '8px',
            height: '8px',
            backgroundColor: isTask ? '#FFD93D' : '#4A90E2',
            opacity: hover ? 1 : 0,
            transform: hover ? 'scale(1)' : 'scale(0)',
          }}
        />
        <div
          className="absolute transition-all duration-700"
          style={{
            top: '24px',
            left: '24px',
            width: '6px',
            height: '6px',
            backgroundColor: isTask ? '#FF8C42' : '#6BCF7F',
            opacity: hover ? 1 : 0,
            transform: hover ? 'scale(1)' : 'scale(0)',
            transitionDelay: '100ms',
          }}
        />
      </div>
    </>
  );
}