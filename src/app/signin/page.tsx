'use client'

import { redirect } from "next/navigation";
import router from "next/router";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In / Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Sign Up validation
      if (password !== confirmPassword) {
        setError("Passwords don't match!");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters!");
        return;
      }
      // Handle sign up logic here
      console.log("Sign Up:", { fullName, email, password });
    } else {
      // Sign In logic
      console.log("Sign In:", { email, password });
    }
    
    // Redirect after successful login/signup
    redirect('/landingpage');
  };

  return (
    <>
      {/* Pixel Font Import */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="flex h-screen w-full overflow-hidden">
        {/* Left Section - Hero with Pixel Art */}
        <div 
          className="w-1/2 relative flex justify-center items-center text-white px-10"
          style={{
            background: 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 50%, #4A90E2 100%)',
          }}
        >
          {/* Pixel Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '8px 8px',
            }}
          />

          {/* Pixel Character/Icon */}
          <div className="absolute top-20 left-20 animate-float">
            <div 
              className="w-24 h-24"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3C!-- Hero Character --%3E%3Crect x='36' y='12' width='24' height='12' fill='%23FFD93D'/%3E%3Crect x='24' y='24' width='48' height='12' fill='%23FFD93D'/%3E%3Crect x='36' y='36' width='24' height='12' fill='%23FF8C42'/%3E%3Crect x='30' y='48' width='12' height='24' fill='%234A90E2'/%3E%3Crect x='54' y='48' width='12' height='24' fill='%234A90E2'/%3E%3Crect x='24' y='72' width='12' height='12' fill='%232D3748'/%3E%3Crect x='60' y='72' width='12' height='12' fill='%232D3748'/%3E%3C/svg%3E")`,
                backgroundSize: 'contain',
                imageRendering: 'pixelated',
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 max-w-md text-center">
            {/* Pixel Logo */}
            <div className="flex justify-center mb-8">
              <div 
                className="w-32 h-32"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect x='56' y='8' width='16' height='8' fill='%23FFD93D'/%3E%3Crect x='48' y='16' width='32' height='8' fill='%23FFD93D'/%3E%3Crect x='40' y='24' width='48' height='8' fill='%23FFD93D'/%3E%3Crect x='32' y='32' width='64' height='8' fill='%23FFD93D'/%3E%3Crect x='24' y='40' width='80' height='8' fill='%23FF8C42'/%3E%3Crect x='24' y='48' width='80' height='8' fill='%23FF8C42'/%3E%3Crect x='32' y='56' width='64' height='8' fill='%23FF8C42'/%3E%3Crect x='0' y='72' width='128' height='8' fill='%234A90E2'/%3E%3Crect x='0' y='80' width='128' height='48' fill='%236BCF7F'/%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  imageRendering: 'pixelated',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                }}
              />
            </div>

            <h1 
              className="text-white font-bold text-5xl leading-tight mb-6"
              style={{
                fontFamily: '"Press Start 2P", cursive',
                textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
              }}
            >
              {isSignUp ? "JOIN US!" : "WELCOME BACK HERO!"}
            </h1>

            <div 
              className="w-20 h-1 mx-auto mb-6"
              style={{
                backgroundColor: 'white',
                boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
              }}
            />

            <p 
              className="text-lg leading-relaxed"
              style={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '12px',
                textShadow: '2px 2px 0 rgba(0,0,0,0.2)',
                lineHeight: '1.8',
              }}
            >
              {isSignUp 
                ? "Start your journey of hope today!"
                : "Once you choose hope, anything is possible."}
            </p>
          </div>
        </div>

        {/* Right Section - Form with Pixel Style */}
        <div 
          className="w-1/2 flex flex-col justify-center items-center p-10"
          style={{
            backgroundColor: '#FFF8F0',
          }}
        >
          {/* Toggle Buttons */}
          <div 
            className="flex mb-8"
            style={{
              border: '4px solid #2D3748',
              backgroundColor: '#FFF8F0',
            }}
          >
            <button
              onClick={() => setIsSignUp(false)}
              className="px-8 py-3 font-bold transition-all duration-150"
              style={{
                backgroundColor: !isSignUp ? '#FF8C42' : 'transparent',
                color: !isSignUp ? 'white' : '#2D3748',
                border: 'none',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '10px',
              }}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className="px-8 py-3 font-bold transition-all duration-150"
              style={{
                backgroundColor: isSignUp ? '#4A90E2' : 'transparent',
                color: isSignUp ? 'white' : '#2D3748',
                border: 'none',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '10px',
              }}
            >
              SIGN UP
            </button>
          </div>

          <h2 
            className="text-3xl font-bold mb-8"
            style={{
              color: '#2D3748',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '20px',
            }}
          >
            {isSignUp ? "CREATE ACCOUNT" : "LOGIN TO ELPIS"}
          </h2>

          <form className="w-3/4" onSubmit={handleSubmit}>
            {/* Full Name (Only for Sign Up) */}
            {isSignUp && (
              <div className="mb-6">
                <label 
                  className="block mb-3"
                  style={{
                    color: '#2D3748',
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: '10px',
                  }}
                >
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="JOHN DOE"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={isSignUp}
                  className="w-full px-4 py-3"
                  style={{
                    border: '4px solid #2D3748',
                    backgroundColor: 'white',
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: '10px',
                    outline: 'none',
                  }}
                />
              </div>
            )}

            {/* Email */}
            <div className="mb-6">
              <label 
                className="block mb-3"
                style={{
                  color: '#2D3748',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '10px',
                }}
              >
                EMAIL
              </label>
              <input
                type="email"
                placeholder="MAIL@ABC.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3"
                style={{
                  border: '4px solid #2D3748',
                  backgroundColor: 'white',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '10px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label 
                className="block mb-3"
                style={{
                  color: '#2D3748',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '10px',
                }}
              >
                PASSWORD
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12"
                  style={{
                    border: '4px solid #2D3748',
                    backgroundColor: 'white',
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: '10px',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: '#2D3748' }}
                >
                  {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Only for Sign Up) */}
            {isSignUp && (
              <div className="mb-6">
                <label 
                  className="block mb-3"
                  style={{
                    color: '#2D3748',
                    fontFamily: '"Press Start 2P", cursive',
                    fontSize: '10px',
                  }}
                >
                  CONFIRM PASSWORD
                </label>
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="**********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={isSignUp}
                    className="w-full px-4 py-3 pr-12"
                    style={{
                      border: '4px solid #2D3748',
                      backgroundColor: 'white',
                      fontFamily: '"Press Start 2P", cursive',
                      fontSize: '10px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    style={{ color: '#2D3748' }}
                  >
                    {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <p 
                className="mb-4 px-4 py-3"
                style={{
                  backgroundColor: '#FF8C42',
                  color: 'white',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '8px',
                  border: '3px solid #E67A30',
                }}
              >
                {error}
              </p>
            )}

            {/* Remember Me & Forgot Password (Only for Sign In) */}
            {!isSignUp && (
              <div 
                className="flex justify-between items-center mb-6"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '8px',
                }}
              >
                <label className="flex items-center" style={{ color: '#2D3748' }}>
                  <input type="checkbox" className="mr-2 w-4 h-4" />
                  REMEMBER ME
                </label>
                <a
                  href="#"
                  className="hover:underline"
                  style={{ color: '#FF8C42' }}
                >
                  FORGOT?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white py-4 font-bold transition-all duration-150 mb-4"
              style={{
                backgroundColor: isSignUp ? '#4A90E2' : '#FF8C42',
                border: `4px solid ${isSignUp ? '#3A7AC8' : '#E67A30'}`,
                boxShadow: '6px 6px 0 rgba(0,0,0,0.2)',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '12px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(3px, 3px)';
                e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.2)';
              }}
            >
              {isSignUp ? "CREATE ACCOUNT" : "LOGIN"}
            </button>
          </form>

          {/* Terms (Only for Sign Up) */}
          {isSignUp && (
            <p 
              className="text-center mt-4"
              style={{
                color: '#2D3748',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '7px',
                lineHeight: '1.6',
                maxWidth: '75%',
              }}
            >
              By signing up, you agree to our{' '}
              <a href="#" style={{ color: '#4A90E2' }}>TERMS</a>
              {' '}and{' '}
              <a href="#" style={{ color: '#4A90E2' }}>PRIVACY POLICY</a>
            </p>
          )}
        </div>
      </div>
    </>
  );
}