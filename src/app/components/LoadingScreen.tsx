'use client';

import React from 'react';

const LoadingScreenPixel: React.FC = () => {
  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .loading-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #FFF8F0;
          position: relative;
          overflow: hidden;
          font-family: 'Press Start 2P', cursive;
        }

        /* Animated Sunrise Background Layers */
        .bg-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .sky-gradient {
          background: linear-gradient(
            to bottom,
            #FFD93D 0%,
            #FF8C42 30%,
            #4A90E2 60%,
            #6BCF7F 100%
          );
          animation: skyShift 10s ease-in-out infinite;
        }

        @keyframes skyShift {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        /* Pixel Ground */
        .pixel-ground {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: repeating-linear-gradient(
            0deg,
            #6BCF7F 0px,
            #6BCF7F 20px,
            #5AB56F 20px,
            #5AB56F 40px
          );
          border-top: 6px solid #2D3748;
          z-index: 1;
        }

        /* Pixel Sun */
        .pixel-sun {
          position: absolute;
          width: 160px;
          height: 160px;
          top: 25%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          image-rendering: pixelated;
          animation: sunBounce 3s ease-in-out infinite;
        }

        @keyframes sunBounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }

        /* Pixel Clouds */
        .pixel-clouds {
          position: absolute;
          top: 15%;
          width: 100%;
          height: 100px;
          z-index: 3;
        }

        .pixel-cloud {
          position: absolute;
          display: flex;
          flex-direction: column;
          image-rendering: pixelated;
        }

        .cloud-1 {
          left: 10%;
          animation: floatCloud 20s linear infinite;
        }

        .cloud-2 {
          right: 15%;
          animation: floatCloud 25s linear infinite reverse;
          animation-delay: -5s;
        }

        @keyframes floatCloud {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(100px);
          }
        }

        .cloud-block {
          display: flex;
        }

        .cloud-pixel {
          width: 16px;
          height: 16px;
          background-color: white;
          border: 2px solid rgba(45, 55, 72, 0.1);
        }

        /* Main Content Container */
        .content-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: rgba(255, 248, 240, 0.95);
          border: 6px solid #2D3748;
          padding: 40px;
          box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.25);
        }

        /* Pixel Logo */
        .pixel-logo {
          width: 120px;
          height: 120px;
          margin-bottom: 30px;
          image-rendering: pixelated;
          animation: logoSpin 4s ease-in-out infinite;
        }

        @keyframes logoSpin {
          0%, 90%, 100% {
            transform: rotate(0deg) scale(1);
          }
          95% {
            transform: rotate(360deg) scale(1.1);
          }
        }

        /* Loading Text */
        .loading-text {
          font-size: 20px;
          color: #2D3748;
          margin-bottom: 20px;
          text-shadow: 3px 3px 0 rgba(255, 140, 66, 0.3);
          animation: textGlow 2s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 3px 3px 0 rgba(255, 140, 66, 0.3);
          }
          50% {
            text-shadow: 3px 3px 0 rgba(255, 217, 61, 0.6);
          }
        }

        /* Pixel Progress Bar */
        .progress-wrapper {
          width: 280px;
          margin-top: 20px;
        }

        .progress-label {
          font-size: 8px;
          color: #4A5568;
          margin-bottom: 8px;
          text-align: center;
        }

        .progress-container {
          width: 100%;
          height: 24px;
          background-color: #E2E8F0;
          border: 4px solid #2D3748;
          position: relative;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, 
            #FF8C42 0%, 
            #FFD93D 25%, 
            #FF8C42 50%, 
            #FFD93D 75%, 
            #FF8C42 100%
          );
          background-size: 200% 100%;
          animation: progressMove 1.5s linear infinite;
          box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.2);
        }

        @keyframes progressMove {
          0% {
            width: 20%;
            background-position: 0% 0%;
          }
          50% {
            width: 90%;
            background-position: 100% 0%;
          }
          100% {
            width: 20%;
            background-position: 200% 0%;
          }
        }

        /* Pixel Decorations */
        .pixel-decoration {
          position: absolute;
          width: 16px;
          height: 16px;
          border: 3px solid #FF8C42;
          background-color: #FFD93D;
          animation: pixelFloat 3s ease-in-out infinite;
        }

        .decoration-1 {
          top: 10%;
          left: 15%;
          animation-delay: 0s;
        }

        .decoration-2 {
          top: 20%;
          right: 20%;
          animation-delay: 0.5s;
        }

        .decoration-3 {
          bottom: 20%;
          left: 10%;
          animation-delay: 1s;
        }

        .decoration-4 {
          bottom: 15%;
          right: 15%;
          animation-delay: 1.5s;
        }

        @keyframes pixelFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 1;
          }
        }

        /* Loading Spinner Pixels */
        .pixel-spinner {
          display: flex;
          gap: 6px;
          margin-top: 15px;
        }

        .spinner-pixel {
          width: 12px;
          height: 12px;
          background-color: #FF8C42;
          border: 2px solid #2D3748;
          animation: spinnerBounce 1s ease-in-out infinite;
        }

        .spinner-pixel:nth-child(1) {
          animation-delay: 0s;
        }

        .spinner-pixel:nth-child(2) {
          animation-delay: 0.1s;
          background-color: #FFD93D;
        }

        .spinner-pixel:nth-child(3) {
          animation-delay: 0.2s;
          background-color: #4A90E2;
        }

        .spinner-pixel:nth-child(4) {
          animation-delay: 0.3s;
          background-color: #6BCF7F;
        }

        @keyframes spinnerBounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-15px);
          }
        }
      `}</style>

      <div className="loading-wrapper">
        {/* Background Layers */}
        <div className="bg-layer sky-gradient"></div>

        {/* Pixel Decorations */}
        <div className="pixel-decoration decoration-1"></div>
        <div className="pixel-decoration decoration-2"></div>
        <div className="pixel-decoration decoration-3"></div>
        <div className="pixel-decoration decoration-4"></div>

        {/* Pixel Sun */}
        <div className="pixel-sun">
          <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
            {/* Sun rays */}
            <rect x="72" y="0" width="16" height="24" fill="#FFD93D"/>
            <rect x="120" y="16" width="24" height="16" fill="#FFD93D"/>
            <rect x="136" y="72" width="24" height="16" fill="#FFD93D"/>
            <rect x="120" y="128" width="24" height="16" fill="#FFD93D"/>
            <rect x="72" y="136" width="16" height="24" fill="#FFD93D"/>
            <rect x="16" y="128" width="24" height="16" fill="#FFD93D"/>
            <rect x="0" y="72" width="24" height="16" fill="#FFD93D"/>
            <rect x="16" y="16" width="24" height="16" fill="#FFD93D"/>
            
            {/* Sun core */}
            <circle cx="80" cy="80" r="48" fill="#FF8C42"/>
            <circle cx="80" cy="80" r="40" fill="#FFD93D"/>
          </svg>
        </div>

        {/* Pixel Clouds */}
        <div className="pixel-clouds">
          <div className="pixel-cloud cloud-1">
            <div className="cloud-block">
              <div className="cloud-pixel"></div>
              <div className="cloud-pixel"></div>
            </div>
            <div className="cloud-block">
              <div className="cloud-pixel"></div>
              <div className="cloud-pixel"></div>
              <div className="cloud-pixel"></div>
            </div>
          </div>

          <div className="pixel-cloud cloud-2">
            <div className="cloud-block">
              <div className="cloud-pixel"></div>
              <div className="cloud-pixel"></div>
              <div className="cloud-pixel"></div>
            </div>
            <div className="cloud-block">
              <div className="cloud-pixel"></div>
              <div className="cloud-pixel"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content-container">
          {/* ELPIS Logo */}
          <div className="pixel-logo">
            <svg width="120" height="120" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="4" width="8" height="4" fill="#FFD93D"/>
              <rect x="16" y="8" width="16" height="4" fill="#FFD93D"/>
              <rect x="12" y="12" width="24" height="4" fill="#FF8C42"/>
              <rect x="8" y="16" width="32" height="4" fill="#FF8C42"/>
              <rect x="0" y="24" width="48" height="4" fill="#4A90E2"/>
              <rect x="0" y="28" width="48" height="20" fill="#6BCF7F"/>
            </svg>
          </div>

          <div className="loading-text">ELPIS</div>

          <div className="pixel-spinner">
            <div className="spinner-pixel"></div>
            <div className="spinner-pixel"></div>
            <div className="spinner-pixel"></div>
            <div className="spinner-pixel"></div>
          </div>

          <div className="progress-wrapper">
            <div className="progress-label">LOADING RESOURCES...</div>
            <div className="progress-container">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>

        {/* Pixel Ground */}
        <div className="pixel-ground"></div>
      </div>
    </>
  );
};

export default LoadingScreenPixel;