import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links data
  const navLinks = [
    { path: "/home", label: "HOME" },
    { path: "/listtasks", label: "TASKS" },
    { path: "/listfoods", label: "FOOD" },
    { path: "/profile", label: "PROFILE" },
  ];

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>

      <header 
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          fontFamily: '"Press Start 2P", cursive',
          padding: isScrolled ? '12px 16px' : '20px 16px',
        }}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500`}
          style={{
            backgroundColor: isScrolled ? '#FFF8F0' : 'rgba(255, 248, 240, 0.7)',
            border: isScrolled ? '4px solid #2D3748' : '3px solid rgba(45, 55, 72, 0.3)',
            borderRadius: isScrolled ? '50px' : '0px',
            boxShadow: isScrolled ? '8px 8px 0 rgba(0,0,0,0.25)' : 'none',
            backdropFilter: isScrolled ? 'blur(10px)' : 'blur(5px)',
            padding: isScrolled ? '16px 24px' : '20px 16px',
            transform: isScrolled ? 'scale(0.98)' : 'scale(1)',
          }}
        >
          {/* Left: Pixel Logo with Scale Animation */}
          <div className="flex-1 transition-all duration-500" style={{ transform: isScrolled ? 'scale(0.9)' : 'scale(1)' }}>
            <Link href="/home">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3"
              >
                {/* Pixel Sunrise Logo */}
                <div 
                  className="transition-all duration-500"
                  style={{
                    width: isScrolled ? '40px' : '48px',
                    height: isScrolled ? '40px' : '48px',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect x='20' y='4' width='8' height='4' fill='%23FFD93D'/%3E%3Crect x='16' y='8' width='16' height='4' fill='%23FFD93D'/%3E%3Crect x='12' y='12' width='24' height='4' fill='%23FF8C42'/%3E%3Crect x='8' y='16' width='32' height='4' fill='%23FF8C42'/%3E%3Crect x='0' y='24' width='48' height='4' fill='%234A90E2'/%3E%3Crect x='0' y='28' width='48' height='20' fill='%236BCF7F'/%3E%3C/svg%3E")`,
                    backgroundSize: 'contain',
                    imageRendering: 'pixelated',
                  }}
                />
                <span 
                  className="transition-all duration-500"
                  style={{
                    color: '#FF8C42',
                    fontSize: isScrolled ? '14px' : '18px',
                    textShadow: '2px 2px 0 rgba(0,0,0,0.1)',
                    opacity: isScrolled ? 1 : 0.95,
                  }}
                >
                  ELPIS
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Center: Desktop Nav with Pixel Style & Scale Animation */}
          <div className="hidden md:flex flex-1 justify-center gap-2 items-center transition-all duration-500" style={{ opacity: isScrolled ? 1 : 0.9 }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  href={link.path} 
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className="transition-all duration-150"
                    style={{
                      padding: isScrolled ? '8px 16px' : '10px 20px',
                      backgroundColor: isActive ? '#FF8C42' : 'transparent',
                      color: isActive ? 'white' : '#2D3748',
                      border: isActive ? '3px solid #E67A30' : '3px solid transparent',
                      fontSize: isScrolled ? '7px' : '8px',
                      boxShadow: isActive ? '3px 3px 0 rgba(0,0,0,0.2)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = '#FFD93D';
                        e.currentTarget.style.border = '3px solid #E5C22D';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.border = '3px solid transparent';
                      }
                    }}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right: Profile & Points with Pixel Style & Animation */}
          <div className="hidden md:flex flex-1 justify-end gap-4 items-center transition-all duration-500">
            {/* Points Display with Animation */}
            {/* <motion.div 
              className="flex items-center gap-2 transition-all duration-500"
              style={{
                padding: isScrolled ? '8px 12px' : '10px 16px',
                backgroundColor: '#FFD93D',
                border: '3px solid #E5C22D',
                color: '#2D3748',
                fontSize: isScrolled ? '8px' : '10px',
                boxShadow: isScrolled ? '4px 4px 0 rgba(0,0,0,0.2)' : '3px 3px 0 rgba(0,0,0,0.15)',
                transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
              }}
              animate={{
                scale: isScrolled ? 0.95 : 1,
              }}
            >
              <motion.span 
                style={{ fontSize: isScrolled ? '12px' : '14px' }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ⭐
              </motion.span>
              <span>250 PTS</span>
            </motion.div> */}

            {/* Profile Button with Animation */}
            <Link href="/profile">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="transition-all duration-500"
                style={{
                  padding: isScrolled ? '10px' : '12px',
                  backgroundColor: pathname === "/profile" ? '#4A90E2' : 'white',
                  border: '3px solid #2D3748',
                  boxShadow: isScrolled ? '4px 4px 0 rgba(0,0,0,0.2)' : '3px 3px 0 rgba(0,0,0,0.15)',
                  transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                <User 
                  className="transition-all duration-500"
                  style={{
                    width: isScrolled ? '18px' : '20px',
                    height: isScrolled ? '18px' : '20px',
                    color: pathname === "/profile" ? 'white' : '#2D3748',
                  }}
                />
              </motion.div>
            </Link>
          </div>

          {/* Hamburger Icon (Mobile) with Pixel Style */}
          <motion.button
            className="md:hidden z-50 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            style={{
              border: '3px solid #2D3748',
              backgroundColor: menuOpen ? '#FF8C42' : 'white',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
            }}
          >
            {menuOpen ? (
              <X size={20} style={{ color: 'white' }} />
            ) : (
              <Menu size={20} style={{ color: '#2D3748' }} />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu with Pixel Animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: { 
                  height: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 0.2, delay: 0.1 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: { 
                  height: { duration: 0.3, ease: "easeIn" },
                  opacity: { duration: 0.1 }
                }
              }}
              className="md:hidden mt-4 mx-4 overflow-hidden"
              style={{
                backgroundColor: '#FFF8F0',
                border: '4px solid #2D3748',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.2)',
              }}
            >
              <nav className="flex flex-col p-4">
                {/* Points in mobile */}
                {/* <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-4 py-3 mb-2 flex items-center gap-2"
                  style={{
                    backgroundColor: '#FFD93D',
                    border: '3px solid #E5C22D',
                    color: '#2D3748',
                    fontSize: '10px',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.1)',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>⭐</span>
                  <span>250 POINTS</span>
                </motion.div> */}

                {/* Pixel Divider */}
                <div 
                  className="my-2"
                  style={{
                    height: '3px',
                    background: 'repeating-linear-gradient(90deg, #FF8C42 0px, #FF8C42 6px, transparent 6px, transparent 12px)',
                  }}
                />

                {navLinks.map((link, index) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: (index + 1) * 0.1,
                          duration: 0.3
                        }
                      }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <Link 
                        href={link.path}
                        onClick={() => setMenuOpen(false)}
                      >
                        <div
                          className="py-3 px-4 mb-2 transition-all duration-150"
                          style={{
                            backgroundColor: isActive ? '#FF8C42' : 'transparent',
                            color: isActive ? 'white' : '#2D3748',
                            border: isActive ? '3px solid #E67A30' : '3px solid transparent',
                            fontSize: '10px',
                            boxShadow: isActive ? '3px 3px 0 rgba(0,0,0,0.15)' : 'none',
                          }}
                        >
                          {isActive && <span style={{ marginRight: '8px' }}>▸</span>}
                          {link.label}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Pixel Divider */}
                <div 
                  className="my-2"
                  style={{
                    height: '3px',
                    background: 'repeating-linear-gradient(90deg, #4A90E2 0px, #4A90E2 6px, transparent 6px, transparent 12px)',
                  }}
                />

                {/* Profile link in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      delay: (navLinks.length + 1) * 0.1,
                      duration: 0.3
                    }
                  }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Link 
                    href="/profile" 
                    onClick={() => setMenuOpen(false)}
                  >
                    <div
                      className="py-3 px-4 flex items-center gap-3 transition-all duration-150"
                      style={{
                        backgroundColor: pathname === "/profile" ? '#4A90E2' : 'transparent',
                        color: pathname === "/profile" ? 'white' : '#2D3748',
                        border: pathname === "/profile" ? '3px solid #3A7AC8' : '3px solid transparent',
                        fontSize: '10px',
                        boxShadow: pathname === "/profile" ? '3px 3px 0 rgba(0,0,0,0.15)' : 'none',
                      }}
                    >
                      {pathname === "/profile" && <span>▸</span>}
                      <User className="w-4 h-4" />
                      PROFILE
                    </div>
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to prevent content from going under navbar */}
      <div style={{ height: '80px' }} />
    </>
  );
};

export default Navbar;