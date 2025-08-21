import React, { useState, useEffect } from "react";
import "./index.css";

// Import components
import Header from "./components/Header";
import AddModal from "./components/AddModal";
import PostTypeSelector from "./components/PostTypeSelector";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState('quote');

  // Load all data and combine into a unified feed
  const loadData = async () => {
    try {
      const [quotesRes, prayersRes, storiesRes] = await Promise.all([
        fetch("http://localhost:5000/api/quotes"),
        fetch("http://localhost:5000/api/prayers"),
        fetch("http://localhost:5000/api/stories")
      ]);

      const quotesData = quotesRes.ok ? await quotesRes.json() : [];
      const prayersData = prayersRes.ok ? await prayersRes.json() : [];
      const storiesData = storiesRes.ok ? await storiesRes.json() : [];

      // Transform and combine all data into unified posts
      const posts = [
        ...quotesData.map(quote => ({
          ...quote,
          type: 'quote',
          timestamp: quote.createdAt || new Date().toISOString(),
        })),
        ...prayersData.map(prayer => ({
          ...prayer,
          type: 'prayer',
          timestamp: prayer.createdAt || new Date().toISOString(),
        })),
        ...storiesData.map(story => ({
          ...story,
          type: 'story',
          timestamp: story.createdAt || new Date().toISOString(),
        }))
      ];

      // Sort by timestamp (newest first)
      posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      setAllPosts(posts);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    loadData();
  };

  const handleAddSuccess = () => {
    setShowAddModal(false);
    handleRefresh();
  };

  const handlePostClick = () => {
    setShowTypeSelector(true);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowTypeSelector(false);
    setShowAddModal(true);
  };

  const handleCloseTypeSelector = () => {
    setShowTypeSelector(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // Filter posts based on active filter
  const filteredPosts = allPosts.filter(post => 
    activeFilter === 'all' || post.type === activeFilter
  );

  const renderPost = (post, index) => {
    const getTypeConfig = (type) => {
      switch (type) {
        case 'quote':
          return {
            icon: '✨',
            iconBg: 'type-quote',
            gradient: 'from-blue-500 to-purple-600',
            accentColor: 'text-blue-600',
          };
        case 'prayer':
          return {
            icon: '🙏',
            iconBg: 'type-prayer',
            gradient: 'from-pink-500 to-red-500',
            accentColor: 'text-pink-600',
          };
        case 'story':
          return {
            icon: '�',
            iconBg: 'type-story',
            gradient: 'from-cyan-500 to-blue-500',
            accentColor: 'text-cyan-600',
          };
        default:
          return {
            icon: '💫',
            iconBg: 'type-quote',
            gradient: 'from-gray-500 to-gray-600',
            accentColor: 'text-gray-600',
          };
      }
    };

    const config = getTypeConfig(post.type);

    return (
      <div
        key={post._id}
        className="post-card p-6 mb-6 fade-in-up card-hover"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-full ${config.iconBg} flex items-center justify-center text-white text-xl shadow-lg`}>
            {config.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.accentColor} bg-opacity-10`}
                      style={{ backgroundColor: `${config.accentColor}10` }}>
                  {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </span>
                <span className="text-gray-500 text-sm">
                  {new Date(post.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
            
            {post.type === 'quote' && (
              <div className="space-y-3">
                <blockquote className="text-gray-800 text-lg leading-relaxed font-medium italic relative">
                  <span className="text-4xl text-gray-300 absolute -top-2 -left-2">"</span>
                  <div className="pl-6">
                    {post.text}
                  </div>
                </blockquote>
                {post.author && (
                  <p className={`text-base font-semibold ${config.accentColor}`}>
                    — {post.author}
                  </p>
                )}
              </div>
            )}
            
            {post.type === 'prayer' && (
              <div className="space-y-3">
                <p className="text-gray-800 text-base leading-relaxed">
                  {post.text}
                </p>
                {post.meaning && (
                  <div className="bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-xl border-l-4 border-pink-400">
                    <p className="text-pink-800 text-sm">
                      <span className="font-semibold">Meaning: </span>
                      {post.meaning}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {post.type === 'story' && (
              <div className="space-y-3">
                <h3 className="text-gray-900 font-bold text-xl mb-3">
                  {post.title}
                </h3>
                <div className="prose max-w-none">
                  <p className="text-gray-700 text-base leading-relaxed">
                    {post.content.length > 300 
                      ? `${post.content.substring(0, 300)}...` 
                      : post.content}
                  </p>
                </div>
                {post.author && (
                  <p className={`text-sm font-semibold ${config.accentColor}`}>
                    Written by {post.author}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onAddClick={handlePostClick}
        onRefresh={handleRefresh}
      />

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingSpinner />
            <p className="text-white text-lg mt-4 opacity-80">Loading your soulful content...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="glass rounded-3xl p-12 inline-block">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-white text-2xl font-bold mb-4">No posts yet</h3>
              <p className="text-white text-lg opacity-80 mb-6">
                Start your journey by sharing something meaningful
              </p>
              <button
                onClick={handlePostClick}
                className="btn-primary text-lg px-8 py-3 rounded-full"
              >
                Create your first post
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPosts.map(renderPost)}
          </div>
        )}
      </main>

      {showTypeSelector && (
        <PostTypeSelector 
          onClose={handleCloseTypeSelector}
          onSelect={handleTypeSelect}
        />
      )}

      {showAddModal && (
        <AddModal 
          onClose={handleCloseAddModal} 
          onAdded={handleAddSuccess}
          initialType={selectedType}
        />
      )}
    </div>
  );
}
