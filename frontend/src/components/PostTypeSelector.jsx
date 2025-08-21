import React from 'react';
import { X } from 'lucide-react';

function PostTypeSelector({ onClose, onSelect }) {
  const postTypes = [
    {
      type: 'quote',
      icon: '✨',
      title: 'Quote',
      description: 'Share wisdom and inspiration',
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50',
    },
    {
      type: 'prayer',
      icon: '🙏',
      title: 'Prayer',
      description: 'Share spiritual moments',
      gradient: 'from-pink-500 to-red-500',
      bgGradient: 'from-pink-50 to-red-50',
    },
    {
      type: 'story',
      icon: '�',
      title: 'Story',
      description: 'Tell meaningful experiences',
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-50 to-blue-50',
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-3xl w-full max-w-md shadow-2xl fade-in-scale border border-white border-opacity-20">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">Create Post</h2>
            <button
              onClick={onClose}
              className="border-2 border-gray-300 hover:border-gray-400 w-10 h-10 rounded-full p-0 flex items-center justify-center bg-white bg-opacity-80"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>
          <p className="text-white text-opacity-80">Choose what you'd like to share</p>
        </div>
        <div className="px-6 pb-6 space-y-4">
          {postTypes.map((postType, index) => (
            <button
              key={postType.type}
              onClick={() => onSelect(postType.type)}
              className="w-full group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-5 transition-all duration-300 group-hover:bg-opacity-100 group-hover:transform group-hover:scale-105 group-hover:shadow-xl border border-white border-opacity-20">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${postType.gradient} flex items-center justify-center text-white text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    {postType.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {postType.title}
                    </h3>
                    <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-300">
                      {postType.description}
                    </p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:transform group-hover:translate-x-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostTypeSelector;
