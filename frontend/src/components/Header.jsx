import React from 'react';
import { RefreshCw } from 'lucide-react';

function Header({ activeFilter, setActiveFilter, onAddClick, onRefresh }) {
  const filters = [
    { key: 'all', label: 'All', icon: '🌟', gradient: 'from-indigo-500 to-purple-600' },
    { key: 'quote', label: 'Quotes', icon: '✨', gradient: 'from-blue-500 to-purple-600' },
    { key: 'prayer', label: 'Prayers', icon: '🙏', gradient: 'from-pink-500 to-red-500' },
    { key: 'story', label: 'Stories', icon: '�', gradient: 'from-cyan-500 to-blue-500' }
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-white border-opacity-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Top section */}
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-2xl gradient-text font-bold">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                SoothYoUrSoUL
              </h1>
              <p className="text-white text-sm opacity-70">Nourish your spirit</p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onRefresh}
              className=" border-2 border-gray-300 hover:bg-blue-400 w-12 h-12 rounded-full p-0 flex items-center justify-center group"
              title="Refresh"
            >
              <RefreshCw className="w-8 h-8 text-white " />
            </button>
            
            <button
              onClick={onAddClick}
              className="btn-primary flex items-center space-x-2 px-6 py-3 rounded-full group"
            >
              <svg 
                className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
              <span className="font-semibold">Create</span>
            </button>
          </div>
        </div>
        
        {/* Filter tabs */}
        <div className="pb-4">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                  activeFilter === filter.key
                    ? 'bg-white text-gray-800 shadow-lg transform scale-105'
                    : 'text-white opacity-70 hover:opacity-100 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <span className="text-lg">{filter.icon}</span>
                <span>{filter.label}</span>
                {activeFilter === filter.key && (
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
