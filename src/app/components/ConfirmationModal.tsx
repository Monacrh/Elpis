import React from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'task' | 'food';
  data: {
    title?: string;
    name?: string;
    reward?: string;
    price?: string;
    pickupCode?: string;
  };
}

export default function ConfirmationModal({ isOpen, onClose, type, data }: ConfirmationModalProps) {
  if (!isOpen) return null;

  const isTask = type === 'task';

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.3s ease-out',
          fontFamily: '"Press Start 2P", cursive',
          overflowY: 'auto',
        }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          style={{
            backgroundColor: 'white',
            border: '4px solid #2D3748',
            boxShadow: '12px 12px 0 rgba(0,0,0,0.3)',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            animation: 'slideUp 0.4s ease-out',
            margin: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              background: isTask 
                ? 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 100%)'
                : 'linear-gradient(135deg, #6BCF7F 0%, #4A90E2 100%)',
              padding: '24px',
              borderBottom: '4px solid #2D3748',
              position: 'relative',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                border: '3px solid #2D3748',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              <X size={20} style={{ color: '#2D3748' }} />
            </button>

            <div className="flex flex-col items-center">
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'white',
                  border: '4px solid #2D3748',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                }}
              >
                <CheckCircle size={40} style={{ color: isTask ? '#FF8C42' : '#6BCF7F' }} />
              </div>
              <h2
                style={{
                  fontSize: '18px',
                  color: 'white',
                  textAlign: 'center',
                  textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                  lineHeight: '1.6',
                }}
              >
                {isTask ? 'TASK ACCEPTED!' : 'FOOD REDEEMED!'}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '32px' }}>
            {isTask ? (
              // Task Confirmation
              <>
                <div className="mb-6">
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#FF8C42',
                      marginBottom: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    TASK DETAILS
                  </p>
                  <h3
                    style={{
                      fontSize: '16px',
                      color: '#2D3748',
                      marginBottom: '12px',
                      lineHeight: '1.6',
                    }}
                  >
                    {data.title || 'TASK'}
                  </h3>
                  <div
                    className="inline-block px-4 py-2"
                    style={{
                      backgroundColor: '#FFD93D',
                      border: '3px solid #2D3748',
                      fontSize: '10px',
                      color: '#2D3748',
                      fontWeight: 'bold',
                    }}
                  >
                    REWARD: {data.reward || '0 PTS'}
                  </div>
                </div>

                <div
                  style={{
                    padding: '16px',
                    backgroundColor: '#FFF8F0',
                    border: '3px solid #E2E8F0',
                    marginBottom: '24px',
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle size={16} style={{ color: '#FF8C42', marginTop: '4px', flexShrink: 0 }} />
                    <p
                      style={{
                        fontSize: '10px',
                        color: '#2D3748',
                        lineHeight: '1.8',
                      }}
                    >
                      You can now contact the poster to arrange details.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle size={16} style={{ color: '#FF8C42', marginTop: '4px', flexShrink: 0 }} />
                    <p
                      style={{
                        fontSize: '10px',
                        color: '#2D3748',
                        lineHeight: '1.8',
                      }}
                    >
                      Complete the task to earn your points!
                    </p>
                  </div>
                </div>
              </>
            ) : (
              // Food Confirmation
              <>
                <div className="mb-6">
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#6BCF7F',
                      marginBottom: '8px',
                      fontWeight: 'bold',
                    }}
                  >
                    ORDER DETAILS
                  </p>
                  <h3
                    style={{
                      fontSize: '16px',
                      color: '#2D3748',
                      marginBottom: '12px',
                      lineHeight: '1.6',
                    }}
                  >
                    {data.name || 'FOOD'}
                  </h3>
                  <div
                    className="inline-block px-4 py-2 mb-4"
                    style={{
                      backgroundColor: '#4A90E2',
                      border: '3px solid #2D3748',
                      fontSize: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    TOTAL: {data.price || '$0'}
                  </div>
                </div>

                {/* Pickup Code */}
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: '#FFD93D',
                    border: '4px solid #2D3748',
                    marginBottom: '24px',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: '8px',
                      color: '#2D3748',
                      marginBottom: '8px',
                    }}
                  >
                    YOUR PICKUP CODE
                  </p>
                  <div
                    style={{
                      fontSize: '32px',
                      color: '#2D3748',
                      fontWeight: 'bold',
                      letterSpacing: '4px',
                      marginBottom: '8px',
                    }}
                  >
                    {data.pickupCode || 'A7B3C9'}
                  </div>
                  <p
                    style={{
                      fontSize: '7px',
                      color: '#2D3748',
                      lineHeight: '1.6',
                    }}
                  >
                    Show this code at the restaurant
                  </p>
                </div>

                <div
                  style={{
                    padding: '16px',
                    backgroundColor: '#FFF8F0',
                    border: '3px solid #E2E8F0',
                    marginBottom: '24px',
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle size={16} style={{ color: '#6BCF7F', marginTop: '4px', flexShrink: 0 }} />
                    <p
                      style={{
                        fontSize: '10px',
                        color: '#2D3748',
                        lineHeight: '1.8',
                      }}
                    >
                      Pick up your food within 1 hour.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle size={16} style={{ color: '#6BCF7F', marginTop: '4px', flexShrink: 0 }} />
                    <p
                      style={{
                        fontSize: '10px',
                        color: '#2D3748',
                        lineHeight: '1.8',
                      }}
                    >
                      Bring this code to the restaurant.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {isTask ? (
                <>
                  <button
                    onClick={() => {/* Navigate to chat */}}
                    className="flex-1 py-3 font-bold transition-all duration-150"
                    style={{
                      backgroundColor: '#FF8C42',
                      color: 'white',
                      border: '4px solid #2D3748',
                      fontSize: '10px',
                      boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translate(-2px, -2px)';
                      e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.2)';
                    }}
                  >
                    CONTACT POSTER
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 font-bold transition-all duration-150"
                    style={{
                      backgroundColor: 'white',
                      color: '#2D3748',
                      border: '4px solid #2D3748',
                      fontSize: '10px',
                      boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F7FAFC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    CLOSE
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {/* Navigate to map/directions */}}
                    className="flex-1 py-3 font-bold transition-all duration-150"
                    style={{
                      backgroundColor: '#6BCF7F',
                      color: 'white',
                      border: '4px solid #2D3748',
                      fontSize: '10px',
                      boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translate(-2px, -2px)';
                      e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.2)';
                    }}
                  >
                    GET DIRECTIONS
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 font-bold transition-all duration-150"
                    style={{
                      backgroundColor: 'white',
                      color: '#2D3748',
                      border: '4px solid #2D3748',
                      fontSize: '10px',
                      boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F7FAFC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    CLOSE
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}