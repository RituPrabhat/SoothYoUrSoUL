import React, { useState } from 'react';

function StoriesSection({ stories }) {
  const [expandedStory, setExpandedStory] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stories.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-white/60 text-lg">No stories available</p>
        </div>
      ) : (
        stories.map((story, index) => (
          <div
            key={story._id || index}
            className="bg-gradient-to-br from-rose-400/10 via-red-500/10 to-pink-600/10 backdrop-blur-sm rounded-3xl p-8 border border-rose-400/20 hover:scale-[1.02] hover:border-rose-400/40 transition-all duration-300 shadow-lg hover:shadow-rose-500/20"
          >
            <div className="text-center">
              <div className="text-5xl mb-6 drop-shadow-lg">📖</div>
              {story.title && (
                <h3 className="text-white text-2xl font-bold mb-6">
                  {story.title}
                </h3>
              )}
              <div className="text-white/90 text-left">
                {expandedStory === story._id ? (
                  <div>
                    <p className="mb-6 leading-relaxed">{story.content}</p>
                    <button
                      onClick={() => setExpandedStory(null)}
                      className="text-rose-300 hover:text-rose-200 font-bold uppercase tracking-wider text-sm"
                    >
                      Show less
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="mb-6 leading-relaxed">
                      {story.content?.length > 200
                        ? `${story.content.substring(0, 200)}...`
                        : story.content}
                    </p>
                    {story.content?.length > 200 && (
                      <button
                        onClick={() => setExpandedStory(story._id)}
                        className="text-rose-300 hover:text-rose-200 font-bold uppercase tracking-wider text-sm"
                      >
                        Read more
                      </button>
                    )}
                  </div>
                )}
              </div>
              {story.author && (
                <p className="text-rose-300 text-sm mt-6 italic font-medium">
                  — {story.author}
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default StoriesSection;
