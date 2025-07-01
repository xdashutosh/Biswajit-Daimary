import React, { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom'; // ← import NavLink
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  BarChart3,
  Download,
} from "lucide-react";
import logo from "@/assets/logo.png";

// Define your navigation items with paths - only Home and Charts
const navLinks = [
  { name: "Home", iconComponent: Home, path: "/" },
  { name: "Charts", iconComponent: BarChart3, path: "/charts" },
];

const TrevietaIcon = () => (
  <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center overflow-hidden">
    <img src={logo} alt="ProCooling Logo" className="w-full h-full object-contain" />
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

   const apkUrl = 'https://github.com/xdashutosh/apks/raw/refs/heads/main/app-release.apk';
  const fileName = 'app-release.apk';

  const handleDownload = () => {
    // Create a temporary link element for direct download
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = fileName;
    link.target = '_blank'; // Open in new tab as fallback
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 py-2 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative bg-white rounded-full py-3 px-5 flex items-center justify-between border border-zinc-900/20 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>

          {/* Logo section */}
          <NavLink to="/" className="flex items-center group">
            <TrevietaIcon />
            <div className="ml-2.5">
              <span className="text-lg md:text-xl font-bold text-sky-600 group-hover:text-sky-700 transition-colors">
                MATKA 777
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navLinks.map(link => {
              const Icon = link.iconComponent;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `group flex items-center space-x-1.5 px-3 py-2.5 rounded-full transition-colors text-sm lg:text-[15px] font-medium ${
                      isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <span className="text-sky-600 transition-all duration-300 transform group-hover:scale-105 group-hover:text-sky-700">
                    <Icon size={18} strokeWidth={1.75} className="text-current" />
                  </span>
                  <span>{link.name}</span>
                  <span className="absolute bottom-0.5 left-1/2 w-0 h-[2px] bg-sky-500 group-hover:w-[calc(100%-1.5rem)] -translate-x-1/2 transition-all duration-300"></span>
                </NavLink>
              );
            })}
          </nav>

          {/* Download App Button */}
          <div className="hidden md:flex items-center">
            <Button  onClick={handleDownload}className="bg-sky-500 hover:bg-sky-600 shadow-sm hover:shadow-md hover:shadow-sky-500/20 text-white rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 transform hover:-translate-y-px flex items-center space-x-2">
              <Download size={16} strokeWidth={2} />
              <span>Download App</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-sky-600 focus:outline-none z-50 hover:bg-gray-100 p-2 rounded-full transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>

        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none -z-10'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden bg-white absolute left-4 right-4 top-[calc(100%+0.5rem)] rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-out z-50 border border-gray-200 ${
            isMenuOpen ? 'max-h-[calc(100vh-100px)] opacity-100 translate-y-0' : 'max-h-0 opacity-0 pointer-events-none -translate-y-4'
          }`}
        >
          <nav className="flex flex-col p-3">
            {navLinks.map(link => {
              const Icon = link.iconComponent;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="flex items-center space-x-3 py-3 px-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium text-base group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-sky-600 group-hover:text-sky-700">
                    <Icon size={20} strokeWidth={1.75} className="text-current" />
                  </span>
                  <span>{link.name}</span>
                </NavLink>
              );
            })}

            <div className="border-t border-gray-200 my-3"></div>
            <div className="flex flex-col space-y-3 p-1">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white justify-center w-full py-2.5 rounded-full shadow-sm font-medium flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                <Download size={16} strokeWidth={2} />
                <span>Download App</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;