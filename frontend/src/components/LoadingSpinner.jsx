import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        {/* Outer ring */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-opacity-20"></div>
        {/* Inner spinning part */}
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-white absolute top-0 left-0" 
             style={{ animationDuration: '1s' }}></div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full pulse-animation"></div>
      </div>
      <div className="mt-4 text-white text-sm opacity-80 font-medium">
        Loading...
      </div>
    </div>
  );
}

export default LoadingSpinner;
