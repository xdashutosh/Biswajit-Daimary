import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainMarket = () => {
  const marketData = [
    { title: "SRIDEVI MORNING", route: "/chart/sridevi-morning" },
    { title: "MANGAL MORNING", route: "/chart/mangal-morning" },
    { title: "SITA MORNING", route: "/chart/sita-morning" },
    { title: "GEETA MORNING", route: "/chart/geeta-morning" },
    { title: "KARNATAKA DAY", route: "/chart/karnataka-day" },
    { title: "TULSI MORNING", route: "/chart/tulsi-morning" },
    { title: "MILAN MORNING", route: "/chart/milan-morning" },
    { title: "ANDHRA MORNING", route: "/chart/andhra-morning" },
    { title: "KALYAN MORNING", route: "/chart/kalyan-morning" },
    { title: "JANTA DAY", route: "/chart/janta-day" },
    { title: "TIME BAZAR MORNING", route: "/chart/time-bazar-morning" }
  ];
const navigate = useNavigate();
  const handleNavigation = (route) => {
   navigate(route);
  };

  return (
    <div className="w-full h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Main Market</h2>
      </div>

      {/* Market List */}
      <div className="divide-y divide-gray-100">
        {marketData.map((market, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(market.route)}
            className="flex items-center justify-between px-8 py-6 hover:bg-gray-50 cursor-pointer transition-colors duration-150 group"
          >
            {/* Left side with vertical line indicator */}
            <div className="flex items-center space-x-6">
              <div className="w-1 h-10 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700 font-medium text-lg tracking-wide">
                {market.title}
              </span>
            </div>

            {/* Right arrow icon */}
            <ChevronRight 
              className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors duration-150" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMarket;