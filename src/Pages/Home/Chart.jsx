import React from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';

const Chart = () => {
  // Generate historical data for the past month
  const generateHistoricalData = () => {
    const data = [];
    const today = new Date();
    
    // Generate data for the past 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      // Generate random numbers or use *** or * * for some entries
      const generateValue = () => {
        const rand = Math.random();
        if (rand < 0.15) return '***';
        if (rand < 0.25) return '* *';
        return Math.floor(Math.random() * 900) + 100; // 3-digit numbers
      };

      const generateSmallValue = () => {
        const rand = Math.random();
        if (rand < 0.15) return '***';
        if (rand < 0.25) return '* *';
        return Math.floor(Math.random() * 99).toString().padStart(2, '0');
      };

      data.push({
        date: formatDate(date),
        mon: { large: generateValue(), small: generateSmallValue() },
        tue: { large: generateValue(), small: generateSmallValue() },
        wed: { large: generateValue(), small: generateSmallValue() },
        thu: { large: generateValue(), small: generateSmallValue() },
        fri: { large: generateValue(), small: generateSmallValue() },
        sat: { large: generateValue(), small: generateSmallValue() },
        sun: { large: generateValue(), small: generateSmallValue() }
      });
    }
    
    return data;
  };

  const historicalData = generateHistoricalData();

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const goBack = () => {
    // For demonstration, we'll use history.back() 
    // In a real app, you might use React Router's navigate(-1)
    if (window.history.length > 1) {
      window.history.back();
    } else {
      console.log('No previous page to go back to');
      // Optionally redirect to a default route
    }
  };

  const renderCell = (dayData) => {
    return (
      <td className="border border-gray-300 px-2 py-3 text-center bg-white">
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-800">
            {dayData.large}
          </div>
          <div className="text-sm text-red-600 font-medium">
            {dayData.small}
          </div>
        </div>
      </td>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 relative">
      {/* Back Button - Fixed at top left */}
      <button 
        onClick={goBack}
        className="fixed top-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>
      {/* Header Section */}
      <div className="text-center mb-6 pt-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          SRIDEVI MORNING Chart
        </h1>
        <p className="text-gray-600 text-sm mb-6 max-w-4xl mx-auto">
          SRIDEVI MORNING Jodi Chart Satta Matka Record Old History Historical Data Bracket Results Chart Online Live Book Digits Numbers
        </p>
        <button 
          onClick={scrollToBottom}
          className="px-6 py-2 border-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
        >
          Go To Bottom
        </button>
      </div>

      {/* Chart Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Mon
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Tue
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Wed
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Thu
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Fri
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Sat
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                Sun
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {historicalData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 bg-gray-50">
                  <div>{row.date}</div>
                  <div className="text-xs text-gray-500 mt-1">-</div>
                </td>
                {renderCell(row.mon)}
                {renderCell(row.tue)}
                {renderCell(row.wed)}
                {renderCell(row.thu)}
                {renderCell(row.fri)}
                {renderCell(row.sat)}
                {renderCell(row.sun)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer spacing */}
      <div className="h-20"></div>

      {/* Go to Top Button - Fixed at bottom right */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        title="Go to Top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Chart;