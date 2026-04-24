import { FaBell, FaSearch, FaSun, FaUserCircle } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useState } from "react";

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="flex justify-between items-center p-5 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl shadow-lg border border-orange-100 transition-all duration-300">
      
      {/* Search Bar */}
      <div className={`relative w-full max-w-lg transition-all duration-300 ${isSearchFocused ? "scale-105" : "scale-100"}`}>
        <input
          type="text"
          placeholder="Search anything..."
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="border border-orange-200 p-3 pr-10 bg-white/90 backdrop-blur-sm w-full max-w-lg rounded-full outline-none focus:ring-2 focus:ring-orange-400/50 transition-all duration-300 shadow-sm"
        />
        <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 transition-colors cursor-pointer" />
      </div>

      {/* Icons & Profile */}
      <div className="flex items-center space-x-3">
        
        <div className="relative p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full text-orange-600 cursor-pointer hover:scale-110 transition-transform duration-200 shadow-md">
          <FaBell />
          <span className="absolute -top-1 -right-1 bg-pink-500 rounded-full px-2 py-0.5 text-xs text-white shadow-md animate-bounce">
            12
          </span>
        </div>

        <div className="p-3 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200 shadow-md">
          <FcAreaChart className="text-xl" />
        </div>

        <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full text-purple-600 cursor-pointer hover:scale-110 transition-transform duration-200 shadow-md">
          <SlSettings />
        </div>

        <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full text-yellow-600 cursor-pointer hover:scale-110 transition-transform duration-200 shadow-md">
          <FaSun />
        </div>

        {/* Profile - Updated with local image */}
        <div className="flex items-center space-x-3 border-l pl-4 border-orange-200">
          <div className="text-right">
            <span className="text-xs text-orange-500">Welcome back,</span>
            <p className="font-bold text-gray-700">Faras Zakia</p>
          </div>
          <div className="relative group">
            {/* Ganti dengan gambar lokal dari folder public/img/loopy.png */}
            <img
              src="/img/loopy.jpg"
              alt="Faras Zakia"
              className="w-11 h-11 rounded-full border-2 border-orange-400 shadow-md cursor-pointer group-hover:rotate-6 transition-transform duration-200 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://avatar.iran.liara.run/public/50";
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
        </div>

      </div>
    </div>
  );
}