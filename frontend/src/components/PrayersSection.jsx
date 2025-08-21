import React from 'react';

function PrayersSection({ prayers }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prayers.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-white/60 text-lg">No prayers available</p>
        </div>
      ) : (
        prayers.map((prayer, index) => (
          <div
            key={prayer._id || index}
            className="bg-gradient-to-br from-lime-400/10 via-green-500/10 to-emerald-600/10 backdrop-blur-sm rounded-3xl p-8 border border-lime-400/20 hover:scale-105 hover:border-lime-400/40 transition-all duration-300 shadow-lg hover:shadow-lime-500/20"
          >
            <div className="text-center">
              <div className="text-5xl mb-6 drop-shadow-lg">🙏</div>
              <p className="text-white text-xl font-medium mb-6 leading-relaxed">
                {prayer.text}
              </p>
              {prayer.meaning && (
                <p className="text-lime-300 text-sm italic font-medium">
                  {prayer.meaning}
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PrayersSection;
