import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Task, Food } from '../../types/types';

type CardType = 'task' | 'food';

interface CardProps {
  type: CardType;
  data: Task | Food;
}

export default function UnifiedCard({ type, data }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const isTask = type === 'task';
  const taskData = isTask ? (data as Task) : null;
  const foodData = !isTask ? (data as Food) : null;

  // Fungsi untuk handle klik card
  const handleCardClick = () => {
    if (isTask && taskData && taskData._id) {
      router.push(`/task/${taskData._id}`);
    } else if (foodData && foodData._id) {
      router.push(`/food/${foodData._id}`);
    }
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>

      <div
        className="relative transition-all duration-300 cursor-pointer"
        style={{
          width: '320px',
          height: '320px',
          fontFamily: '"Press Start 2P", cursive',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick} // Tambahkan onClick di sini
      >
        {/* Pixel Decorations */}
        {isHovered && (
          <>
            <div
              className="absolute transition-all duration-300"
              style={{
                top: '12px',
                right: '60px',
                width: '10px',
                height: '10px',
                background: isTask ? '#FFD93D' : '#4A90E2',
              }}
            />
            <div
              className="absolute transition-all duration-300"
              style={{
                top: '20px',
                left: '12px',
                width: '10px',
                height: '10px',
                background: isTask ? '#FF8C42' : '#6BCF7F',
              }}
            />
          </>
        )}

        {/* Main Card */}
        <div
          className="relative w-full h-full transition-all duration-300"
          style={{
            background: '#FFF8F0',
            border: '4px solid #2D3748',
            boxShadow: isHovered ? '12px 12px 0 rgba(0,0,0,0.3)' : '8px 8px 0 rgba(0,0,0,0.25)',
            transform: isHovered ? 'translate(-2px, -2px)' : 'translate(0, 0)',
          }}
        >
          {/* Image/Icon Area */}
          <div
            className="absolute transition-all duration-400 overflow-hidden"
            style={{
              width: isHovered ? '100px' : 'calc(100% - 8px)',
              height: isHovered ? '100px' : 'calc(100% - 8px)',
              top: isHovered ? '16px' : '4px',
              left: isHovered ? '16px' : '4px',
              border: isHovered ? '4px solid #2D3748' : 'none',
              background: isTask 
                ? 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 100%)'
                : 'linear-gradient(135deg, #6BCF7F 0%, #4A90E2 100%)',
              zIndex: isHovered ? 3 : 1,
              boxShadow: isHovered ? '4px 4px 0 rgba(0,0,0,0.2)' : 'none',
            }}
          >
            {/* HD Image dengan kualitas tinggi */}
            <div 
              className="w-full h-full transition-all duration-400"
              style={{
                backgroundImage: `url(${isTask ? taskData?.images?.[0] : foodData?.images?.[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                imageRendering: 'auto',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          </div>

          {/* Bottom Section */}
          <div
            className="absolute transition-all duration-400 overflow-hidden"
            style={{
              left: '4px',
              right: '4px',
              bottom: '4px',
              top: isHovered ? '30%' : '70%',
              background: isTask 
                ? 'linear-gradient(to bottom right, #FF8C42, #FFD93D)'
                : 'linear-gradient(to bottom right, #6BCF7F, #4A90E2)',
              border: '3px solid #2D3748',
              zIndex: 2,
              boxShadow: 'inset 0 3px 0 rgba(0,0,0,0.1)',
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 h-full flex flex-col justify-end">
              {/* Title - Lebih Besar */}
              <div className="mb-3">
                <h3
                  className="text-white font-bold"
                  style={{
                    fontSize: '12px',
                    textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                    lineHeight: '1.4',
                    marginBottom: '8px',
                  }}
                >
                  {isTask ? taskData?.title : foodData?.name}
                </h3>
              </div>

              {/* Info Grid - Shows on hover */}
              <div
                className="transition-all duration-400"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                  marginBottom: '12px',
                }}
              >
                <div className="grid grid-cols-2 gap-2">
                  {isTask && taskData && (
                    <>
                      <div
                        className="p-2 text-center"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <DollarSign size={12} color="white" />
                        </div>
                        <span className="text-white text-[10px] font-bold block">
                          {taskData.reward}
                        </span>
                      </div>
                      <div
                        className="p-2 text-center"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock size={12} color="white" />
                        </div>
                        <span className="text-white text-[10px] font-bold block">
                          {taskData.duration}
                        </span>
                      </div>
                    </>
                  )}

                  {!isTask && foodData && (
                    <>
                      <div
                        className="p-2 text-center"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <span className="text-white text-[8px] block mb-1">PRICE</span>
                        <span className="text-white text-[12px] font-bold block">
                          ${foodData.price}
                        </span>
                      </div>
                      <div
                        className="p-2 text-center"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star size={12} color="white" fill="white" />
                        </div>
                        <span className="text-white text-[10px] font-bold block">
                          {foodData.rating}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Location & Button - Lebih Besar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin size={14} />
                  <span style={{ fontSize: '8px', fontWeight: 'bold' }}>
                    {isTask ? taskData?.location : foodData?.location}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Mencegah event bubbling ke parent
                    handleCardClick();
                  }}
                  className="px-4 py-2 font-bold transition-all duration-200"
                  style={{
                    backgroundColor: 'white',
                    color: isTask ? '#FF8C42' : '#6BCF7F',
                    border: '3px solid rgba(255, 255, 255, 0.5)',
                    fontSize: '8px',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isTask ? '#FFD93D' : '#4A90E2';
                    e.currentTarget.style.color = '#2D3748';
                    e.currentTarget.style.transform = 'translate(2px, 2px)';
                    e.currentTarget.style.boxShadow = '1px 1px 0 rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = isTask ? '#FF8C42' : '#6BCF7F';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0,0,0,0.2)';
                  }}
                >
                  {isTask ? 'VIEW TASK' : 'BUY NOW'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}