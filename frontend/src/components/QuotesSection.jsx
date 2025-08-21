import React from 'react';

function QuotesSection({ quotes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotes.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-white/60 text-lg">No quotes available</p>
        </div>
      ) : (
        quotes.map((quote, index) => (
          <div
            key={quote._id || index}
            className="bg-gradient-to-br from-yellow-400/10 via-orange-500/10 to-red-600/10 backdrop-blur-sm rounded-3xl p-8 border border-yellow-400/20 hover:scale-105 hover:border-yellow-400/40 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
          >
            <div className="text-center">
              <div className="text-5xl mb-6 drop-shadow-lg">💫</div>
              <blockquote className="text-white text-xl font-medium mb-6 italic leading-relaxed">
                "{quote.text}"
              </blockquote>
              {quote.author && (
                <cite className="text-yellow-300 text-sm font-bold uppercase tracking-wider">
                  — {quote.author}
                </cite>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default QuotesSection;
