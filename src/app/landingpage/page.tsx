"use client"

import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {/* Hero Section with Pixel Art Style */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Animated Pixel GIF Background */}
        <div className="absolute inset-0">
          {/* Option 1: Using GIF (uncomment when you have the GIF) */}
          {/* <Image
            src="/hero-banner.gif"
            alt="Pixel Art Hero"
            fill
            className="object-cover"
            style={{ imageRendering: "pixelated" }}
            priority
          /> */}
          
          {/* Option 2: Temporary gradient with pixel effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 50%, #4A90E2 100%)',
              imageRendering: 'pixelated',
            }}
          />
          
          {/* Pixel Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '8px 8px',
            }}
          />
        </div>

        {/* Pixel Art Clouds (Floating Animation) */}
        <div className="absolute top-20 left-10 animate-float">
          <div 
            className="w-32 h-16"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='64'%3E%3Crect x='32' y='24' width='8' height='8' fill='%23fff'/%3E%3Crect x='40' y='16' width='8' height='8' fill='%23fff'/%3E%3Crect x='48' y='8' width='24' height='8' fill='%23fff'/%3E%3Crect x='72' y='16' width='8' height='8' fill='%23fff'/%3E%3Crect x='80' y='24' width='8' height='8' fill='%23fff'/%3E%3Crect x='24' y='32' width='64' height='16' fill='%23fff'/%3E%3C/svg%3E")`,
              backgroundSize: 'contain',
              imageRendering: 'pixelated',
              opacity: 0.8,
            }}
          />
        </div>
        
        <div className="absolute top-40 right-20 animate-float-delayed">
          <div 
            className="w-24 h-12"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='48'%3E%3Crect x='24' y='16' width='8' height='8' fill='%23fff'/%3E%3Crect x='32' y='8' width='24' height='8' fill='%23fff'/%3E%3Crect x='56' y='16' width='8' height='8' fill='%23fff'/%3E%3Crect x='16' y='24' width='56' height='16' fill='%23fff'/%3E%3C/svg%3E")`,
              backgroundSize: 'contain',
              imageRendering: 'pixelated',
              opacity: 0.7,
            }}
          />
        </div>

        {/* Pixel Art Sign In Button */}
        <div className="absolute top-6 right-10 z-20">
          <button
            onClick={() => router.push("/signin")}
            className="px-6 py-3 text-sm font-bold transition-all duration-150 pixel-button"
            style={{
              backgroundColor: 'white',
              color: '#FF8C42',
              border: '4px solid #FF8C42',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
              imageRendering: 'pixelated',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '10px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FF8C42';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translate(2px, 2px)';
              e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = '#FF8C42';
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.2)';
            }}
          >
            SIGN IN
          </button>
        </div>

        {/* Hero Content with Pixel Art Style */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-8 max-w-4xl">
            {/* Pixel Art Sunrise Icon */}
            <div className="mb-8 flex justify-center">
              <div 
                className="w-32 h-32"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3C!-- Sun --%3E%3Crect x='56' y='8' width='16' height='8' fill='%23FFD93D'/%3E%3Crect x='48' y='16' width='32' height='8' fill='%23FFD93D'/%3E%3Crect x='40' y='24' width='48' height='8' fill='%23FFD93D'/%3E%3Crect x='32' y='32' width='64' height='8' fill='%23FFD93D'/%3E%3Crect x='24' y='40' width='80' height='8' fill='%23FF8C42'/%3E%3Crect x='24' y='48' width='80' height='8' fill='%23FF8C42'/%3E%3Crect x='32' y='56' width='64' height='8' fill='%23FF8C42'/%3E%3Crect x='40' y='64' width='48' height='8' fill='%23FF8C42'/%3E%3C!-- Rays --%3E%3Crect x='8' y='32' width='8' height='8' fill='%23FFD93D'/%3E%3Crect x='112' y='32' width='8' height='8' fill='%23FFD93D'/%3E%3Crect x='16' y='16' width='8' height='8' fill='%23FFD93D'/%3E%3Crect x='104' y='16' width='8' height='8' fill='%23FFD93D'/%3E%3C!-- Ground --%3E%3Crect x='0' y='72' width='128' height='8' fill='%234A90E2'/%3E%3Crect x='0' y='80' width='128' height='48' fill='%236BCF7F'/%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  imageRendering: 'pixelated',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                }}
              />
            </div>

            <h1 
              className="text-7xl font-bold mb-6 text-white"
              style={{
                fontFamily: '"Press Start 2P", cursive',
                textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                imageRendering: 'pixelated',
              }}
            >
              ELPIS
            </h1>
            <h2 
              className="text-2xl font-bold mb-6 text-white"
              style={{
                fontFamily: '"Press Start 2P", cursive',
                textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                lineHeight: '1.8',
              }}
            >
              HOPE THROUGH WORK
            </h2>
            <p 
              className="text-base leading-loose mb-10 text-white max-w-2xl mx-auto"
              style={{
                fontFamily: '"Press Start 2P", cursive',
                textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                fontSize: '12px',
                lineHeight: '2',
              }}
            >
              One hour of work.<br/>
              Endless hope.<br/>
              Join the movement!
            </p>
            
            {/* Pixel CTA Buttons */}
            <div className="flex gap-6 justify-center flex-wrap">
              <button 
                className="px-8 py-4 font-bold transition-all duration-150"
                style={{
                  backgroundColor: '#FF8C42',
                  color: 'white',
                  border: '4px solid #E67A30',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.3)',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '12px',
                  imageRendering: 'pixelated',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(3px, 3px)';
                  e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.3)';
                }}
              >
                START NOW
              </button>
              <button 
                className="px-8 py-4 font-bold transition-all duration-150"
                style={{
                  backgroundColor: 'white',
                  color: '#FF8C42',
                  border: '4px solid white',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.3)',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '12px',
                  imageRendering: 'pixelated',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(3px, 3px)';
                  e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.3)';
                }}
              >
                LEARN MORE
              </button>
            </div>

            {/* Pixel Arrow Down */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div 
                className="w-8 h-8"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect x='12' y='8' width='8' height='8' fill='white'/%3E%3Crect x='8' y='16' width='16' height='8' fill='white'/%3E%3Crect x='4' y='24' width='24' height='8' fill='white'/%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  imageRendering: 'pixelated',
                }}
              />
            </div>
          </div>
        </div>

        {/* Add Google Font for Pixel Font */}
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* How It Works Section - Pixel Style */}
      <main className="pt-20 px-6 pb-16" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p 
              className="text-lg mb-4 font-bold"
              style={{ 
                color: '#FFD93D',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '12px',
              }}
            >
              HOW IT WORKS
            </p>
            <h2 
              className="text-4xl font-bold"
              style={{ 
                color: '#2D3748',
                fontFamily: '"Press Start 2P", cursive',
                lineHeight: '1.6',
              }}
            >
              3 SIMPLE STEPS
            </h2>
          </div>

          {/* Pixel Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {/* Card 1 */}
            <div 
              className="p-8 transition-all duration-150"
              style={{
                backgroundColor: 'white',
                border: '4px solid #FF8C42',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
                imageRendering: 'pixelated',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                e.currentTarget.style.boxShadow = '12px 12px 0 rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.1)';
              }}
            >
              <div 
                className="w-16 h-16 mb-6"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect x='24' y='8' width='16' height='8' fill='%23FF8C42'/%3E%3Crect x='16' y='16' width='32' height='8' fill='%23FF8C42'/%3E%3Crect x='8' y='24' width='48' height='8' fill='%23FF8C42'/%3E%3Crect x='8' y='32' width='8' height='8' fill='%23FF8C42'/%3E%3Crect x='48' y='32' width='8' height='8' fill='%23FF8C42'/%3E%3Crect x='8' y='40' width='48' height='8' fill='%23FF8C42'/%3E%3Crect x='16' y='48' width='32' height='8' fill='%23FF8C42'/%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  imageRendering: 'pixelated',
                }}
              />
              <h3 
                className="text-xl font-bold mb-4"
                style={{ 
                  color: '#2D3748',
                  fontFamily: '"Press Start 2P", cursive',
                  lineHeight: '1.6',
                }}
              >
                FIND TASKS
              </h3>
              <p 
                className="text-gray-600 leading-relaxed"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '10px',
                  lineHeight: '1.8',
                }}
              >
                Browse nearby 1-hour tasks. Walk dogs, wash cars, help neighbors!
              </p>
            </div>

            {/* Card 2 */}
            <div 
              className="p-8 transition-all duration-150"
              style={{
                backgroundColor: 'white',
                border: '4px solid #4A90E2',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
                imageRendering: 'pixelated',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                e.currentTarget.style.boxShadow = '12px 12px 0 rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.1)';
              }}
            >
              <div 
                className="w-16 h-16 mb-6"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect x='16' y='24' width='8' height='24' fill='%234A90E2'/%3E%3Crect x='24' y='16' width='8' height='8' fill='%234A90E2'/%3E%3Crect x='32' y='8' width='8' height='16' fill='%234A90E2'/%3E%3Crect x='40' y='24' width='8' height='24' fill='%234A90E2'/%3E%3Crect x='8' y='48' width='48' height='8' fill='%234A90E2'/%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  imageRendering: 'pixelated',
                }}
              />
              <h3 
                className="text-xl font-bold mb-4"
                style={{ 
                  color: '#2D3748',
                  fontFamily: '"Press Start 2P", cursive',
                  lineHeight: '1.6',
                }}
              >
                WORK HARD
              </h3>
              <p 
                className="text-gray-600 leading-relaxed"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '10px',
                  lineHeight: '1.8',
                }}
              >
                Complete tasks with pride. Each hour brings you closer to your goals!
              </p>
            </div>

            {/* Card 3 */}
            <div 
              className="p-8 transition-all duration-150"
              style={{
                backgroundColor: 'white',
                border: '4px solid #6BCF7F',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.1)',
                imageRendering: 'pixelated',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                e.currentTarget.style.boxShadow = '12px 12px 0 rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.1)';
              }}
            >
              <div 
                className="w-16 h-16 mb-6"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect x='20' y='16' width='24' height='8' fill='%236BCF7F'/%3E%3Crect x='12' y='24' width='40' height='8' fill='%236BCF7F'/%3E%3Crect x='8' y='32' width='48' height='8' fill='%236BCF7F'/%3E%3Crect x='12' y='40' width='40' height='8' fill='%236BCF7F'/%3E%3Crect x='20' y='48' width='24' height='8' fill='%236BCF7F'/%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  imageRendering: 'pixelated',
                }}
              />
              <h3 
                className="text-xl font-bold mb-4"
                style={{ 
                  color: '#2D3748',
                  fontFamily: '"Press Start 2P", cursive',
                  lineHeight: '1.6',
                }}
              >
                GET REWARDS
              </h3>
              <p 
                className="text-gray-600 leading-relaxed"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '10px',
                  lineHeight: '1.8',
                }}
              >
                Earn food, money, or both. Redeem at partner restaurants!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Pixel Stats Section */}
      <section 
        className="py-20"
        style={{
          background: 'linear-gradient(90deg, #4A90E2 0%, #FF8C42 100%)',
          borderTop: '8px solid #2D3748',
          borderBottom: '8px solid #2D3748',
        }}
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
            <div>
              <h2 
                className="text-5xl font-bold mb-4"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                }}
              >
                1247
              </h2>
              <p 
                className="text-lg font-medium"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '12px',
                }}
              >
                TASKS DONE
              </p>
            </div>
            <div>
              <h2 
                className="text-5xl font-bold mb-4"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                }}
              >
                584
              </h2>
              <p 
                className="text-lg font-medium"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '12px',
                }}
              >
                WORKERS
              </p>
            </div>
            <div>
              <h2 
                className="text-5xl font-bold mb-4"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                }}
              >
                2.8K
              </h2>
              <p 
                className="text-lg font-medium"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '12px',
                }}
              >
                FOOD SAVED
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}