import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    
    if (menuOpen || profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, profileDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Implementasi logout logic di sini
    // console.log("Logging out...");
    // Contoh: Clear session/token
    // localStorage.removeItem('token');
    // sessionStorage.clear();
    
    // Redirect ke login page atau home
    router.push('/');
    setProfileDropdownOpen(false);
  };

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

          {/* Right: Profile with Dropdown */}
          <div className="hidden md:flex flex-1 justify-end gap-4 items-center transition-all duration-500">
            <div className="relative" ref={profileDropdownRef}>
              {/* Profile Button with Animation */}
              <motion.button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="transition-all duration-500"
                style={{
                  padding: isScrolled ? '10px' : '12px',
                  backgroundColor: profileDropdownOpen ? '#4A90E2' : 'white',
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
                    color: profileDropdownOpen ? 'white' : '#2D3748',
                  }}
                />
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2"
                    style={{
                      width: '200px',
                      backgroundColor: '#FFF8F0',
                      border: '4px solid #2D3748',
                      boxShadow: '6px 6px 0 rgba(0,0,0,0.25)',
                    }}
                  >
                    <div className="p-2">
                      {/* Profile Link */}
                      <Link href="/profile" onClick={() => setProfileDropdownOpen(false)}>
                        <motion.div
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-3 px-4 py-3 mb-2 transition-all duration-150 cursor-pointer"
                          style={{
                            backgroundColor: pathname === "/profile" ? '#4A90E2' : 'transparent',
                            color: pathname === "/profile" ? 'white' : '#2D3748',
                            border: pathname === "/profile" ? '2px solid #3A7AC8' : '2px solid transparent',
                            fontSize: '8px',
                          }}
                          onMouseEnter={(e) => {
                            if (pathname !== "/profile") {
                              e.currentTarget.style.backgroundColor = '#E8F4F8';
                              e.currentTarget.style.border = '2px solid #4A90E2';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (pathname !== "/profile") {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.border = '2px solid transparent';
                            }
                          }}
                        >
                          <User size={14} />
                          <span>MY PROFILE</span>
                        </motion.div>
                      </Link>

                      {/* Settings Link (Optional) */}
                      {/* <Link href="/settings" onClick={() => setProfileDropdownOpen(false)}>
                        <motion.div
                          whileHover={{ x: 3 }}
                          className="flex items-center gap-3 px-4 py-3 mb-2 transition-all duration-150 cursor-pointer"
                          style={{
                            backgroundColor: pathname === "/settings" ? '#4A90E2' : 'transparent',
                            color: pathname === "/settings" ? 'white' : '#2D3748',
                            border: pathname === "/settings" ? '2px solid #3A7AC8' : '2px solid transparent',
                            fontSize: '8px',
                          }}
                          onMouseEnter={(e) => {
                            if (pathname !== "/settings") {
                              e.currentTarget.style.backgroundColor = '#E8F4F8';
                              e.currentTarget.style.border = '2px solid #4A90E2';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (pathname !== "/settings") {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.border = '2px solid transparent';
                            }
                          }}
                        >
                          <Settings size={14} />
                          <span>SETTINGS</span>
                        </motion.div>
                      </Link> */}

                      {/* Pixel Divider */}
                      <div 
                        className="my-2"
                        style={{
                          height: '3px',
                          background: 'repeating-linear-gradient(90deg, #FF8C42 0px, #FF8C42 6px, transparent 6px, transparent 12px)',
                        }}
                      />

                      {/* Logout Button */}
                      <motion.button
                        onClick={handleLogout}
                        whileHover={{ x: 3 }}
                        className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-150"
                        style={{
                          backgroundColor: 'transparent',
                          color: '#FF8C42',
                          border: '2px solid transparent',
                          fontSize: '8px',
                          textAlign: 'left',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFF0E6';
                          e.currentTarget.style.border = '2px solid #FF8C42';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.border = '2px solid transparent';
                        }}
                      >
                        <LogOut size={14} />
                        <span>LOGOUT</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
                {/* Pixel Divider */}
                <div 
                  className="mb-2"
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
                          delay: index * 0.1,
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

                {/* Settings link in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      delay: navLinks.length * 0.1,
                      duration: 0.3
                    }
                  }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* <Link 
                    href="/settings" 
                    onClick={() => setMenuOpen(false)}
                  >
                    <div
                      className="py-3 px-4 mb-2 flex items-center gap-3 transition-all duration-150"
                      style={{
                        backgroundColor: pathname === "/settings" ? '#4A90E2' : 'transparent',
                        color: pathname === "/settings" ? 'white' : '#2D3748',
                        border: pathname === "/settings" ? '3px solid #3A7AC8' : '3px solid transparent',
                        fontSize: '10px',
                        boxShadow: pathname === "/settings" ? '3px 3px 0 rgba(0,0,0,0.15)' : 'none',
                      }}
                    >
                      {pathname === "/settings" && <span>▸</span>}
                      <Settings className="w-4 h-4" />
                      SETTINGS
                    </div>
                  </Link> */}
                </motion.div>

                {/* Logout button in mobile menu */}
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
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 flex items-center gap-3 transition-all duration-150"
                    style={{
                      backgroundColor: '#FF8C42',
                      color: 'white',
                      border: '3px solid #E67A30',
                      fontSize: '10px',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    LOGOUT
                  </button>
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