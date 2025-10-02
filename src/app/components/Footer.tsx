// src/components/Footer.tsx
'use client'

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      {/* Add Pixel Font */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>

      <footer 
        className="text-white py-16"
        style={{
          backgroundColor: '#2D3748',
          borderTop: '8px solid #FF8C42',
          fontFamily: '"Press Start 2P", cursive',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Logo & Description */}
            <div className="md:col-span-1">
              {/* Pixel Art Logo */}
              <div className="mb-6">
                <div 
                  className="w-24 h-24 mb-4"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3C!-- Sun --%3E%3Crect x='42' y='8' width='12' height='6' fill='%23FFD93D'/%3E%3Crect x='36' y='14' width='24' height='6' fill='%23FFD93D'/%3E%3Crect x='30' y='20' width='36' height='6' fill='%23FFD93D'/%3E%3Crect x='24' y='26' width='48' height='6' fill='%23FF8C42'/%3E%3Crect x='24' y='32' width='48' height='6' fill='%23FF8C42'/%3E%3Crect x='30' y='38' width='36' height='6' fill='%23FF8C42'/%3E%3C!-- Ground --%3E%3Crect x='0' y='50' width='96' height='6' fill='%234A90E2'/%3E%3Crect x='0' y='56' width='96' height='40' fill='%236BCF7F'/%3E%3C/svg%3E")`,
                    backgroundSize: 'contain',
                    imageRendering: 'pixelated',
                  }}
                />
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ 
                    color: '#FF8C42',
                    fontSize: '16px',
                    lineHeight: '1.6',
                  }}
                >
                  ELPIS
                </h3>
              </div>
              <p 
                className="text-gray-400 leading-relaxed"
                style={{
                  fontSize: '8px',
                  lineHeight: '1.8',
                }}
              >
                Building hope through community work since 2025.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 
                className="font-bold mb-6"
                style={{
                  color: '#FFD93D',
                  fontSize: '12px',
                }}
              >
                QUICK LINKS
              </h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a 
                    href="/home" 
                    className="hover:text-white transition duration-200 flex items-center gap-2"
                    style={{ fontSize: '10px' }}
                  >
                    <span style={{ color: '#FF8C42' }}>▸</span> Home
                  </a>
                </li>
                <li>
                  <a 
                    href="/tasks" 
                    className="hover:text-white transition duration-200 flex items-center gap-2"
                    style={{ fontSize: '10px' }}
                  >
                    <span style={{ color: '#FF8C42' }}>▸</span> Find Tasks
                  </a>
                </li>
                <li>
                  <a 
                    href="/food" 
                    className="hover:text-white transition duration-200 flex items-center gap-2"
                    style={{ fontSize: '10px' }}
                  >
                    <span style={{ color: '#FF8C42' }}>▸</span> Food Partners
                  </a>
                </li>
                <li>
                  <a 
                    href="/profile" 
                    className="hover:text-white transition duration-200 flex items-center gap-2"
                    style={{ fontSize: '10px' }}
                  >
                    <span style={{ color: '#FF8C42' }}>▸</span> Profile
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h4 
                className="font-bold mb-6"
                style={{
                  color: '#FFD93D',
                  fontSize: '12px',
                }}
              >
                RESOURCES
              </h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition duration-200 flex items-center gap-2"
                    style={{ fontSize: '10px' }}
                  >
                    <span style={{ color: '#4A90E2' }}>▸</span> How It Works
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition duration-200 flex items-center gap-2"
                    style={{ fontSize: '10px' }}
                  >
                    <span style={{ color: '#4A90E2' }}>▸</span> FAQs
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition duration-200 flex items-center gap-2"
                    style={{ fontSize: '10px' }}
                  >
                    <span style={{ color: '#4A90E2' }}>▸</span> Community Guide
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="hover:text-white transition duration-200 flex items-center gap-2"
                    style={{ fontSize: '10px' }}
                  >
                    <span style={{ color: '#4A90E2' }}>▸</span> Blog
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Connect & Newsletter */}
            <div>
              <h4 
                className="font-bold mb-6"
                style={{
                  color: '#FFD93D',
                  fontSize: '12px',
                }}
              >
                CONNECT
              </h4>
              
              {/* Pixel Social Icons */}
              <div className="flex space-x-4 mb-8">
                {/* Facebook - Pixel */}
                <a 
                  href="#" 
                  className="transition duration-200 hover:opacity-80"
                >
                  <div 
                    className="w-10 h-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='8' y='4' width='24' height='4' fill='%234A90E2'/%3E%3Crect x='4' y='8' width='32' height='4' fill='%234A90E2'/%3E%3Crect x='4' y='12' width='32' height='4' fill='%234A90E2'/%3E%3Crect x='16' y='16' width='4' height='4' fill='%232D3748'/%3E%3Crect x='20' y='16' width='12' height='4' fill='%234A90E2'/%3E%3Crect x='16' y='20' width='8' height='4' fill='%234A90E2'/%3E%3Crect x='16' y='24' width='8' height='4' fill='%234A90E2'/%3E%3Crect x='16' y='28' width='8' height='4' fill='%234A90E2'/%3E%3Crect x='4' y='32' width='32' height='4' fill='%234A90E2'/%3E%3Crect x='8' y='36' width='24' height='4' fill='%234A90E2'/%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      imageRendering: 'pixelated',
                    }}
                  />
                </a>
                
                {/* Twitter - Pixel */}
                <a 
                  href="#" 
                  className="transition duration-200 hover:opacity-80"
                >
                  <div 
                    className="w-10 h-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='8' y='8' width='4' height='4' fill='%234A90E2'/%3E%3Crect x='12' y='12' width='4' height='4' fill='%234A90E2'/%3E%3Crect x='16' y='16' width='4' height='4' fill='%234A90E2'/%3E%3Crect x='20' y='12' width='4' height='4' fill='%234A90E2'/%3E%3Crect x='24' y='8' width='8' height='4' fill='%234A90E2'/%3E%3Crect x='16' y='20' width='4' height='4' fill='%234A90E2'/%3E%3Crect x='12' y='24' width='4' height='4' fill='%234A90E2'/%3E%3Crect x='8' y='28' width='4' height='4' fill='%234A90E2'/%3E%3Crect x='20' y='24' width='4' height='4' fill='%234A90E2'/%3E%3Crect x='24' y='28' width='8' height='4' fill='%234A90E2'/%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      imageRendering: 'pixelated',
                    }}
                  />
                </a>
                
                {/* Instagram - Pixel */}
                <a 
                  href="#" 
                  className="transition duration-200 hover:opacity-80"
                >
                  <div 
                    className="w-10 h-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='8' y='4' width='24' height='4' fill='%234A90E2'/%3E%3Crect x='4' y='8' width='4' height='24' fill='%234A90E2'/%3E%3Crect x='32' y='8' width='4' height='24' fill='%234A90E2'/%3E%3Crect x='12' y='12' width='16' height='4' fill='%234A90E2'/%3E%3Crect x='12' y='24' width='16' height='4' fill='%234A90E2'/%3E%3Crect x='12' y='16' width='4' height='8' fill='%234A90E2'/%3E%3Crect x='24' y='16' width='4' height='8' fill='%234A90E2'/%3E%3Crect x='8' y='32' width='24' height='4' fill='%234A90E2'/%3E%3Crect x='28' y='8' width='4' height='4' fill='%23FF8C42'/%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      imageRendering: 'pixelated',
                    }}
                  />
                </a>
              </div>
              
              {/* Newsletter - Pixel Style */}
              <div>
                <h4 
                  className="font-bold mb-4"
                  style={{
                    fontSize: '10px',
                    color: '#6BCF7F',
                  }}
                >
                  NEWSLETTER
                </h4>
                <div className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="px-4 py-3 focus:outline-none"
                    style={{
                      backgroundColor: '#1A202C',
                      color: 'white',
                      border: '3px solid #4A90E2',
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: '8px',
                      imageRendering: 'pixelated',
                    }}
                  />
                  <button 
                    className="px-4 py-3 font-bold transition-all duration-150"
                    style={{
                      backgroundColor: '#6BCF7F',
                      color: '#2D3748',
                      border: '3px solid #54B868',
                      boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                      fontSize: '10px',
                      fontFamily: '"Press Start 2P", cursive',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translate(2px, 2px)';
                      e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.3)';
                    }}
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pixel Divider */}
          {/* <div 
            className="mb-8"
            style={{
              height: '4px',
              background: `repeating-linear-gradient(
                90deg,
                #FF8C42 0px,
                #FF8C42 8px,
                #FFD93D 8px,
                #FFD93D 16px,
                #4A90E2 16px,
                #4A90E2 24px,
                #6BCF7F 24px,
                #6BCF7F 32px
              )`,
              imageRendering: 'pixelated',
            }}
          /> */}
          
          {/* Bottom Footer */}
          <div className="text-center">
            <p 
              className="text-gray-400 mb-4"
              style={{
                fontSize: '8px',
                lineHeight: '1.8',
              }}
            >
              © {currentYear} ELPIS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex justify-center space-x-8">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition"
                style={{ fontSize: '8px' }}
              >
                PRIVACY
              </a>
              <span className="text-gray-600" style={{ fontSize: '8px' }}>|</span>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition"
                style={{ fontSize: '8px' }}
              >
                TERMS
              </a>
              <span className="text-gray-600" style={{ fontSize: '8px' }}>|</span>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition"
                style={{ fontSize: '8px' }}
              >
                COOKIES
              </a>
            </div>

            {/* Pixel Heart */}
            <div className="mt-8 flex justify-center items-center gap-2">
              <span 
                className="text-gray-400"
                style={{ fontSize: '8px' }}
              >
                MADE WITH
              </span>
              <div 
                className="w-4 h-4"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect x='2' y='2' width='4' height='4' fill='%23FF8C42'/%3E%3Crect x='10' y='2' width='4' height='4' fill='%23FF8C42'/%3E%3Crect x='0' y='6' width='16' height='4' fill='%23FF8C42'/%3E%3Crect x='2' y='10' width='12' height='2' fill='%23FF8C42'/%3E%3Crect x='4' y='12' width='8' height='2' fill='%23FF8C42'/%3E%3Crect x='6' y='14' width='4' height='2' fill='%23FF8C42'/%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  imageRendering: 'pixelated',
                  animation: 'heartbeat 1.5s ease-in-out infinite',
                }}
              />
              <span 
                className="text-gray-400"
                style={{ fontSize: '8px' }}
              >
                FOR GNEC HACKATHON 2025
              </span>
            </div>
          </div>
        </div>

        {/* Heartbeat Animation */}
        {/* <style jsx>{`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
        `}</style> */}
      </footer>
    </>
  );
};

export default Footer;