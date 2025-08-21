import React from 'react';

function RefreshButton({ onRefresh }) {
  return (
    <button
      onClick={onRefresh}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all duration-200 hover:shadow-orange-500/30"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  );
}

export default RefreshButton;
