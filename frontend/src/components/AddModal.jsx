import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function AddModal({ onClose, onAdded, initialType = 'quote' }) {
  const [type, setType] = useState(initialType);
  const [formData, setFormData] = useState({
    text: '', author: '', meaning: '', title: '', content: ''
  });
  const [loading, setLoading] = useState(false);

  // Reset form when type changes
  useEffect(() => {
    setFormData({ text: '', author: '', meaning: '', title: '', content: '' });
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let url = '';
    let body = {};
    
    if (type === 'quote') {
      url = '/api/quotes';
      body = { text: formData.text, author: formData.author };
    } else if (type === 'prayer') {
      url = '/api/prayers';
      body = { text: formData.text, meaning: formData.meaning };
    } else if (type === 'story') {
      url = '/api/stories';
      body = { title: formData.title, content: formData.content, author: formData.author };
    }
    
    try {
      const response = await fetch(`https://soothyoursoul.onrender.com${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (response.ok) {
        // Reset form
        setFormData({ text: '', author: '', meaning: '', title: '', content: '' });
        // Call onAdded callback
        onAdded();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const typeConfig = {
    quote: { 
      icon: '✨', 
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50',
      placeholder: 'Share words that inspire the soul...',
      focusColor: 'focus:ring-blue-500'
    },
    prayer: { 
      icon: '🙏', 
      gradient: 'from-pink-500 to-red-500',
      bgGradient: 'from-pink-50 to-red-50',
      placeholder: 'Share a moment of spiritual connection...',
      focusColor: 'focus:ring-pink-500'
    },
    story: { 
      icon: '�', 
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-50 to-blue-50',
      placeholder: 'Tell a story that touches hearts...',
      focusColor: 'focus:ring-cyan-500'
    }
  };

  const config = typeConfig[type];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto border border-white border-opacity-20 fade-in-scale">
        {/* Header */}
        <div className="p-8 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${config.gradient} flex items-center justify-center text-white text-3xl shadow-lg`}>
                {config.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Create {type.charAt(0).toUpperCase() + type.slice(1)}
                </h2>
                <p className="text-white text-opacity-70">Share something meaningful</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="border-2 border-gray-300 hover:border-gray-400 w-10 h-10 rounded-full p-0 flex items-center justify-center bg-white bg-opacity-80"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {type === 'quote' && (
              <>
                <div className="space-y-2">
                  <label className="text-white font-semibold text-lg">Quote</label>
                  <textarea
                    placeholder={config.placeholder}
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full p-6 bg-white bg-opacity-95 backdrop-blur-sm border border-white border-opacity-30 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 min-h-[140px] text-lg leading-relaxed shadow-lg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-semibold">Author</label>
                  <input
                    type="text"
                    placeholder="Who said this? (optional)"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full p-4 bg-white bg-opacity-95 backdrop-blur-sm border border-white border-opacity-30 rounded-xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-lg"
                  />
                </div>
              </>
            )}

            {type === 'prayer' && (
              <>
                <div className="space-y-2">
                  <label className="text-white font-semibold text-lg">Prayer</label>
                  <textarea
                    placeholder={config.placeholder}
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full p-6 bg-white bg-opacity-95 backdrop-blur-sm border border-white border-opacity-30 rounded-2xl focus:ring-4 focus:ring-pink-500 focus:ring-opacity-30 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 min-h-[140px] text-lg leading-relaxed shadow-lg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-semibold">Meaning</label>
                  <input
                    type="text"
                    placeholder="What does this prayer mean to you? (optional)"
                    value={formData.meaning}
                    onChange={(e) => setFormData({...formData, meaning: e.target.value})}
                    className="w-full p-4 bg-white bg-opacity-95 backdrop-blur-sm border border-white border-opacity-30 rounded-xl focus:ring-4 focus:ring-pink-500 focus:ring-opacity-30 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-lg"
                  />
                </div>
              </>
            )}

            {type === 'story' && (
              <>
                <div className="space-y-2">
                  <label className="text-white font-semibold text-lg">Story Title</label>
                  <input
                    type="text"
                    placeholder="Give your story a meaningful title..."
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-4 bg-white bg-opacity-95 backdrop-blur-sm border border-white border-opacity-30 rounded-xl focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-30 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-lg text-lg font-semibold"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-semibold text-lg">Story</label>
                  <textarea
                    placeholder={config.placeholder}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full p-6 bg-white bg-opacity-95 backdrop-blur-sm border border-white border-opacity-30 rounded-2xl focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-30 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 min-h-[200px] text-lg leading-relaxed shadow-lg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-semibold">Author</label>
                  <input
                    type="text"
                    placeholder="Who wrote this story? (optional)"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full p-4 bg-white bg-opacity-95 backdrop-blur-sm border border-white border-opacity-30 rounded-xl focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-30 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-lg"
                  />
                </div>
              </>
            )}

            {/* Footer */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary px-8 py-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`btn-primary px-8 py-3 bg-gradient-to-r ${config.gradient} disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sharing...</span>
                  </>
                ) : (
                  <>
                    <span>{config.icon}</span>
                    <span>Share {type.charAt(0).toUpperCase() + type.slice(1)}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
